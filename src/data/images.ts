export const modelImages: Record<string, string> = {
  "250-gto":
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "288-gto":
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  f40: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80",
  f50: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
  enzo: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  laferrari:
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  testarossa:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  "355":
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "360-modena":
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "430-scuderia":
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "458-italia":
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "488-gtb":
    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&q=80",
  "f8-tributo":
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  "812-superfast":
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  roma: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
  "sf90-stradale":
    "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80",
  "296-gtb":
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  purosangue:
    "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
  "sf90-xx":
    "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80",
  "daytona-sp3":
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80";

export function getModelImage(slug: string): string {
  return modelImages[slug] ?? DEFAULT_IMAGE;
}
