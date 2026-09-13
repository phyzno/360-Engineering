import Image from "next/image";
import Link from "next/link";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Products | Arch Concept",
  description: "Explore our premium selection of interior products including curtains, sofas, and tiles.",
};

const products = [
  {
    id: "curtains",
    title: "Curtains & Drapes",
    description: "Elegant, high-quality curtains and blinds to perfectly control light and enhance your interior style.",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789157088/Gemini_Generated_Image_r9m7whr9m7whr9m7_cmgadw.jpg",
    href: "/products/curtains"
  },
  {
    id: "sofa",
    title: "Luxury Sofas",
    description: "Custom-built and designer sofas that offer unparalleled comfort and serve as the centerpiece of your living room.",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789196306/880daa8d-6fe5-4baf-8ad0-7c317d12e8ad.png",
    href: "/products/sofa"
  },
  {
    id: "tiles",
    title: "Designer Tiles",
    description: "A diverse collection of ceramic, porcelain, and natural stone tiles for elegant floors and captivating accent walls.",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789181579/058c745c-e4c0-480a-85c2-67f3eac2f002.png",
    href: "/products/tiles"
  },
  {
    id: "rugs",
    title: "Rugs & Carpets",
    description: "Add warmth and texture to your floors with our exclusive collection of handwoven rugs and premium carpets.",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789200788/6bf512b1-b730-422c-b92b-19bbed6d54ae.png",
    href: "/products/rugs"
  },
  {
    id: "lighting",
    title: "Premium Lighting",
    description: "Illuminate your space with our curated selection of chandeliers, pendant lights, and architectural lighting solutions.",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789183244/320d53c3-4a40-4a0d-93ac-b8184f154643.png",
    href: "/products/lighting"
  },
  {
    id: "wallpaper",
    title: "Wallpapers",
    description: "Create stunning accent walls with our premium range of textured, patterned, and mural wallpapers.",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789197669/3aa29b75-7bf9-4002-985a-32af3160c1db.png",
    href: "/products/wallpaper"
  }
];
export default function ProductsPage() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative hero-padding overflow-hidden border-b border-[#1a2912]">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop"
            alt="Interior Products Collection"
            fill
            className="object-cover"
          />
        </div>
        <div className="container-wide relative z-10 text-center max-w-4xl mx-auto">
          <SectionHeading title="Our Premium Products" subtitle="Curated Collection" centered />
          <p className="text-[#d4c5ae] text-lg leading-relaxed">
            Discover our carefully curated selection of premium interior products. 
            From elegant curtains to luxurious sofas and exquisite tiles, we provide 
            everything you need to complete your perfect space.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-[#0a1206]">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group relative flex flex-col bg-[#0f1a0a] rounded-xl overflow-hidden border border-[#c9a84c]/10 hover:border-[#c9a84c]/30 transition-colors duration-300">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1206] to-transparent opacity-80" />
                </div>
                <div className="relative flex flex-col flex-grow p-8 z-10 -mt-16">
                  <h3 className="font-heading text-2xl text-[#f5f0e8] mb-3 group-hover:text-[#c9a84c] transition-colors">{product.title}</h3>
                  <p className="text-[#9ba89e] mb-6 flex-grow">
                    {product.description}
                  </p>
                  <Link 
                    href={product.href}
                    className="inline-flex items-center gap-2 text-[#c9a84c] text-sm tracking-widest uppercase hover:text-[#f5f0e8] transition-colors"
                  >
                    View Details
                    <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-[#c9a84c]">
        <div className="container-wide text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-[#0a1206] mb-6">Need Help Choosing?</h2>
          <p className="text-[#0a1206]/80 max-w-2xl mx-auto mb-8 text-lg">
            Our interior design experts can help you select the perfect products to match your style and requirements.
          </p>
          <Link 
            href="/contact" 
            className="inline-block px-8 py-4 bg-[#0a1206] text-[#f5f0e8] text-sm tracking-widest uppercase hover:bg-[#1a2912] transition-colors"
          >
            Contact an Expert
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
