// Image mappings for all Ferrari models
// ALL URLs verified — return HTTP 200 and confirmed to show actual Ferraris via vision model

const IMAGES: Record<string, string> = {
  // F40 — overhead shot, dramatic lighting (VERIFIED: Ferrari F40)
  "f40": "https://images.unsplash.com/photo-1690998199897-c32c0798a456?w=800&q=80",
  // F8 Tributo (VERIFIED: Ferrari F8 Tributo)
  "f8-tributo": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  "f8-spider": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  // LaFerrari (VERIFIED: Ferrari LaFerrari)
  "laferrari": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  // 488 family (VERIFIED: Ferrari 488)
  "488-gtb": "https://images.unsplash.com/photo-1645539706006-83c3b9bcd0d4?w=800&q=80",
  "488-spider": "https://images.unsplash.com/photo-1645539706006-83c3b9bcd0d4?w=800&q=80",
  // 308 GTS (VERIFIED: Ferrari 308)
  "308-gt4": "https://images.unsplash.com/photo-1496075770424-93caa7ccf953?w=800&q=80",
  "308-gtb": "https://images.unsplash.com/photo-1496075770424-93caa7ccf953?w=800&q=80",
  "308-gtb-fiberglass": "https://images.unsplash.com/photo-1496075770424-93caa7ccf953?w=800&q=80",
  "308-gts": "https://images.unsplash.com/photo-1496075770424-93caa7ccf953?w=800&q=80",
  "308-gts-qv": "https://images.unsplash.com/photo-1496075770424-93caa7ccf953?w=800&q=80",
  "308-gtsi": "https://images.unsplash.com/photo-1496075770424-93caa7ccf953?w=800&q=80",
  "328-gts": "https://images.unsplash.com/photo-1496075770424-93caa7ccf953?w=800&q=80",
  // Enzo (VERIFIED: Ferrari Enzo)
  "enzo": "https://images.unsplash.com/photo-1474642009266-4886072d7546?w=800&q=80",
  // Testarossa (VERIFIED: Ferrari Testarossa)
  "testarossa": "https://images.unsplash.com/photo-1744457754054-39656e936c8b?w=800&q=80",
  "512-tr": "https://images.unsplash.com/photo-1744457754054-39656e936c8b?w=800&q=80",
  "f512-m": "https://images.unsplash.com/photo-1744457754054-39656e936c8b?w=800&q=80",
  "365-gt4-bb": "https://images.unsplash.com/photo-1744457754054-39656e936c8b?w=800&q=80",
  "512-bb": "https://images.unsplash.com/photo-1744457754054-39656e936c8b?w=800&q=80",
  "512-bbi": "https://images.unsplash.com/photo-1744457754054-39656e936c8b?w=800&q=80",
  // Classic V12 GTs
  "250-gt-lusso": "https://images.unsplash.com/photo-1474642009266-4886072d7546?w=800&q=80",
  "250-pf-coupe": "https://images.unsplash.com/photo-1474642009266-4886072d7546?w=800&q=80",
  "275-gtb": "https://images.unsplash.com/photo-1474642009266-4886072d7546?w=800&q=80",
  "275-gtb-4": "https://images.unsplash.com/photo-1474642009266-4886072d7546?w=800&q=80",
  "365-gtb-4-daytona": "https://images.unsplash.com/photo-1474642009266-4886072d7546?w=800&q=80",
  "330-gt-2-2": "https://images.unsplash.com/photo-1474642009266-4886072d7546?w=800&q=80",
  "330-gtc": "https://images.unsplash.com/photo-1474642009266-4886072d7546?w=800&q=80",
  "365-gt-2-2": "https://images.unsplash.com/photo-1474642009266-4886072d7546?w=800&q=80",
  "365-gtc-4": "https://images.unsplash.com/photo-1474642009266-4886072d7546?w=800&q=80",
  // Dino
  "246-gt": "https://images.unsplash.com/photo-1496075770424-93caa7ccf953?w=800&q=80",
  "246-gts": "https://images.unsplash.com/photo-1496075770424-93caa7ccf953?w=800&q=80",
  // 348/355/360
  "348-tb": "https://images.unsplash.com/photo-1645539706006-83c3b9bcd0d4?w=800&q=80",
  "348-ts": "https://images.unsplash.com/photo-1645539706006-83c3b9bcd0d4?w=800&q=80",
  "348-spider": "https://images.unsplash.com/photo-1645539706006-83c3b9bcd0d4?w=800&q=80",
  "355-berlinetta": "https://images.unsplash.com/photo-1645539706006-83c3b9bcd0d4?w=800&q=80",
  "355-gts": "https://images.unsplash.com/photo-1645539706006-83c3b9bcd0d4?w=800&q=80",
  "355-spider": "https://images.unsplash.com/photo-1645539706006-83c3b9bcd0d4?w=800&q=80",
  "360-modena": "https://images.unsplash.com/photo-1645539706006-83c3b9bcd0d4?w=800&q=80",
  "360-spider": "https://images.unsplash.com/photo-1645539706006-83c3b9bcd0d4?w=800&q=80",
  "challenge-stradale": "https://images.unsplash.com/photo-1645539706006-83c3b9bcd0d4?w=800&q=80",
  // F430
  "f430": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "f430-spider": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "430-scuderia": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "scuderia-spider-16m": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  // 458
  "458-italia": "https://images.unsplash.com/photo-1645539706006-83c3b9bcd0d4?w=800&q=80",
  "458-spider": "https://images.unsplash.com/photo-1645539706006-83c3b9bcd0d4?w=800&q=80",
  // Modern hybrids
  "296-gtb": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  "sf90-stradale": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  "sf90-xx": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  "purosangue": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  "12cilindri": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  "f80": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  // Legends
  "f50": "https://images.unsplash.com/photo-1690998199897-c32c0798a456?w=800&q=80",
  "288-gto": "https://images.unsplash.com/photo-1690998199897-c32c0798a456?w=800&q=80",
  // V12 GTs
  "550-maranello": "https://images.unsplash.com/photo-1474642009266-4886072d7546?w=800&q=80",
  "550-barchetta": "https://images.unsplash.com/photo-1474642009266-4886072d7546?w=800&q=80",
  "575m-maranello": "https://images.unsplash.com/photo-1474642009266-4886072d7546?w=800&q=80",
  "599-gtb-fiorano": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "f12-berlinetta": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "812-superfast": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  // Modern GT
  "456-gt": "https://images.unsplash.com/photo-1474642009266-4886072d7546?w=800&q=80",
  "456m-gt": "https://images.unsplash.com/photo-1474642009266-4886072d7546?w=800&q=80",
  "612-scaglietti": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "ff": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "gtc4-lusso": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "gtc4-lusso-t": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "california": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "california-t": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "portofino": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  "roma": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  "superamerica": "https://images.unsplash.com/photo-1474642009266-4886072d7546?w=800&q=80",
  "daytona-sp3": "https://images.unsplash.com/photo-1690998199897-c32c0798a456?w=800&q=80",
};

// Default fallback: Ferrari badge closeup (VERIFIED as Ferrari)
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1546480352-b36b6f5627e4?w=800&q=80";

// Hero: F40 overhead in dramatic dark lighting (VERIFIED: Ferrari F40)
export const HERO_IMAGE = "https://images.unsplash.com/photo-1690998199897-c32c0798a456?w=1600&q=80";

export function getModelImage(slug: string): string {
  return IMAGES[slug] ?? DEFAULT_IMAGE;
}
