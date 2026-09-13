import Image from "next/image";
import Link from "next/link";
import PageTransition from "@/components/ui/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import ProductShowcaseSlider from "@/components/ui/ProductShowcaseSlider";
import { notFound, redirect } from "next/navigation";

// Define the product categories
const productCategories = {
  curtains: {
    title: "Curtains & Drapes",
    subtitle: "Elegant Window Treatments",
    description: "Transform your windows into stunning focal points with our premium collection of curtains, drapes, and blinds. Whether you're looking for sheer elegance, blackout practicality, or smart motorized solutions, we have the perfect fit for your space.",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789157088/Gemini_Generated_Image_r9m7whr9m7whr9m7_cmgadw.jpg",
    features: [
      "Custom measurements and fitting",
      "Wide range of luxury fabrics",
      "Motorized and smart home integrations",
      "Blackout, sheer, and thermal options"
    ],
    gallery: [
      "https://res.cloudinary.com/djr5ztmep/image/upload/v1789161267/Gemini_Generated_Image_i6vc53i6vc53i6vc_gmutou.jpg",
      "https://res.cloudinary.com/djr5ztmep/image/upload/v1789199258/5d4d602f-49b1-4f58-8a4d-3d96af5ef3fc.png"
    ],
    showcaseItems: [
      {
        id: "sheer-linen",
        name: "Sheer Linen Curtains",
        variants: [
          { colorName: "Natural Beige", colorHex: "#d2b48c", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789157088/Gemini_Generated_Image_r9m7whr9m7whr9m7_cmgadw.jpg" },
          { colorName: "Dusty Rose", colorHex: "#dcaea4", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789157322/Gemini_Generated_Image_x6tgiwx6tgiwx6tg_r8ed7z.jpg" },
          { colorName: "Sage Green", colorHex: "#9b9b7a", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789161121/Gemini_Generated_Image_b0uxi2b0uxi2b0ux_ejyqsv.jpg" }
        ]
      },
      {
        id: "luxury-velvet",
        name: "Luxury Velvet Drapes",
        variants: [
          { colorName: "Rust Orange", colorHex: "#b85d19", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789161267/Gemini_Generated_Image_i6vc53i6vc53i6vc_gmutou.jpg" },
          { colorName: "Emerald Green", colorHex: "#2e8b57", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789161185/Gemini_Generated_Image_totmvatotmvatotm_iy6wce.jpg" },
          { colorName: "Midnight Blue", colorHex: "#191970", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789161184/Gemini_Generated_Image_ss4h69ss4h69ss4h_ho8iap.jpg" }
        ]
      },
      {
        id: "botanical-pattern",
        name: "Patterned Botanical Curtains",
        variants: [
          { colorName: "Taupe Beige", colorHex: "#a89f91", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789199258/5d4d602f-49b1-4f58-8a4d-3d96af5ef3fc.png" },
          { colorName: "Navy Blue", colorHex: "#1c2e4a", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789199346/c8284c84-619c-4158-8f1d-3aa9ed51c6fe.png" },
          { colorName: "Forest Green", colorHex: "#228b22", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789199404/a07d8060-0dca-40d2-84ba-e97eed45300b.png" }
        ]
      }
    ]
  },
  sofa: {
    title: "Luxury Sofas",
    subtitle: "Comfort Meets Design",
    description: "The heart of every living room deserves the best. Our collection of sofas ranges from sleek modern sectionals to timeless classic chesterfields. Each piece is crafted with premium materials to ensure lasting comfort and style.",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789196306/880daa8d-6fe5-4baf-8ad0-7c317d12e8ad.png",
    features: [
      "Ergonomic designs for maximum comfort",
      "Premium leather and high-grade fabric options",
      "Customizable configurations and modular setups",
      "Sturdy, long-lasting frame construction"
    ],
    gallery: [
      "https://res.cloudinary.com/djr5ztmep/image/upload/v1789196642/f2e2cfeb-a752-46fa-80c2-208fdfa3707a.png",
      "https://res.cloudinary.com/djr5ztmep/image/upload/v1789196669/cae9fa15-419b-4d59-953a-4f0469b8c5d2.png"
    ],
    showcaseItems: [
      {
        id: "chesterfield-leather",
        name: "Classic Chesterfield Leather Sofa",
        variants: [
          { colorName: "Cognac Brown", colorHex: "#8b4513", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789196306/880daa8d-6fe5-4baf-8ad0-7c317d12e8ad.png" },
          { colorName: "Navy Blue", colorHex: "#1c2e4a", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789196318/ccd6a244-35c8-4bc0-9eae-b653818a5eb1.png" },
          { colorName: "Emerald Green", colorHex: "#2e8b57", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789196539/a806fc16-77a2-4cf7-a3ca-21cde65b2ec0.png" }
        ]
      },
      {
        id: "modern-fabric",
        name: "Modern Fabric Sofa with Metal Legs",
        variants: [
          { colorName: "Charcoal Grey", colorHex: "#36454f", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789196642/f2e2cfeb-a752-46fa-80c2-208fdfa3707a.png" },
          { colorName: "Oatmeal Beige", colorHex: "#e0d8c8", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789196659/5609029a-18d9-4b58-bba5-7257c93ba406.png" }
        ]
      },
      {
        id: "curved-boucle",
        name: "Curved Bouclé Sofa",
        variants: [
          { colorName: "Pearl White", colorHex: "#f0f0f0", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789196669/cae9fa15-419b-4d59-953a-4f0469b8c5d2.png" },
          { colorName: "Moss Green", colorHex: "#8a8d6a", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789196684/616019d9-0f40-4c1c-aee1-310e17f00000.png" },
          { colorName: "Terracotta", colorHex: "#a85c47", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789196959/f3640a1a-5cfd-4421-9b66-27f46356a1fb.png" }
        ]
      }
    ]
  },
  tiles: {
    title: "Designer Tiles",
    subtitle: "Foundations of Elegance",
    description: "Set the right tone for your interior with our exquisite range of tiles. From large-format porcelain that mimics natural stone to intricate ceramic mosaics, we offer durable and beautiful options for floors, walls, and backsplashes.",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789181579/058c745c-e4c0-480a-85c2-67f3eac2f002.png",
    features: [
      "Premium porcelain, ceramic, and natural stone",
      "Slip-resistant and high-durability options",
      "Wide variety of textures, colors, and patterns",
      "Expert installation services available"
    ],
    gallery: [
      "https://res.cloudinary.com/djr5ztmep/image/upload/v1789181579/058c745c-e4c0-480a-85c2-67f3eac2f002.png",
      "https://res.cloudinary.com/djr5ztmep/image/upload/v1789182272/d470dc78-7c57-410f-a904-b6d97c37cfbe.png"
    ],
    showcaseItems: [
      {
        id: "marble-slabs",
        name: "Bookmatched Marble Slabs",
        variants: [
          {
            colorName: "Calacatta Gold",
            colorHex: "#e6dfd5",
            image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789181579/058c745c-e4c0-480a-85c2-67f3eac2f002.png"
          },
          {
            colorName: "Nero Marquina",
            colorHex: "#1c1c1e",
            image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789182073/4e917c95-920e-4c4f-8886-07c475e3bbcf.png"
          },
          {
            colorName: "Verde Alpi",
            colorHex: "#1f382b",
            image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789182175/70b5e810-2d1d-4410-9300-7be9e706c442.png"
          }
        ]
      },
      {
        id: "terrazzo-stone",
        name: "Artisanal Terrazzo",
        variants: [
          {
            colorName: "Warm Amber",
            colorHex: "#d3aa77",
            image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789182272/d470dc78-7c57-410f-a904-b6d97c37cfbe.png"
          },
          {
            colorName: "Sage Olive",
            colorHex: "#7c8871",
            image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789183052/79d063e4-0d6d-43d7-8a35-8bc5f1dd8235.png"
          },
          {
            colorName: "Silver Grey",
            colorHex: "#8e959b",
            image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789183937/3b77f6ec-4a1a-4cbd-bd72-2230e1c68745.png"
          }
        ]
      },
      {
        id: "zellige-ceramics",
        name: "Handcrafted Zellige Tiles",
        variants: [
          {
            colorName: "Caramel Amber",
            colorHex: "#a15729",
            image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789183963/e6ed2a12-015f-4122-9b07-23f628e8343a.png"
          },
          {
            colorName: "Forest Emerald",
            colorHex: "#496738",
            image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789185603/00da5cdc-de71-4df5-aeb9-25e7ef9c3dc3.png"
          }
        ]
      }
    ]
  },
  rugs: {
    title: "Rugs & Carpets",
    subtitle: "Art For Your Floors",
    description: "Anchor your living spaces with our exclusive collection of rugs and carpets. Whether you prefer hand-knotted Persian designs or modern abstract patterns, our pieces bring warmth, texture, and sophisticated style to any room.",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789200788/6bf512b1-b730-422c-b92b-19bbed6d54ae.png",
    features: [
      "Handwoven and machine-crafted options",
      "Premium materials including wool, silk, and sustainable fibers",
      "Custom sizing available for unique spaces",
      "Stain-resistant and high-traffic friendly designs"
    ],
    gallery: [
      "https://res.cloudinary.com/djr5ztmep/image/upload/v1789200702/338ce51f-3df6-4e51-93f2-30278976669e.png",
      "https://res.cloudinary.com/djr5ztmep/image/upload/v1789201402/41732451-235c-4c1c-a887-e37fb35af4b0.png"
    ],
    showcaseItems: [
      {
        id: "traditional-persian",
        name: "Traditional Persian Rug",
        variants: [
          { colorName: "Burgundy Red", colorHex: "#800020", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789200788/6bf512b1-b730-422c-b92b-19bbed6d54ae.png" },
          { colorName: "Olive Gold", colorHex: "#808000", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789200864/bc2586ca-4b94-45db-9aad-7d105dccb839.png" },
          { colorName: "Teal Blue", colorHex: "#008080", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789200916/29579bc4-ae7f-426b-99ce-c24d6df0fbc7.png" }
        ]
      },
      {
        id: "abstract-textured",
        name: "Abstract Textured Rug",
        variants: [
          { colorName: "Rust Orange", colorHex: "#b85d19", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789200702/338ce51f-3df6-4e51-93f2-30278976669e.png" },
          { colorName: "Slate Grey", colorHex: "#708090", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789200755/b3368511-328b-4abf-833d-12109ed5daf5.png" }
        ]
      },
      {
        id: "moroccan-berber",
        name: "Moroccan Berber Rug",
        variants: [
          { colorName: "Cream & Charcoal", colorHex: "#f5f5dc", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789201402/41732451-235c-4c1c-a887-e37fb35af4b0.png" },
          { colorName: "Tan & White", colorHex: "#d2b48c", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789201578/2b49e158-add5-4989-b545-61f10b2da29b.png" }
        ]
      }
    ]
  },
  lighting: {
    title: "Premium Lighting",
    subtitle: "Illuminate With Style",
    description: "The right lighting transforms a space completely. Our curated selection of chandeliers, pendants, and architectural lighting solutions are designed to create the perfect ambiance while serving as stunning sculptural elements.",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789183244/320d53c3-4a40-4a0d-93ac-b8184f154643.png",
    features: [
      "Statement chandeliers and modern pendants",
      "Energy-efficient LED integrations",
      "Smart home compatible dimming systems",
      "Architectural and ambient lighting solutions"
    ],
    gallery: [
      "https://res.cloudinary.com/djr5ztmep/image/upload/v1789183336/f2a284c1-3151-424b-9b8e-78a569aa0d8d.png",
      "https://res.cloudinary.com/djr5ztmep/image/upload/v1789183409/008f91b4-3da7-476f-a3d7-067994634163.png"
    ],
    showcaseItems: [
      {
        id: "branching-chandelier",
        name: "Modern Branching Chandelier",
        variants: [
          {
            colorName: "Brushed Brass",
            colorHex: "#d4af37",
            image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789183244/320d53c3-4a40-4a0d-93ac-b8184f154643.png"
          },
          {
            colorName: "Matte Black",
            colorHex: "#1a1a1a",
            image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789183254/6c3a09f7-1c54-4a58-b643-676eb6449428.png"
          },
          {
            colorName: "Polished Chrome",
            colorHex: "#e0e0e0",
            image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789183315/a1746743-bb63-42b2-8c82-2ba522b373c0.png"
          }
        ]
      },
      {
        id: "arch-floor-lamp",
        name: "Minimalist Arch Floor Lamp",
        variants: [
          {
            colorName: "Matte Black & White Marble",
            colorHex: "#1a1a1a",
            image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789183336/f2a284c1-3151-424b-9b8e-78a569aa0d8d.png"
          },
          {
            colorName: "Brushed Brass & Black Marble",
            colorHex: "#d4af37",
            image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789183380/bb3f9247-03f7-40b6-a3fc-0c8ce03a91cc.png"
          }
        ]
      },
      {
        id: "ribbed-glass-pendant",
        name: "Ribbed Glass Pendant Cluster",
        variants: [
          {
            colorName: "Antique Brass",
            colorHex: "#b89365",
            image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789183409/008f91b4-3da7-476f-a3d7-067994634163.png"
          },
          {
            colorName: "Matte Black",
            colorHex: "#1a1a1a",
            image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789196074/bd1d07af-51f4-4f84-b87c-7929e028bcfd.png"
          },
          {
            colorName: "Rose Gold",
            colorHex: "#b87359",
            image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789183404/01873ddf-c33c-40a8-aa2a-7ca4bc19e14d.png"
          }
        ]
      }
    ]
  },
  wallpaper: {
    title: "Wallpapers",
    subtitle: "Transform Your Walls",
    description: "Move beyond paint with our premium wallpaper collection. From subtle grasscloth textures to bold panoramic murals, our wall coverings add depth, character, and luxury to your interior environments.",
    image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789197669/3aa29b75-7bf9-4002-985a-32af3160c1db.png",
    features: [
      "Textured grasscloth and silk options",
      "Custom panoramic and scenic murals",
      "Durable commercial-grade vinyl available",
      "Professional installation recommended"
    ],
    gallery: [
      "https://res.cloudinary.com/djr5ztmep/image/upload/v1789197523/330f6c66-550c-4596-a81b-f1ce5af21630.png",
      "https://res.cloudinary.com/djr5ztmep/image/upload/v1789198047/76d7e067-8a5a-49d0-933f-d48076402839.png"
    ],
    showcaseItems: [
      {
        id: "art-deco-geometric",
        name: "Art Deco Geometric Wallpaper",
        variants: [
          { colorName: "Cream & Gold", colorHex: "#f5f0e8", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789197523/330f6c66-550c-4596-a81b-f1ce5af21630.png" },
          { colorName: "Charcoal & Gold", colorHex: "#363636", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789197564/10c80f61-0d2e-4a5d-b643-a1af67765019.png" },
          { colorName: "Sage Green & Gold", colorHex: "#8ca388", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789197641/4d48067f-82b1-46dd-ba08-d2dde0722f68.png" }
        ]
      },
      {
        id: "tropical-leaf-mural",
        name: "Tropical Leaf Mural",
        variants: [
          { colorName: "Emerald Green", colorHex: "#2e8b57", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789197669/3aa29b75-7bf9-4002-985a-32af3160c1db.png" },
          { colorName: "Monochrome Grey", colorHex: "#4f4f4f", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789197763/ed4c7343-98fe-4c34-8402-a88452c70a2f.png" },
          { colorName: "Sepia Terracotta", colorHex: "#8b4513", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789197953/9bcc9ccd-bc83-484f-bfeb-6c8e08c73cd1.png" }
        ]
      },
      {
        id: "natural-grasscloth",
        name: "Natural Grasscloth Texture",
        variants: [
          { colorName: "Natural Beige", colorHex: "#d2b48c", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789198047/76d7e067-8a5a-49d0-933f-d48076402839.png" },
          { colorName: "Indigo Blue", colorHex: "#2c3e50", image: "https://res.cloudinary.com/djr5ztmep/image/upload/v1789198086/2cee83a7-4902-41a5-b043-3f21749e24db.png" }
        ]
      }
    ]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const productData = productCategories[category as keyof typeof productCategories];
  
  if (!productData) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${productData.title} | Arch Concept`,
    description: productData.description,
  };
}

export default async function ProductCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (category === "porda") {
    redirect("/products/curtains");
  }
  const productData = productCategories[category as keyof typeof productCategories];

  if (!productData) {
    notFound();
  }

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative hero-padding overflow-hidden border-b border-[#1a2912]">
        <div className="absolute inset-0 z-0 opacity-80">
          <Image
            src={productData.image}
            alt={productData.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1206] via-[#0a1206]/50 to-black/20 z-0" />
        
        <div className="container-wide relative z-10 text-center max-w-4xl mx-auto pt-20">
          <Link href="/products" className="inline-flex items-center gap-2 text-[#c9a84c] text-sm tracking-widest uppercase hover:text-[#f5f0e8] transition-colors mb-8">
            <span className="text-lg leading-none rotate-180">→</span>
            Back to Products
          </Link>
          <SectionHeading title={productData.title} subtitle={productData.subtitle} centered />
        </div>
      </section>

      {/* Product Showcase Slider */}
      <ProductShowcaseSlider items={productData.showcaseItems ?? []} />

      {/* Main Content */}
      <section className="section-padding bg-[#0a1206]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="font-heading text-3xl text-[#f5f0e8] mb-6">About Our {productData.title}</h3>
              <p className="text-[#9ba89e] text-lg leading-relaxed mb-8">
                {productData.description}
              </p>
              
              <h4 className="font-heading text-xl text-[#c9a84c] mb-4">Key Features</h4>
              <ul className="space-y-4">
                {productData.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#f5f0e8]">
                    <span className="text-[#c9a84c] mt-1">✦</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="mt-12">
                <Link 
                  href="/contact" 
                  className="inline-block px-8 py-4 bg-[#c9a84c] text-[#0a1206] text-sm tracking-widest uppercase hover:bg-[#d4b55c] transition-colors"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {productData.gallery.map((img, idx) => (
                <div key={idx} className={`relative rounded-xl overflow-hidden ${idx === 0 ? 'aspect-square sm:aspect-[4/5]' : 'aspect-square sm:aspect-[4/5] sm:mt-12'}`}>
                  <Image
                    src={img}
                    alt={`${productData.title} gallery image ${idx + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
