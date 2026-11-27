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
    image: "/shir.png",
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
    image: "/hood.png",
    hanger: "hook-only",
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
    image: "/jack.png",
    hanger: "hook-only",
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
    image: "/anime-t-shirt.png",
    description: "Iconic anime graphic print on ultra-soft breathable combed cotton fabric.",
    details: ["Combed Cotton", "High-Density Screenprint", "Comfort Fit", "Reinforced Collar"],
  },
  {
    id: "prod-8",
    name: "Charcoal Grey Urban Motion Hoodie",
    kind: "hoodie",
    color: "#2b2d30",
    trim: "#1c1d1f",
    tag: "$52",
    image: "/Charcoal Grey Urban Motion Hoodie.png",
    description: "Heavyweight luxury streetwear fleece hoodie in vintage washed charcoal grey with custom Urban Motion graphic print.",
    details: ["400 GSM Heavyweight Fleece", "Kangaroo Pouch Pocket", "Drop Shoulder Streetwear Cut", "Custom Screenprint"],
  },
  {
    id: "prod-9",
    name: "Classic Outerwear Denim Jacket",
    kind: "jacket",
    color: "#1d293d",
    trim: "#0f172a",
    tag: "$40",
    image: "/jk.png",
    hanger: "hook-only",
    description: "Iconic streetwear denim jacket with clean brass buttons and tailored fit.",
    details: ["Heavyweight Denim", "Buttoned Front", "Dual Flap Pockets"],
  },
  {
    id: "prod-10",
    name: "Classic Casual Shirt",
    kind: "shirt",
    color: "#3b82f6",
    trim: "#1d4ed8",
    tag: "$24",
    image: "/shirt.png",
    hanger: "hook-only",
    description: "Breathable crisp cotton shirt with a sharp tailored fit, perfect for both office and weekend parties.",
    details: ["Breathable Cotton", "Spread Collar", "Tailored Cut"],
  },
  {
    id: "prod-7",
    name: "Vintage Washed Straight Jeans",
    kind: "jacket",
    color: "#3b82f6",
    trim: "#1d4ed8",
    tag: "$22",
    image: "/jeanj.png",
    hanger: "hook-only",
    description: "Premium vintage washed denim with relaxed straight-leg cut and reinforced stitching.",
    details: ["100% Cotton Denim", "Straight Leg Cut", "Classic 5-Pocket Styling"],
  },
  {
    id: "prod-3",
    name: "Black Gauge Cargo Joggers",
    kind: "knit",
    color: "#18181b",
    trim: "#27272a",
    tag: "$17",
    image: "/jojoj.png",
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
    image: "/jean.png",
    hanger: "hook-only",
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
