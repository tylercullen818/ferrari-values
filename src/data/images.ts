// Image mappings for all Ferrari models
// Using verified Unsplash photos matched to era/style

const IMAGES = {
  // Verified specific model photos
  f40: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80",
  testarossa: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  "458-italia": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "488-gtb": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&q=80",

  // Modern red Ferrari (Roma, F8, 296, SF90, Portofino)
  roma: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
  "f8-tributo": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
  "f8-spider": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
  "296-gtb": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
  "sf90-stradale": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
  portofino: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
  "12cilindri": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
  f80: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",

  // Classic Ferrari (250s, 275s, 330s, 365s)
  "250-gt-lusso": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  "250-pf-coupe": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  "275-gtb": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  "275-gtb-4": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  "365-gtb-4-daytona": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  "330-gt-2-2": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  "330-gtc": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  "365-gt-2-2": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  "365-gtc-4": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",

  // Yellow Ferrari (F50, Dino, 355s)
  f50: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80",
  "246-gt": "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80",
  "246-gts": "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80",
  "355-berlinetta": "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80",
  "355-gts": "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80",
  "355-spider": "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80",

  // Black/dark Ferrari (612, FF, GTC4, California)
  "612-scaglietti": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  ff: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "gtc4-lusso": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "gtc4-lusso-t": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  california: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "california-t": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",

  // White Ferrari (812, F12, Purosangue)
  "812-superfast": "https://images.unsplash.com/photo-1580274455191-1c62238ce452?w=800&q=80",
  "f12-berlinetta": "https://images.unsplash.com/photo-1580274455191-1c62238ce452?w=800&q=80",
  purosangue: "https://images.unsplash.com/photo-1580274455191-1c62238ce452?w=800&q=80",

  // Enzo & LaFerrari & 288 GTO & Daytona SP3 — red supercars
  enzo: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  laferrari: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  "288-gto": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  "daytona-sp3": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  superamerica: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",

  // Testarossa family (Flat-12)
  "365-gt4-bb": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  "512-bb": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  "512-bbi": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  "512-tr": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  "f512-m": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",

  // V12 GTs (550, 575, 599)
  "550-maranello": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  "550-barchetta": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  "575m-maranello": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  "599-gtb-fiorano": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",

  // 308 family & 328 — red vintage V8
  "308-gt4": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  "308-gtb": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  "308-gtb-fiberglass": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  "308-gts": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  "308-gts-qv": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  "308-gtsi": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  "328-gts": "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",

  // 348 family
  "348-tb": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "348-ts": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "348-spider": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",

  // 360/F430 era
  "360-modena": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "360-spider": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "challenge-stradale": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  f430: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "f430-spider": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "430-scuderia": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "scuderia-spider-16m": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",

  // 458/488 Spider
  "458-spider": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "488-spider": "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&q=80",

  // Modern GT
  "456-gt": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  "456m-gt": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
} as const;

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80";

export function getModelImage(slug: string): string {
  return (IMAGES as Record<string, string>)[slug] ?? DEFAULT_IMAGE;
}
