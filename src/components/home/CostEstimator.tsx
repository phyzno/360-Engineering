"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building, 
  Home, 
  Briefcase, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2,
  Calculator,
  Loader2
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

type PropertyType = "Apartment" | "Duplex" | "Office" | "";
type FinishingType = "Standard" | "Premium" | "Ultra-Luxury" | "";

export default function CostEstimator() {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState<PropertyType>("");
  const [areaSize, setAreaSize] = useState<number | "">("");
  const [finishingType, setFinishingType] = useState<FinishingType>("");
  const [leadData, setLeadData] = useState({ name: "", phone: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState({ min: 0, max: 0 });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handlePropertySelect = (type: PropertyType) => {
    setPropertyType(type);
    nextStep();
  };

  const handleFinishingSelect = (type: FinishingType) => {
    setFinishingType(type);
    nextStep();
  };

  const calculateEstimate = () => {
    if (!areaSize || typeof areaSize === "string") return;

    let basePrice = 0;
    if (propertyType === "Apartment") basePrice = 1500;
    else if (propertyType === "Duplex") basePrice = 2000;
    else if (propertyType === "Office") basePrice = 1800;

    let multiplier = 1;
    if (finishingType === "Premium") multiplier = 1.5;
    else if (finishingType === "Ultra-Luxury") multiplier = 2.5;

    const total = areaSize * basePrice * multiplier;
    // Provide a range: -10% to +10%
    setEstimatedCost({
      min: Math.round(total * 0.9),
      max: Math.round(total * 1.1),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    calculateEstimate();

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Cost Estimator",
          propertyType,
          areaSize,
          finishingType,
          ...leadData
        }),
      });

      if (response.ok) {
        nextStep(); // Go to results
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'BDT',
      maximumSignificantDigits: 3
    }).format(value);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading 
          title="Cost Estimator"
          subtitle="Get a rough estimate for your interior design project in seconds."
          centered
        />

        <div className="max-w-3xl mx-auto mt-12 bg-white dark:bg-neutral-800 rounded-3xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
          {/* Progress Bar */}
          <div className="bg-neutral-100 dark:bg-neutral-700/50 h-2 w-full">
            <motion.div 
              className="h-full bg-emerald-600 dark:bg-emerald-500"
              initial={{ width: "20%" }}
              animate={{ width: `${(step / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait" custom={1}>
              {/* STEP 1: PROPERTY TYPE */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-center text-neutral-900 dark:text-white mb-8">
                    What type of property are you designing?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: "Apartment", icon: Building, label: "Apartment" },
                      { id: "Duplex", icon: Home, label: "Duplex" },
                      { id: "Office", icon: Briefcase, label: "Office" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handlePropertySelect(item.id as PropertyType)}
                        className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:shadow-md ${
                          propertyType === item.id 
                            ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" 
                            : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-emerald-300 dark:hover:border-emerald-700 text-neutral-700 dark:text-neutral-300"
                        }`}
                      >
                        <item.icon className="w-10 h-10" />
                        <span className="font-semibold text-lg">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: AREA SIZE */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.3 }}
                  className="space-y-6 max-w-md mx-auto w-full"
                >
                  <h3 className="text-2xl font-bold text-center text-neutral-900 dark:text-white mb-2">
                    What is the total area size?
                  </h3>
                  <p className="text-center text-neutral-500 dark:text-neutral-400 mb-8">
                    Enter the space in square feet (Sq Ft).
                  </p>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="number"
                        min="100"
                        value={areaSize}
                        onChange={(e) => setAreaSize(e.target.value ? Number(e.target.value) : "")}
                        placeholder="e.g. 1500"
                        className="w-full text-center text-3xl font-bold py-4 px-6 border-2 border-neutral-200 dark:border-neutral-700 rounded-2xl bg-neutral-50 dark:bg-neutral-900 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-400 font-medium">
                        Sq Ft
                      </span>
                    </div>

                    <div className="flex gap-2 flex-wrap justify-center mt-4">
                      {[1000, 1500, 2000, 3000].map((size) => (
                        <button
                          key={size}
                          onClick={() => setAreaSize(size)}
                          className="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-medium transition-colors"
                        >
                          {size} Sq Ft
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-8">
                    <button onClick={prevStep} className="flex items-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </button>
                    <button 
                      onClick={nextStep}
                      disabled={!areaSize || areaSize < 100}
                      className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: FINISHING TYPE */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-center text-neutral-900 dark:text-white mb-8">
                    Select your preferred finishing
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: "Standard", label: "Standard", desc: "Quality basic materials, standard fittings, neat execution." },
                      { id: "Premium", label: "Premium", desc: "High-end materials, custom carpentry, mood lighting." },
                      { id: "Ultra-Luxury", label: "Ultra-Luxury", desc: "Imported materials, smart home integration, bespoke design." },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleFinishingSelect(item.id as FinishingType)}
                        className={`p-6 text-left rounded-2xl border-2 transition-all duration-300 hover:shadow-md ${
                          finishingType === item.id 
                            ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100" 
                            : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-emerald-300 dark:hover:border-emerald-700"
                        }`}
                      >
                        <h4 className="font-bold text-lg mb-2">{item.label}</h4>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-start pt-4">
                    <button onClick={prevStep} className="flex items-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: LEAD FORM */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.3 }}
                  className="max-w-md mx-auto w-full"
                >
                  <div className="text-center mb-8">
                    <Calculator className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                      Your estimate is ready!
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-2">
                      Enter your details to reveal the estimated cost instantly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={leadData.name}
                        onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={leadData.phone}
                        onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="+880 1XXX XXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={leadData.email}
                        onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="flex justify-between items-center pt-6">
                      <button type="button" onClick={prevStep} className="flex items-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                      </button>
                      <button 
                        type="submit"
                        disabled={isSubmitting || !leadData.name || !leadData.phone || !leadData.email}
                        className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-medium transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                        ) : (
                          <>Reveal Estimate <ArrowRight className="w-5 h-5 ml-2" /></>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 5: RESULT */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  custom={1}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.3 }}
                  className="text-center max-w-lg mx-auto"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                    className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                    Estimated Cost Range
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-400 mb-8">
                    Based on your requirements ({areaSize} sq ft, {finishingType} {propertyType})
                  </p>

                  <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-3xl p-8 mb-8">
                    <p className="text-4xl md:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(estimatedCost.min)} <span className="text-2xl text-neutral-400 font-medium mx-2">-</span> {formatCurrency(estimatedCost.max)}
                    </p>
                    <p className="text-sm text-neutral-500 mt-4">
                      *This is a rough estimate. Actual costs may vary based on site conditions, specific materials chosen, and custom design elements.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => {
                        setStep(1);
                        setPropertyType("");
                        setAreaSize("");
                        setFinishingType("");
                        setLeadData({name: "", phone: "", email: ""});
                      }}
                      className="px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-600 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      Start Over
                    </button>
                    <a 
                      href="/contact"
                      className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors"
                    >
                      Book Free Consultation
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
