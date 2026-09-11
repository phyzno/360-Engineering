export interface ServiceDetails {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
  specificDetails: {
    approach: string;
    activities: string[];
    materials: string[];
  };
  clients: {
    name: string;
    type?: string;
  }[];
  galleryImages: string[];
}

export const servicesData: ServiceDetails[] = [
  // COMMERCIAL SERVICES
  {
    id: "beauty-salon",
    category: "commercial",
    title: "Beauty Salon Design",
    subtitle: "Luxurious environments that elevate the client experience",
    heroImage: "https://images.unsplash.com/photo-1521590832167-7bfc1748b565?q=80&w=2070&auto=format&fit=crop",
    description: "We design premium beauty salons that balance aesthetic elegance with functional efficiency. Our approach focuses on creating an oasis of relaxation for clients while ensuring practical workspaces for professionals, incorporating optimal lighting, durable luxury materials, and seamless spatial flow.",
    features: [
      { title: "Specialized Lighting Design", description: "Flattering, color-accurate lighting essential for hair and makeup services." },
      { title: "Ergonomic Workstations", description: "Custom-designed stations that prioritize both client comfort and stylist efficiency." },
      { title: "Luxurious Waiting Areas", description: "Premium reception and lounge spaces that set the tone for a high-end experience." },
      { title: "Optimal Storage Solutions", description: "Concealed, functional storage for products and tools to maintain a pristine aesthetic." }
    ],
    specificDetails: {
      approach: "For beauty salons, we prioritize a seamless blend of opulence and workflow efficiency. We meticulously plan the client journey from reception to the styling chair, ensuring every touchpoint feels luxurious and relaxing.",
      activities: [
        "Spatial layout optimization for styling, washing, and waiting zones",
        "Custom workstation and mirror design",
        "Color-accurate architectural lighting integration",
        "Plumbing and electrical routing for specialized salon equipment"
      ],
      materials: ["High-durability quartz counters", "Stain-resistant luxury vinyl flooring", "Custom LED ring mirrors", "Premium brass and gold-leaf accents"]
    },
    clients: [
      { name: "Aura Elegance Salon", type: "Luxury Hair & Beauty" },
      { name: "The Glamour Room", type: "Boutique Spa" },
      { name: "Lumina Studio", type: "Makeup & Styling" }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2036&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516975080661-422fc99101f4?q=80&w=1974&auto=format&fit=crop"
    ]
  },
  {
    id: "office",
    category: "commercial",
    title: "Modern Office Interior",
    subtitle: "Inspiring workspaces that foster productivity and well-being",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    description: "Transform your corporate environment into a dynamic hub of innovation. We specialize in creating adaptable, ergonomic, and brand-aligned office spaces that attract top talent, enhance employee well-being, and reflect your company's core values.",
    features: [
      { title: "Agile Workspaces", description: "Flexible layouts that accommodate both collaborative teamwork and focused individual tasks." },
      { title: "Acoustic Solutions", description: "Advanced sound management integrating aesthetic panels and architectural elements." },
      { title: "Biophilic Design", description: "Integration of natural elements and light to boost mood and productivity." },
      { title: "Brand Integration", description: "Subtle yet impactful incorporation of your corporate identity throughout the space." }
    ],
    specificDetails: {
      approach: "We focus on agile work environments that adapt to modern workflows. By integrating biophilic design and acoustic comfort, we create spaces where teams can collaborate energetically or focus deeply without friction.",
      activities: [
        "Zoning for open-plan, private, and collaborative work areas",
        "Acoustic treatment and sound masking implementation",
        "Ergonomic furniture specification and procurement",
        "Brand identity translation into interior architecture"
      ],
      materials: ["Acoustic felt panels", "Commercial-grade carpet tiles", "Sustainable bamboo wall cladding", "Ergonomic mesh and leather seating"]
    },
    clients: [
      { name: "TechNova Solutions", type: "Software Company" },
      { name: "Apex Financial Partners", type: "Corporate Headquarters" },
      { name: "Creative Hive", type: "Co-working Space" }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1974&auto=format&fit=crop"
    ]
  },
  {
    id: "barbers-shop",
    category: "commercial",
    title: "Barbershop Design",
    subtitle: "Classic charm meets contemporary functionality",
    heroImage: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop",
    description: "We craft masculine, sophisticated environments that celebrate the timeless tradition of grooming. Our barbershop designs combine industrial or classic aesthetics with ultra-modern amenities, creating a premium social club atmosphere for your clientele.",
    features: [
      { title: "Vintage & Industrial Aesthetics", description: "Curated materials combining rich leathers, exposed brick, and dark woods." },
      { title: "Bespoke Barber Stations", description: "Custom-built units designed for the specific workflow of traditional barbering." },
      { title: "Social Lounge Areas", description: "Comfortable waiting zones that encourage community and relaxation." },
      { title: "Strategic Task Lighting", description: "Shadow-free, precision lighting necessary for detailed grooming work." }
    ],
    specificDetails: {
      approach: "We design barbershops to feel like exclusive men's clubs. The layout encourages conversation and camaraderie while providing barbers with precision lighting and highly functional workstations.",
      activities: [
        "Custom cabinetry detailing for barber stations",
        "Atmospheric and task lighting design",
        "Lounge and reception area styling",
        "Integration of vintage and industrial architectural elements"
      ],
      materials: ["Distressed leather upholstery", "Exposed brick veneers", "Matte black metal fixtures", "Reclaimed wood paneling"]
    },
    clients: [
      { name: "The Gentleman's Cut", type: "Classic Barbershop" },
      { name: "Iron & Blade", type: "Modern Grooming Studio" },
      { name: "Heritage Barber Co.", type: "Vintage Salon" }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593702288056-cc156268154c?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    id: "hotel",
    category: "commercial",
    title: "Hotel Interior Design",
    subtitle: "Unforgettable hospitality experiences through design",
    heroImage: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
    description: "Our hotel interior design services focus on creating immersive, luxurious environments that leave a lasting impression. From grand lobbies to intimate guest suites, we balance breathtaking aesthetics with the rigorous operational demands of the hospitality industry.",
    features: [
      { title: "Statement Lobbies", description: "Awe-inspiring entrance spaces that define the hotel's character immediately." },
      { title: "Luxurious Guest Suites", description: "Comfort-driven rooms featuring premium materials and intuitive layouts." },
      { title: "Bespoke FF&E", description: "Custom Furniture, Fixtures, and Equipment sourced globally for uniqueness." },
      { title: "Operational Durability", description: "High-traffic material selections that maintain their premium look over time." }
    ],
    specificDetails: {
      approach: "We approach hotel design as a narrative, ensuring every space tells a consistent story from the grand lobby to the private suites. Durability and maintenance ease are woven invisibly into luxurious aesthetics.",
      activities: [
        "Comprehensive FF&E (Furniture, Fixtures & Equipment) specification",
        "Public space and guestroom layout optimization",
        "Custom millwork and fixed architectural detailing",
        "Wayfinding and signage integration"
      ],
      materials: ["Commercial-grade wallcoverings", "High-traffic marble and terrazzo", "Custom woven Axminster carpets", "Performance fabrics for seating"]
    },
    clients: [
      { name: "The Grand Horizon", type: "Boutique Hotel" },
      { name: "Oasis Resorts", type: "Luxury Retreat" },
      { name: "Metro Suites", type: "Urban Business Hotel" }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop"
    ]
  },
  {
    id: "landscape",
    category: "commercial",
    title: "Commercial Landscape",
    subtitle: "Harmonizing architecture with nature",
    heroImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    description: "We extend your brand's presence into the outdoors with thoughtful, sustainable landscape design. Our approach seamlessly integrates built environments with natural elements to create inviting, impressive exteriors for commercial properties.",
    features: [
      { title: "Sustainable Planting", description: "Climate-appropriate selections that reduce water usage and maintenance." },
      { title: "Hardscape Design", description: "Premium paving, retaining walls, and architectural outdoor features." },
      { title: "Outdoor Seating Zones", description: "Functional spaces for employees or customers to enjoy the natural environment." },
      { title: "Architectural Lighting", description: "Strategic illumination to highlight building features and ensure safety." }
    ],
    specificDetails: {
      approach: "Our landscape approach treats the outdoors as a functional extension of the building. We emphasize drought-resistant, native planting combined with structured hardscaping to create low-maintenance, high-impact exterior environments.",
      activities: [
        "Topographical analysis and site planning",
        "Drought-resistant planting schema design",
        "Custom hardscape and pathway routing",
        "Exterior ambient and safety lighting plans"
      ],
      materials: ["Natural flagstone and pavers", "Weather-resistant corten steel", "Native, climate-adapted flora", "Commercial-grade outdoor composites"]
    },
    clients: [
      { name: "EcoPark Campus", type: "Corporate Tech Park" },
      { name: "The Promenade", type: "Retail Plaza" },
      { name: "DF Interiors Terrace", type: "Restaurant Exterior" }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1558904541-efa843a96f0f?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599596417551-7871b6d19a4e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622396090075-ab6b8396ffa9?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    id: "restaurant",
    category: "commercial",
    title: "Restaurant Interior Design",
    subtitle: "Culinary journeys enhanced by atmospheric design",
    heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    description: "We design captivating dining spaces that stimulate the senses. By carefully orchestrating lighting, acoustics, and spatial flow, we create restaurant interiors that perfectly complement your culinary vision and ensure operational efficiency for your staff.",
    features: [
      { title: "Atmospheric Lighting", description: "Multi-layered lighting systems to transition seamlessly from day to night service." },
      { title: "Acoustic Engineering", description: "Invisible sound absorption solutions to maintain conversational intimacy." },
      { title: "Optimized Floor Plans", description: "Strategic layouts maximizing cover count while ensuring smooth service flow." },
      { title: "Custom Bar Design", description: "Stunning focal point bars designed for both visual impact and bartender efficiency." }
    ],
    specificDetails: {
      approach: "We design restaurants by balancing dining ambiance with back-of-house efficiency. We focus on creating intimate 'moments' for diners while ensuring clear, fast circulation routes for service staff.",
      activities: [
        "Capacity and circulation optimization",
        "Custom bar and front-of-house counter design",
        "Atmospheric lighting dimming schemas",
        "Acoustic baffling for noise control"
      ],
      materials: ["Acoustic plaster ceilings", "Stain-resistant banquette leathers", "Antimicrobial copper and brass", "Durable porcelain floor tiles"]
    },
    clients: [
      { name: "Saffron & Spice", type: "Fine Dining" },
      { name: "The Rusty Anchor", type: "Gastropub" },
      { name: "Luna Cafe", type: "Boutique Coffee House" }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop"
    ]
  },

  // RESIDENTIAL SERVICES
  {
    id: "living-room",
    category: "residential",
    title: "Living Room Design",
    subtitle: "The heart of your home, designed for living beautifully",
    heroImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop",
    description: "We transform living rooms into sophisticated, welcoming spaces that reflect your lifestyle. Whether you desire a formal entertainment area or a cozy family retreat, our designs balance aesthetic elegance with everyday comfort.",
    features: [
      { title: "Custom Joinery", description: "Bespoke media units, bookshelves, and storage solutions tailored to your space." },
      { title: "Layered Lighting", description: "Ambient, task, and accent lighting for various moods and times of day." },
      { title: "Spatial Flow", description: "Optimal furniture arrangement to encourage conversation and ease of movement." },
      { title: "Curated Textures", description: "A sophisticated mix of fabrics, rugs, and finishes for a rich, tactile experience." }
    ],
    specificDetails: {
      approach: "Our living room designs focus on versatility and warmth. We layer textures and lighting to ensure the space transitions effortlessly from a bright daytime family room to a moody, elegant evening entertainment space.",
      activities: [
        "Focal point creation (e.g., fireplace or media wall design)",
        "Bespoke media and shelving joinery",
        "Soft furnishing and window treatment curation",
        "Furniture spatial planning for conversational flow"
      ],
      materials: ["Natural hardwood flooring", "Textured linen wallcoverings", "Custom walnut veneer joinery", "Plush wool area rugs"]
    },
    clients: [
      { name: "The Harrison Residence", type: "Luxury Apartment" },
      { name: "Meadow View Villa", type: "Family Home" },
      { name: "Urban Loft 402", type: "Penthouse" }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1992&auto=format&fit=crop"
    ]
  },
  {
    id: "kitchen",
    category: "residential",
    title: "Luxury Kitchen Interior",
    subtitle: "Culinary spaces where form meets flawless function",
    heroImage: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400&auto=format&fit=crop",
    description: "Our kitchen designs are a masterclass in ergonomics and style. We create bespoke culinary environments using premium materials, state-of-the-art appliances, and intelligent storage solutions to craft a space that is as beautiful to look at as it is to cook in.",
    features: [
      { title: "Ergonomic Layouts", description: "Optimized 'work triangles' for effortless cooking and preparation." },
      { title: "Premium Cabinetry", description: "Custom-built, high-quality cabinets with innovative internal storage systems." },
      { title: "Luxury Surfaces", description: "Durable, breathtaking countertops and backsplashes in stone, quartz, or marble." },
      { title: "Integrated Appliances", description: "Seamless appliance integration for a sleek, unbroken visual line." }
    ],
    specificDetails: {
      approach: "We engineer kitchens around the 'work triangle' principle while hiding functional complexity behind sleek, beautiful facades. Storage is maximized vertically, and surfaces are chosen for both impact and extreme durability.",
      activities: [
        "Appliance integration and workflow planning",
        "Custom cabinetry and pantry design",
        "Countertop and backsplash material templating",
        "Task lighting layout for prep zones"
      ],
      materials: ["Book-matched Calacatta marble", "Matte-finish bespoke cabinetry", "Brushed brass hardware", "High-performance quartz"]
    },
    clients: [
      { name: "The Kensington Townhouse", type: "Heritage Home" },
      { name: "Riverfront Estate", type: "Modern Mansion" },
      { name: "The Wellington Apartment", type: "City Flat" }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556909211-36987daf7b4d?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    id: "bedroom",
    category: "residential",
    title: "Bedroom Design",
    subtitle: "Personal sanctuaries designed for ultimate rest",
    heroImage: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&auto=format&fit=crop",
    description: "We design bedrooms as deeply personal retreats that promote relaxation and rejuvenation. By manipulating color palettes, soft furnishings, and lighting, we create tranquil environments that serve as a perfect escape from the outside world.",
    features: [
      { title: "Bespoke Wardrobes", description: "Custom walk-in or fitted closets maximizing storage with elegance." },
      { title: "Sleep-Optimized Environment", description: "Careful selection of blackout solutions, acoustics, and calming color palettes." },
      { title: "Custom Headboards", description: "Statement headboards and bed frames designed specifically for your space." },
      { title: "Soft Furnishings", description: "Luxurious linens, rugs, and drapery that add warmth and tactile comfort." }
    ],
    specificDetails: {
      approach: "A bedroom should be a sensory retreat. We strictly control lighting and acoustics, prioritizing soft textures, calming palettes, and eliminating visual clutter through hidden, built-in storage solutions.",
      activities: [
        "Custom headboard and bed-frame design",
        "Walk-in closet and wardrobe spatial planning",
        "Acoustic padding and blackout window treatments",
        "Bedside ambient and reading light integration"
      ],
      materials: ["Silk and Egyptian cotton textiles", "Upholstered wall panels", "Soft-close custom woodwork", "Deep-pile wool carpeting"]
    },
    clients: [
      { name: "The Windsor Residence", type: "Master Suite" },
      { name: "Pinecrest Retreat", type: "Guest Lodge" },
      { name: "Skyline Penthouse", type: "Primary Bedroom" }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop"
    ]
  },
  {
    id: "bathroom",
    category: "residential",
    title: "Bathroom Design",
    subtitle: "Spa-like tranquility in your own home",
    heroImage: "https://images.unsplash.com/photo-1576698483491-8c43f0862543?w=400&auto=format&fit=crop",
    description: "Transform your daily routine into a spa-like experience. Our bathroom designs incorporate luxury fixtures, beautiful stone or tile work, and atmospheric lighting to create intimate spaces dedicated to wellness and self-care.",
    features: [
      { title: "Wet Room Concepts", description: "Seamless, open-plan shower spaces for a modern, expansive feel." },
      { title: "Luxury Fixtures", description: "High-end brassware, freestanding tubs, and rainfall showers." },
      { title: "Bespoke Vanities", description: "Custom floating or standing vanity units with integrated storage." },
      { title: "Atmospheric Lighting", description: "Waterproof, dimmable lighting schemes for both practical use and relaxation." }
    ],
    specificDetails: {
      approach: "We bring luxury resort sensibilities into the residential bathroom. This involves precision waterproofing, hiding drains and hardware where possible, and using large-format materials to create a seamless, expansive feel.",
      activities: [
        "Plumbing relocation and wet-room grading",
        "Custom floating vanity design",
        "Niche and concealed storage creation",
        "Waterproof lighting and mirror demister installation"
      ],
      materials: ["Large-format porcelain slabs", "Fluted glass partitions", "Matte black or brushed nickel fixtures", "Natural teak wood accents"]
    },
    clients: [
      { name: "The Belmont House", type: "En-suite Bathroom" },
      { name: "Oakwood Villa", type: "Spa Bathroom" },
      { name: "Marina View Condo", type: "Modern Powder Room" }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1576698483491-8c43f0862543?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604709177225-055f99402ea3?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    id: "full-house",
    category: "residential",
    title: "Whole House Interior",
    subtitle: "Cohesive design stories woven throughout your entire home",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    description: "For complete home designs, we create a unified aesthetic thread that connects every room while allowing each space to have its own distinct personality. We manage everything from spatial planning to the final placement of accessories.",
    features: [
      { title: "Cohesive Concept", description: "A unified design language that flows naturally from room to room." },
      { title: "Comprehensive Planning", description: "Holistic approach to lighting, flooring, and spatial flow across the property." },
      { title: "Turnkey Service", description: "Complete project management from empty shell to fully styled, ready-to-live home." },
      { title: "Custom Furniture Packages", description: "Curated selections for the entire property ensuring harmony in scale and style." }
    ],
    specificDetails: {
      approach: "A whole-house project is an exercise in continuity. We establish a core palette of materials and colors, then create subtle variations for each room so the entire home feels connected but never repetitive.",
      activities: [
        "Comprehensive floorplan optimization",
        "Whole-house material and color palette selection",
        "Synchronized smart home and lighting integration",
        "Turnkey installation from furniture to styling accessories"
      ],
      materials: ["Continuous hardwood flooring", "Consistent architectural hardware", "Custom millwork packages", "Curated global art and decor"]
    },
    clients: [
      { name: "The Lancaster Estate", type: "New Build" },
      { name: "Cedar Ridge Home", type: "Complete Furnishing" },
      { name: "The Glass House", type: "Architectural Interior" }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1695527081827-fdbc4e77be9b?w=400&auto=format&fit=crop"
    ]
  },

  // RENOVATION SERVICES
  {
    id: "kitchen",
    category: "renovation",
    title: "Kitchen Remodeling",
    subtitle: "Breathing new life into the heart of your home",
    heroImage: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?q=80&w=2070&auto=format&fit=crop",
    description: "We handle complete kitchen overhauls, transforming outdated spaces into modern culinary masterpieces. From structural changes and plumbing updates to custom cabinetry installation, we manage the entire remodeling process.",
    features: [
      { title: "Structural Modifications", description: "Opening up spaces, removing walls, and optimizing the architectural layout." },
      { title: "Upgraded Infrastructure", description: "Modernizing plumbing, electrical, and gas lines to current safety standards." },
      { title: "Custom Cabinetry", description: "Designing and installing high-quality, made-to-measure storage solutions." },
      { title: "Premium Finishes", description: "Updating countertops, backsplashes, and flooring with durable, luxurious materials." }
    ],
    specificDetails: {
      approach: "Renovating a kitchen means correcting past structural flaws while upgrading to modern standards. We manage the messy demolition phase strictly, protecting your home while we rebuild the kitchen from the plumbing up.",
      activities: [
        "Safe demolition and waste removal",
        "Structural wall removal and load-bearing reinforcement",
        "MEP (Mechanical, Electrical, Plumbing) rough-in updates",
        "Cabinetry, appliance, and finish installation"
      ],
      materials: ["Structural steel beams (if needed)", "Upgraded copper plumbing", "Durable engineered wood flooring", "Heat-resistant stone composites"]
    },
    clients: [
      { name: "The Thompson Remodel", type: "Historic Kitchen" },
      { name: "Westside Open Plan", type: "Modernization" },
      { name: "Chef's Dream Kitchen", type: "Gourmet Upgrade" }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400&auto=format&fit=crop"
    ]
  },
  {
    id: "bathroom",
    category: "renovation",
    title: "Bathroom Remodeling",
    subtitle: "Complete transformations for your private oasis",
    heroImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1974&auto=format&fit=crop",
    description: "Our bathroom renovation service covers everything from gutting the existing space to final installation. We expertly navigate the complexities of plumbing and waterproofing to deliver flawless, spa-quality bathrooms.",
    features: [
      { title: "Complete Strip-Out", description: "Safe and clean removal of old fixtures, tiles, and infrastructure." },
      { title: "Advanced Waterproofing", description: "Industry-leading techniques to ensure long-lasting, leak-free environments." },
      { title: "Modern Fixture Installation", description: "Expert fitting of high-end sanitaryware, smart toilets, and custom showers." },
      { title: "Precision Tiling", description: "Flawless execution of intricate tile patterns and large-format stone slabs." }
    ],
    specificDetails: {
      approach: "Bathroom remodeling is highly technical. We focus heavily on the unseen elements—perfect grading, unbreachable waterproofing membranes, and updated plumbing—before applying beautiful, flawless surface finishes.",
      activities: [
        "Down-to-studs demolition and mold inspection",
        "Complete re-piping and drainage correction",
        "Multi-layer waterproofing system application",
        "Precision tile setting and grouting"
      ],
      materials: ["Schluter waterproofing systems", "PEX piping", "Epoxy grouts for moisture resistance", "High-end ceramic and stone tiles"]
    },
    clients: [
      { name: "The Victorian Update", type: "Heritage Bath" },
      { name: "Urban Spa Conversion", type: "Master Bath" },
      { name: "Minimalist Wet Room", type: "Apartment Renovation" }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604709177225-055f99402ea3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?q=80&w=1974&auto=format&fit=crop"
    ]
  },
  {
    id: "full-home",
    category: "renovation",
    title: "Full Home Renovation",
    subtitle: "Reimagining your entire property from the ground up",
    heroImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop",
    description: "A comprehensive service for major property transformations. We orchestrate complex renovations involving structural changes, layout reconfiguration, and complete interior aesthetic updates to elevate your property's value and livability.",
    features: [
      { title: "Project Management", description: "End-to-end oversight ensuring timeline adherence and budget control." },
      { title: "Structural Reconfiguration", description: "Working with engineers to safely open spaces and alter floor plans." },
      { title: "MEP Upgrades", description: "Complete modernization of Mechanical, Electrical, and Plumbing systems." },
      { title: "Bespoke Finishing", description: "Delivering a cohesive, premium interior design across the entire renovated property." }
    ],
    specificDetails: {
      approach: "A full home renovation is a logistical orchestra. We handle the complex coordination of architects, engineers, and master tradespeople, acting as your single point of contact from demolition day to the final polished reveal.",
      activities: [
        "Architectural planning and permitting",
        "Extensive structural modifications and extensions",
        "Complete systems overhaul (HVAC, Electrical, Plumbing)",
        "Interior build-out, finishing, and staging"
      ],
      materials: ["Structural reinforcements", "High-efficiency HVAC systems", "Smart home wiring networks", "Premium architectural finishes"]
    },
    clients: [
      { name: "The Heritage Restoration", type: "Period Property" },
      { name: "Mid-Century Modern Revival", type: "Full Flip" },
      { name: "The Lakehouse Expansion", type: "Home Extension" }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    id: "office",
    category: "renovation",
    title: "Office Renovation",
    subtitle: "Modernizing workspaces for the future of business",
    heroImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
    description: "Revitalize your commercial property with our office renovation services. We minimize downtime while transforming outdated offices into modern, agile workspaces that boost employee morale and impress visiting clients.",
    features: [
      { title: "Phased Execution", description: "Strategic scheduling to minimize disruption to your ongoing business operations." },
      { title: "Technology Integration", description: "Seamlessly incorporating modern IT infrastructure and smart office capabilities." },
      { title: "Aesthetic Modernization", description: "Updating finishes, lighting, and furniture to reflect current corporate trends." },
      { title: "Compliance Updates", description: "Ensuring the newly renovated space meets all current building and accessibility codes." }
    ],
    specificDetails: {
      approach: "We understand that business must go on. Our office renovations are often executed in calculated phases or during off-hours, ensuring your team experiences minimal downtime while we completely modernize your workspace.",
      activities: [
        "Phased demolition and safe-zone creation",
        "IT and data infrastructure upgrading",
        "HVAC and lighting efficiency improvements",
        "Rapid-install architectural wall systems"
      ],
      materials: ["Demountable glass partitions", "Raised access flooring", "Commercial grade acoustic treatments", "High-durability reception counters"]
    },
    clients: [
      { name: "Global Logistics HQ", type: "Corporate Renovation" },
      { name: "Innovate Tech Hub", type: "Startup Office" },
      { name: "Legal Partners Suite", type: "Executive Chambers" }
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1974&auto=format&fit=crop"
    ]
  }
];

export const getServiceDetails = (category: string, slug: string): ServiceDetails | undefined => {
  return servicesData.find(s => s.category === category && s.id === slug);
};
