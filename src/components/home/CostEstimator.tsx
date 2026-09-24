"use client";

import { useState, useRef, useEffect } from "react";
import { evaluate } from "mathjs";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
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

  const [settings, setSettings] = useState<any>(null);
  
  useEffect(() => {
    fetch('/api/estimator-settings')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setSettings(data);
      })
      .catch(err => console.error('Failed to load estimator settings:', err));
  }, []);


  // 3D Tilt Setup
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
    if (!areaSize || typeof areaSize === 'string') return;

    let basePrice = 0;
    if (propertyType === 'Apartment') basePrice = settings?.property_apartment_base || 1500;
    else if (propertyType === 'Duplex') basePrice = settings?.property_duplex_base || 2500;
    else if (propertyType === 'Office') basePrice = settings?.property_office_base || 2000;

    let multiplier = settings?.finishing_standard_mult || 1.0;
    if (finishingType === 'Premium') multiplier = settings?.finishing_premium_mult || 1.5;
    else if (finishingType === 'Ultra-Luxury') multiplier = settings?.finishing_ultra_mult || 2.5;

    let total = 0;
    try {
      const formulaStr = settings?.custom_formula || 'Area * BasePrice * Multiplier';
      total = evaluate(formulaStr, {
        Area: areaSize,
        BasePrice: basePrice,
        Multiplier: multiplier
      });
    } catch (e) {
      console.error('Invalid custom formula, falling back to default calculation', e);
      total = areaSize * basePrice * multiplier;
    }

    setEstimatedCost({
      min: Math.round(total * 0.9),
      max: Math.round(total * 1.1),
    });
  };

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

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
        setErrorMsg("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to submit. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KW', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0
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
    <section id="estimator" className="section-padding bg-white relative overflow-hidden perspective-[2000px]">
      {/* Decorative noise/ambience */}
      <div className="absolute inset-0 noise z-0"></div>

      <div className="container-wide relative z-10 perspective-[2000px]">
        <SectionHeading 
          title="Cost Estimator"
          subtitle="Get a rough estimate for your interior design project in seconds."
          centered
        />

        <motion.div 
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            backgroundImage: "linear-gradient(to bottom right, rgba(20, 28, 15, 0.65), rgba(10, 15, 8, 0.75)), url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          className="max-w-3xl mx-auto mt-12 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8),0_0_50px_rgba(201,168,76,0.15),inset_0_2px_1px_rgba(255,255,255,0.08),inset_0_-4px_1px_rgba(0,0,0,0.4)] border border-[rgba(201,168,76,0.25)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_40px_70px_rgba(0,0,0,0.9),0_0_60px_rgba(201,168,76,0.25),inset_0_2px_1px_rgba(255,255,255,0.15),inset_0_-4px_1px_rgba(0,0,0,0.5)] cursor-default backdrop-blur-xl relative"
        >
          {/* Decorative glare for 3D effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none"></div>

          {/* Progress Bar */}
          <div className="bg-black/40 h-2 w-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] relative z-10" style={{ transform: "translateZ(1px)" }}>
            <motion.div 
              className="h-full bg-[var(--color-brand-500)] shadow-[0_0_15px_var(--color-brand-500)]"
              initial={{ width: "20%" }}
              animate={{ width: `${(step / 5) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center relative z-10" style={{ transform: "translateZ(20px)" }}>
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
                  <h3 className="text-2xl font-heading font-medium text-center text-[white] mb-8 drop-shadow-md">
                    What type of property are you designing?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: "Apartment", icon: Building, label: "Apartment" },
                      { id: "Duplex", icon: Home, label: "Duplex" },
                      { id: "Office", icon: Briefcase, label: "Office" },
                    ].map((item) => (
                      <motion.button
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ y: 0, scale: 0.98 }}
                        key={item.id}
                        onClick={() => handlePropertySelect(item.id as PropertyType)}
                        className={`p-6 rounded-2xl border transition-colors duration-300 flex flex-col items-center justify-center gap-4 relative overflow-hidden ${
                          propertyType === item.id 
                            ? "border-[var(--color-brand-500)] border-b-[4px] bg-gradient-to-b from-[var(--color-brand-500)]/20 to-[var(--color-brand-500)]/5 text-[var(--color-brand-500)] shadow-[0_8px_20px_rgba(201,168,76,0.3)]" 
                            : "border-[rgba(201,168,76,0.15)] border-b-[4px] border-b-[rgba(201,168,76,0.3)] bg-gradient-to-b from-white/[0.08] to-white/[0.02] hover:from-white/[0.12] hover:to-white/[0.05] hover:border-[var(--color-brand-300)] hover:border-b-[var(--color-brand-300)] text-[white] shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
                        }`}
                      >
                        {/* Highlight line for 3D card edge */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/[0.05]"></div>
                        <item.icon className="w-10 h-10 drop-shadow-lg" />
                        <span className="font-semibold text-lg tracking-wide drop-shadow-md">{item.label}</span>
                      </motion.button>
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
                  <h3 className="text-2xl font-heading font-medium text-center text-[white] mb-2">
                    What is the total area size?
                  </h3>
                  <p className="text-center text-[var(--color-neutral-300)] mb-8 text-sm">
                    Enter the space in square feet (Sq Ft).
                  </p>
                  
                  <div className="space-y-6">
                    <div className="relative">
                      <input
                        type="number"
                        min="100"
                        value={areaSize}
                        onChange={(e) => setAreaSize(e.target.value ? Number(e.target.value) : "")}
                        placeholder="e.g. 1500"
                        className="input-field rounded-2xl text-center text-2xl md:text-3xl font-heading font-semibold py-4 pr-16 md:pr-20 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-shadow hover:shadow-[0_4px_25px_rgba(201,168,76,0.15)] focus:shadow-[0_4px_25px_rgba(201,168,76,0.25)]"
                      />
                      <span className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-[var(--color-neutral-400)] font-medium text-sm md:text-base">
                        Sq Ft
                      </span>
                    </div>

                    <div className="flex gap-2 md:gap-3 flex-wrap justify-center mt-4">
                      {[1000, 1500, 2000, 3000].map((size) => (
                        <button
                          key={size}
                          onClick={() => setAreaSize(size)}
                          className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-[rgba(201,168,76,0.3)] hover:border-[var(--color-brand-500)] hover:text-[var(--color-brand-500)] hover:shadow-[0_4px_15px_rgba(201,168,76,0.2)] text-xs md:text-sm font-medium transition-all text-[var(--color-neutral-300)] shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                        >
                          {size} Sq Ft
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row justify-between pt-8 items-center gap-4 sm:gap-0">
                    <button onClick={prevStep} className="flex items-center text-[var(--color-neutral-300)] hover:text-[var(--color-brand-500)] transition-colors text-sm uppercase tracking-wider font-semibold w-full sm:w-auto justify-center sm:justify-start py-3 sm:py-0">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </button>
                    <button 
                      onClick={nextStep}
                      disabled={!areaSize || areaSize < 100}
                      className="btn-primary rounded-full disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto justify-center text-center"
                    >
                      <span>Next</span> <ArrowRight className="w-4 h-4 ml-1 relative z-10" />
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
                  <h3 className="text-2xl font-heading font-medium text-center text-[white] mb-8 drop-shadow-md">
                    Select your preferred finishing
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: "Standard", label: "Standard", desc: "Quality basic materials, standard fittings, neat execution." },
                      { id: "Premium", label: "Premium", desc: "High-end materials, custom carpentry, mood lighting." },
                      { id: "Ultra-Luxury", label: "Ultra-Luxury", desc: "Imported materials, smart home integration, bespoke design." },
                    ].map((item) => (
                      <motion.button
                        whileHover={{ y: -4, scale: 1.02 }}
                        whileTap={{ y: 0, scale: 0.98 }}
                        key={item.id}
                        onClick={() => handleFinishingSelect(item.id as FinishingType)}
                        className={`p-6 text-left rounded-2xl border transition-colors duration-300 flex flex-col gap-2 relative overflow-hidden ${
                          finishingType === item.id 
                            ? "border-[var(--color-brand-500)] border-b-[4px] bg-gradient-to-b from-[var(--color-brand-500)]/20 to-[var(--color-brand-500)]/5 text-[var(--color-brand-500)] shadow-[0_8px_20px_rgba(201,168,76,0.3)]" 
                            : "border-[rgba(201,168,76,0.15)] border-b-[4px] border-b-[rgba(201,168,76,0.3)] bg-gradient-to-b from-white/[0.08] to-white/[0.02] hover:from-white/[0.12] hover:to-white/[0.05] hover:border-[var(--color-brand-300)] hover:border-b-[var(--color-brand-300)] text-[white] shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
                        }`}
                      >
                        {/* Highlight line for 3D card edge */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/[0.05]"></div>
                        <h4 className={`font-semibold text-lg tracking-wide drop-shadow-md ${finishingType === item.id ? "text-[var(--color-brand-500)]" : "text-[white]"}`}>{item.label}</h4>
                        <p className={`text-sm leading-relaxed ${finishingType === item.id ? "text-[var(--color-brand-300)]" : "text-[var(--color-neutral-300)]"}`}>{item.desc}</p>
                      </motion.button>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row justify-start pt-6">
                    <button onClick={prevStep} className="flex items-center text-[var(--color-neutral-300)] hover:text-[var(--color-brand-500)] transition-colors text-sm uppercase tracking-wider font-semibold w-full sm:w-auto justify-center sm:justify-start py-3 sm:py-0">
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
                    <Calculator className="w-12 h-12 text-[var(--color-brand-500)] mx-auto mb-4" />
                    <h3 className="text-2xl font-heading font-medium text-[white]">
                      Your estimate is ready!
                    </h3>
                    <p className="text-[var(--color-neutral-300)] mt-2 text-sm">
                      Enter your details to reveal the estimated cost instantly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-neutral-300)] mb-2 tracking-wide uppercase">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={leadData.name}
                        onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                        className="input-field rounded-xl"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-neutral-300)] mb-2 tracking-wide uppercase">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={leadData.phone}
                        onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                        className="input-field rounded-xl"
                        placeholder="+880 1XXX XXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-neutral-300)] mb-2 tracking-wide uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={leadData.email}
                        onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                        className="input-field rounded-xl"
                        placeholder="john@example.com"
                      />
                    </div>

                    {errorMsg && (
                      <div className="text-red-400 text-sm text-center py-2">
                        {errorMsg}
                      </div>
                    )}

                    <div className="flex flex-col-reverse sm:flex-row justify-between items-center pt-6 gap-4 sm:gap-0">
                      <button type="button" onClick={prevStep} className="flex items-center text-[var(--color-neutral-300)] hover:text-[var(--color-brand-500)] transition-colors text-sm uppercase tracking-wider font-semibold w-full sm:w-auto justify-center sm:justify-start py-3 sm:py-0">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                      </button>
                      <button 
                        type="submit"
                        disabled={isSubmitting || !leadData.name || !leadData.phone || !leadData.email}
                        className="btn-primary rounded-full disabled:opacity-50 w-full sm:w-auto justify-center"
                      >
                        {isSubmitting ? (
                          <><Loader2 className="w-5 h-5 mr-2 animate-spin relative z-10" /> <span className="relative z-10">Processing...</span></>
                        ) : (
                          <><span className="relative z-10">Reveal Estimate</span> <ArrowRight className="w-5 h-5 ml-2 relative z-10" /></>
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
                    className="w-20 h-20 bg-[var(--color-brand-500)]/10 border border-[rgba(201,168,76,0.3)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(201,168,76,0.15)]"
                  >
                    <CheckCircle2 className="w-10 h-10 text-[var(--color-brand-500)]" />
                  </motion.div>

                  <h3 className="text-2xl font-heading font-medium text-[white] mb-2">
                    Estimated Cost Range
                  </h3>
                  <p className="text-[var(--color-neutral-300)] mb-8 text-sm">
                    Based on your requirements ({areaSize} sq ft, {finishingType} {propertyType})
                  </p>

                  <div className="bg-black/20 border border-[rgba(201,168,76,0.15)] rounded-3xl p-8 mb-8 relative overflow-hidden">
                    {/* Decorative gold glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--color-brand-500)]/10 blur-[50px] rounded-full pointer-events-none"></div>
                    
                    <p className="text-3xl md:text-5xl font-heading font-bold text-gold-gradient relative z-10">
                      {formatCurrency(estimatedCost.min)} <span className="text-2xl text-[var(--color-neutral-400)] font-medium mx-2">-</span> {formatCurrency(estimatedCost.max)}
                    </p>
                    <p className="text-xs text-[var(--color-neutral-400)] mt-6 relative z-10 max-w-sm mx-auto">
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
                      className="btn-outline rounded-full text-[var(--color-neutral-300)] border-[rgba(255,255,255,0.3)] hover:text-[var(--color-brand-500)] hover:border-[var(--color-brand-500)]"
                    >
                      Start Over
                    </button>
                    <Link 
                      href="/contact"
                      className="btn-primary rounded-full"
                    >
                      <span>Book Consultation</span>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
