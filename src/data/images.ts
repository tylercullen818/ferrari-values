// Image mappings for all Ferrari models
// Using VERIFIED Unsplash photo IDs that actually show Ferraris

const IMAGES = {
  // === VERIFIED specific model photos ===
  // F40
  f40: "https://images.unsplash.com/photo-bOfnYZZPg9U?w=800&q=80",

  // Testarossa family (Flat-12)
  testarossa: "https://images.unsplash.com/photo-jl3lE6hqug0?w=800&q=80",
  "365-gt4-bb": "https://images.unsplash.com/photo-FO7k8ixBpIo?w=800&q=80",
  "512-bb": "https://images.unsplash.com/photo-jl3lE6hqug0?w=800&q=80",
  "512-bbi": "https://images.unsplash.com/photo-FO7k8ixBpIo?w=800&q=80",
  "512-tr": "https://images.unsplash.com/photo-SyG3Xf_ZxfM?w=800&q=80",
  "f512-m": "https://images.unsplash.com/photo-jl3lE6hqug0?w=800&q=80",

  // 488 family
  "488-gtb": "https://images.unsplash.com/photo-BmXUSx5bQJM?w=800&q=80",
  "488-spider": "https://images.unsplash.com/photo-uPrFF1Qat2s?w=800&q=80",

  // 458 family
  "458-italia": "https://images.unsplash.com/photo-QYtiZwB87RM?w=800&q=80",
  "458-spider": "https://images.unsplash.com/photo-_DzW3MT-iIY?w=800&q=80",

  // Dino & Early V8
  "246-gt": "https://images.unsplash.com/photo-o7ceuBKduk0?w=800&q=80",
  "246-gts": "https://images.unsplash.com/photo-o7ceuBKduk0?w=800&q=80",

  // LaFerrari
  laferrari: "https://images.unsplash.com/photo-71xBWkuCrB4?w=800&q=80",

  // Enzo
  enzo: "https://images.unsplash.com/photo-KvqkDLb8Ay8?w=800&q=80",

  // === ERA GROUPINGS with verified photos ===

  // Classic V12 GTs (250/275/330/365) → classic red Ferrari
  "250-gt-lusso": "https://images.unsplash.com/photo-o7ceuBKduk0?w=800&q=80",
  "250-pf-coupe": "https://images.unsplash.com/photo-KvqkDLb8Ay8?w=800&q=80",
  "275-gtb": "https://images.unsplash.com/photo-o7ceuBKduk0?w=800&q=80",
  "275-gtb-4": "https://images.unsplash.com/photo-KvqkDLb8Ay8?w=800&q=80",
  "365-gtb-4-daytona": "https://images.unsplash.com/photo-o7ceuBKduk0?w=800&q=80",
  "330-gt-2-2": "https://images.unsplash.com/photo-KvqkDLb8Ay8?w=800&q=80",
  "330-gtc": "https://images.unsplash.com/photo-o7ceuBKduk0?w=800&q=80",
  "365-gt-2-2": "https://images.unsplash.com/photo-KvqkDLb8Ay8?w=800&q=80",
  "365-gtc-4": "https://images.unsplash.com/photo-o7ceuBKduk0?w=800&q=80",

  // 308/328 family → red vintage Ferrari
  "308-gt4": "https://images.unsplash.com/photo-zhkoDdys_Ys?w=800&q=80",
  "308-gtb": "https://images.unsplash.com/photo-zhkoDdys_Ys?w=800&q=80",
  "308-gtb-fiberglass": "https://images.unsplash.com/photo-zhkoDdys_Ys?w=800&q=80",
  "308-gts": "https://images.unsplash.com/photo-zhkoDdys_Ys?w=800&q=80",
  "308-gts-qv": "https://images.unsplash.com/photo-zhkoDdys_Ys?w=800&q=80",
  "308-gtsi": "https://images.unsplash.com/photo-zhkoDdys_Ys?w=800&q=80",
  "328-gts": "https://images.unsplash.com/photo-zhkoDdys_Ys?w=800&q=80",

  // 348/355/360 era → red Ferrari
  "348-tb": "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",
  "348-ts": "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",
  "348-spider": "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",
  "355-berlinetta": "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",
  "355-gts": "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",
  "355-spider": "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",
  "360-modena": "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",
  "360-spider": "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",
  "challenge-stradale": "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",

  // F430 variants → close to 458 era
  f430: "https://images.unsplash.com/photo-QYtiZwB87RM?w=800&q=80",
  "f430-spider": "https://images.unsplash.com/photo-_DzW3MT-iIY?w=800&q=80",
  "430-scuderia": "https://images.unsplash.com/photo-whuGe0sAGyQ?w=800&q=80",
  "scuderia-spider-16m": "https://images.unsplash.com/photo-QYtiZwB87RM?w=800&q=80",

  // F8/SF90/296 modern → red Ferrari on pavement
  "f8-tributo": "https://images.unsplash.com/photo-uPrFF1Qat2s?w=800&q=80",
  "f8-spider": "https://images.unsplash.com/photo-uPrFF1Qat2s?w=800&q=80",
  "296-gtb": "https://images.unsplash.com/photo-uPrFF1Qat2s?w=800&q=80",
  "sf90-stradale": "https://images.unsplash.com/photo-uPrFF1Qat2s?w=800&q=80",

  // GT/California/Roma/Portofino → red Ferrari
  roma: "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",
  portofino: "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",
  california: "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",
  "california-t": "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",

  // F50 & 288 GTO → red sports car
  f50: "https://images.unsplash.com/photo-KvqkDLb8Ay8?w=800&q=80",
  "288-gto": "https://images.unsplash.com/photo-KvqkDLb8Ay8?w=800&q=80",

  // V12 GTs (550, 575, 599, 612)
  "550-maranello": "https://images.unsplash.com/photo-zhkoDdys_Ys?w=800&q=80",
  "550-barchetta": "https://images.unsplash.com/photo-zhkoDdys_Ys?w=800&q=80",
  "575m-maranello": "https://images.unsplash.com/photo-zhkoDdys_Ys?w=800&q=80",
  "599-gtb-fiorano": "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",
  "612-scaglietti": "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",

  // Modern V12 (812, F12)
  "812-superfast": "https://images.unsplash.com/photo-QUebdM0_72g?w=800&q=80",
  "f12-berlinetta": "https://images.unsplash.com/photo-QUebdM0_72g?w=800&q=80",

  // Modern GT / SUV
  purosangue: "https://images.unsplash.com/photo-uPrFF1Qat2s?w=800&q=80",
  ff: "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",
  "gtc4-lusso": "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",
  "gtc4-lusso-t": "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80",

  // Current production
  "12cilindri": "https://images.unsplash.com/photo-uPrFF1Qat2s?w=800&q=80",
  f80: "https://images.unsplash.com/photo-uPrFF1Qat2s?w=800&q=80",

  // Special editions
  "daytona-sp3": "https://images.unsplash.com/photo-KvqkDLb8Ay8?w=800&q=80",
  superamerica: "https://images.unsplash.com/photo-zhkoDdys_Ys?w=800&q=80",

  // Modern GT coupes
  "456-gt": "https://images.unsplash.com/photo-zhkoDdys_Ys?w=800&q=80",
  "456m-gt": "https://images.unsplash.com/photo-zhkoDdys_Ys?w=800&q=80",
} as const;

// Default fallback: generic red Ferrari
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-cGJYqJ9T7Ww?w=800&q=80";

// Hero image: F40 in dramatic dark lighting
export const HERO_IMAGE =
  "https://images.unsplash.com/photo-bOfnYZZPg9U?w=1600&q=80";

export function getModelImage(slug: string): string {
  return (IMAGES as Record<string, string>)[slug] ?? DEFAULT_IMAGE;
}
