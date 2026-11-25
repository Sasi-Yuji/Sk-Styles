"use client";

import ClothingRailHero from "@/components/ui/product-rail-gallery";
import type { RailGarment } from "@/components/ui/product-rail-gallery";

export const RAIL_DEMO_ITEMS: RailGarment[] = [
  {
    id: "prod-1",
    name: "Men green Full Sleeves Shirt",
    kind: "shirt",
    color: "#4f7755",
    trim: "#39573e",
    tag: "$18",
    image: "/shir.webp",
    description: "Comfortable organic cotton full-sleeves shirt, perfect for casual outings or semi-formal wear.",
    details: ["100% Organic Cotton", "Full Sleeves", "Regular Fit", "Pre-shrunk"],
  },
  {
    id: "prod-2",
    name: "Dark Brown Premium Hoodie",
    kind: "hoodie",
    color: "#44342d",
    trim: "#312520",
    tag: "$45",
    image: "/hood.webp",
    description: "Heavyweight fleece hoodie designed to keep you warm, cozy, and effortlessly stylish.",
    details: ["Heavyweight Fleece", "Double Lined Hood", "Kangaroo Pocket", "Ribbed Cuffs"],
  },
  {
    id: "prod-4",
    name: "Black Heavy Denim Jacket",
    kind: "jacket",
    color: "#1e2229",
    trim: "#13161a",
    tag: "$33",
    image: "/jack.jpeg",
    description: "Rugged and timeless black denim jacket crafted with premium brass buttons and reinforced stitching.",
    details: ["14 oz Heavy Denim", "Solid Brass Hardware", "Felled Seams", "Buttoned Pockets"],
  },
  {
    id: "prod-5",
    name: "Black Anime Graphic T-Shirt",
    kind: "tee",
    color: "#18181b",
    trim: "#27272a",
    tag: "$15",
    image: "/onepiece.webp",
    description: "Iconic anime graphic print on ultra-soft breathable combed cotton fabric.",
    details: ["Combed Cotton", "High-Density Screenprint", "Comfort Fit", "Reinforced Collar"],
  },
  {
    id: "prod-8",
    name: "Rugged Denim Outerwear Jacket",
    kind: "jacket",
    color: "#222a36",
    trim: "#151b24",
    tag: "$52",
    image: "/jackts.png",
    description: "Heavy-duty outdoor jacket designed for durability, warmth, and contemporary streetwear flair.",
    details: ["Padded Quilted Lining", "Wind-Resistant Shell", "Multiple Cargo Pockets"],
  },
  {
    id: "prod-9",
    name: "Winter Warm Plush Hoodie",
    kind: "hoodie",
    color: "#8da5c4",
    trim: "#6f88a8",
    tag: "$40",
    image: "/Hoodies.webp",
    description: "Double-lined hood with kangaroo pouch and ribbed cuffs to beat the cold in style.",
    details: ["400 gsm Brushed Fleece", "Plush Thermal Lining", "Streetwear Fit"],
  },
  {
    id: "prod-10",
    name: "Urban Casual Blue Shirt",
    kind: "shirt",
    color: "#2563eb",
    trim: "#1d4ed8",
    tag: "$24",
    image: "/blue shirt.jpg",
    description: "Breathable crisp cotton shirt in rich ocean blue, perfect for both office and weekend parties.",
    details: ["Breathable Cotton", "Spread Collar", "Tailored Cut"],
  },
  {
    id: "prod-7",
    name: "Slim Fit Modern T-Shirt",
    kind: "tee",
    color: "#e2e8f0",
    trim: "#cbd5e1",
    tag: "$22",
    image: "/tmen.webp",
    description: "High-quality stretch cotton fabric with tailored fit for a sharp, sleek silhouette.",
    details: ["Stretch Combed Cotton", "Athletic Silhouette", "Crewneck"],
  },
  {
    id: "prod-3",
    name: "Black Gauge Cargo Joggers",
    kind: "knit",
    color: "#18181b",
    trim: "#27272a",
    tag: "$17",
    image: "/jojoj.jpeg",
    description: "Durable tactical cargo joggers with deep utility pockets and comfortable elastic waistband.",
    details: ["Tactical Twill", "Elastic Ankle Cuffs", "Deep Cargo Pockets"],
  },
  {
    id: "prod-12",
    name: "Classic Deep Blue Jeans",
    kind: "jacket",
    color: "#1e3a5f",
    trim: "#162b47",
    tag: "$44",
    image: "/jean.jpg",
    description: "Everyday staple deep blue jeans with authentic five-pocket design and rivet reinforcements.",
    details: ["Raw Washed Denim", "Reinforced Rivets", "Classic 5-Pocket Cut"],
  },
];

export default function ClothingRailHeroDemo({ autoplay = true }: { autoplay?: boolean }) {
  return (
    <div data-rail-demo className="flex min-h-[500px] w-full items-center justify-center bg-background text-foreground">
      <ClothingRailHero
        items={RAIL_DEMO_ITEMS}
        hanger="wood"
        eyebrow="New Season • Exclusive Interactive Rail"
        heading="Touch, Slide & Turn Pieces on the Rail"
        caption="Brush along the rail, slide a hanger, or lift a piece to inspect in 360°."
        autoplay={autoplay}
        action={
          <button type="button" className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-800 hover:shadow-lg">
            Shop the edit
          </button>
        }
      />
    </div>
  );
}
