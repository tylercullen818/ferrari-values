export type Category = "Legend" | "Modern" | "Classic";
export type Trend =
  | "Appreciating"
  | "Surging"
  | "Stable/Appreciating"
  | "Stabilizing"
  | "Depreciating"
  | "Above MSRP"
  | "Mild depreciation"
  | "Heavy depreciation";

export interface FerrariModel {
  slug: string;
  name: string;
  yearRange: string;
  category: Category;
  msrp: number | null;
  currentValue: number;
  change1Y: number | null;
  change5Y: number | null;
  change10Y: number | null;
  trend: Trend;
  thesis: string;
  historicalValues: { year: number; value: number }[];
}

function generateHistory(
  startYear: number,
  endYear: number,
  startValue: number,
  endValue: number,
  curve: "linear" | "exponential" | "dip" | "surge" = "linear"
): { year: number; value: number }[] {
  const points: { year: number; value: number }[] = [];
  const years = endYear - startYear;
  for (let i = 0; i <= years; i++) {
    const t = i / years;
    let value: number;
    switch (curve) {
      case "exponential":
        value = startValue + (endValue - startValue) * Math.pow(t, 1.8);
        break;
      case "dip":
        value =
          startValue +
          (endValue - startValue) * t +
          Math.sin(t * Math.PI) * (startValue - endValue) * 0.3;
        break;
      case "surge":
        value = startValue + (endValue - startValue) * Math.pow(t, 0.4);
        break;
      default:
        value = startValue + (endValue - startValue) * t;
    }
    points.push({ year: startYear + i, value: Math.round(value) });
  }
  return points;
}

export const ferrariModels: FerrariModel[] = [
  // === LEGENDS ===
  {
    slug: "250-gto",
    name: "250 GTO",
    yearRange: "1962-64",
    category: "Legend",
    msrp: 18000,
    currentValue: 52000000,
    change1Y: 8,
    change5Y: 35,
    change10Y: 85,
    trend: "Appreciating",
    thesis:
      "The holy grail of collector cars. Only 36 were built, making the 250 GTO one of the rarest and most desirable automobiles ever produced. Values have climbed steadily for decades driven by extreme scarcity, racing provenance, and status as the ultimate trophy asset. Demand from ultra-high-net-worth collectors ensures prices will likely continue to rise.",
    historicalValues: generateHistory(2014, 2026, 28000000, 52000000, "exponential"),
  },
  {
    slug: "288-gto",
    name: "288 GTO",
    yearRange: "1984-87",
    category: "Legend",
    msrp: 83000,
    currentValue: 3200000,
    change1Y: 12,
    change5Y: 45,
    change10Y: 120,
    trend: "Appreciating",
    thesis:
      "Ferrari's first modern supercar and the spiritual predecessor to the F40. Limited production of 272 units and its Group B homologation heritage give it enormous collector cachet. Recent appreciation has been driven by collectors seeking the 'original' in the GTO-F40-F50-Enzo lineage. Supply is fixed, and demand from knowledgeable enthusiasts continues to grow.",
    historicalValues: generateHistory(2014, 2026, 1450000, 3200000, "exponential"),
  },
  {
    slug: "f40",
    name: "F40",
    yearRange: "1987-92",
    category: "Legend",
    msrp: 399150,
    currentValue: 2800000,
    change1Y: 15,
    change5Y: 55,
    change10Y: 180,
    trend: "Appreciating",
    thesis:
      "The last Ferrari personally approved by Enzo himself, the F40 represents raw, uncompromising performance. Its twin-turbo V8, Kevlar body, and stripped-out cockpit make it the poster car of the late 1980s. Values dipped in the early 2000s but have surged as the generation that grew up with F40 posters entered peak earning years. Cultural significance and limited production ensure long-term appreciation.",
    historicalValues: generateHistory(2014, 2026, 1000000, 2800000, "exponential"),
  },
  {
    slug: "f50",
    name: "F50",
    yearRange: "1995-97",
    category: "Legend",
    msrp: 475000,
    currentValue: 5300000,
    change1Y: 60,
    change5Y: 160,
    change10Y: 300,
    trend: "Surging",
    thesis:
      "Long considered the 'forgotten' halo car between the F40 and Enzo, the F50 has seen explosive appreciation as collectors recognized its unique attributes: a Formula 1-derived V12, carbon fiber monocoque, and only 349 units built. The car was undervalued for years relative to the F40, creating a correction that is now in full swing. The F50 may be the best-performing Ferrari investment of the decade.",
    historicalValues: generateHistory(2014, 2026, 1325000, 5300000, "surge"),
  },
  {
    slug: "enzo",
    name: "Enzo",
    yearRange: "2002-04",
    category: "Legend",
    msrp: 659330,
    currentValue: 3800000,
    change1Y: 18,
    change5Y: 52,
    change10Y: 140,
    trend: "Appreciating",
    thesis:
      "Named after the founder and limited to 400 road cars, the Enzo combined F1 technology with dramatic Pininfarina styling. Its naturally aspirated V12 and carbon ceramic brakes were groundbreaking for the era. Values have climbed steadily as the car transitions from 'used exotic' to bona fide collector piece. The Enzo's place in Ferrari's lineage as the bridge to the hybrid era makes it historically significant.",
    historicalValues: generateHistory(2014, 2026, 1580000, 3800000, "exponential"),
  },
  {
    slug: "laferrari",
    name: "LaFerrari",
    yearRange: "2013-16",
    category: "Legend",
    msrp: 1420000,
    currentValue: 3900000,
    change1Y: 10,
    change5Y: 30,
    change10Y: null,
    trend: "Appreciating",
    thesis:
      "Ferrari's first hybrid hypercar, limited to 499 coupes and 210 Apertas. The HY-KERS system pairs a 6.3L V12 with electric motors for 950hp. As the newest member of the halo car lineage, it has strong upside potential. Current appreciation is moderate compared to older legends, but as the car ages and the naturally aspirated V12 becomes increasingly rare, expect acceleration in value growth.",
    historicalValues: generateHistory(2016, 2026, 2500000, 3900000, "linear"),
  },

  // === MODERN ===
  {
    slug: "458-italia",
    name: "458 Italia",
    yearRange: "2010-15",
    category: "Modern",
    msrp: 239340,
    currentValue: 210000,
    change1Y: 5,
    change5Y: 15,
    change10Y: null,
    trend: "Stable/Appreciating",
    thesis:
      "Widely regarded as one of Ferrari's greatest mid-engine V8s, the 458 Italia marks the end of the naturally aspirated era for the company's core sports car. Its 4.5L flat-plane crank V8 revs to 9,000 rpm and sounds extraordinary. After initial depreciation, values bottomed around 2019 and have been climbing. The 458 is following the classic Ferrari appreciation curve, and the Speciale variant commands significant premiums.",
    historicalValues: generateHistory(2015, 2026, 239340, 210000, "dip"),
  },
  {
    slug: "488-gtb",
    name: "488 GTB",
    yearRange: "2015-19",
    category: "Modern",
    msrp: 262647,
    currentValue: 241650,
    change1Y: -2,
    change5Y: -8,
    change10Y: null,
    trend: "Stabilizing",
    thesis:
      "Ferrari's first turbocharged V8 mid-engine car since the F40. While fast and capable, the 488 sits in a transitional period where initial depreciation is slowing but appreciation hasn't started. Compared to the 458, the turbo engine is less emotionally engaging for collectors. However, the Pista variant is already showing strength, and the base 488 should stabilize as supply dries up.",
    historicalValues: generateHistory(2019, 2026, 262647, 241650, "dip"),
  },
  {
    slug: "f8-tributo",
    name: "F8 Tributo",
    yearRange: "2019-22",
    category: "Modern",
    msrp: 280000,
    currentValue: 245000,
    change1Y: -6,
    change5Y: null,
    change10Y: null,
    trend: "Depreciating",
    thesis:
      "The final evolution of the 488 platform, the F8 Tributo delivered 710hp from its twin-turbo V8. While a brilliant driving machine, it faces headwinds from being the last of its platform generation and abundant supply in the used market. Depreciation is slowing, suggesting the floor is approaching. Patient buyers may be rewarded as the car follows the 458's trajectory in 3-5 years.",
    historicalValues: generateHistory(2022, 2026, 280000, 245000, "linear"),
  },
  {
    slug: "812-superfast",
    name: "812 Superfast",
    yearRange: "2017-22",
    category: "Modern",
    msrp: 363730,
    currentValue: 340000,
    change1Y: -4,
    change5Y: -10,
    change10Y: null,
    trend: "Mild depreciation",
    thesis:
      "The most powerful naturally aspirated production V12 ever at 789hp, the 812 Superfast represents the peak of front-engine Ferrari GT performance. As Ferrari moves to hybrid and electric powertrains, the 812 will be remembered as the last of its kind. Mild depreciation today masks long-term potential. The Competizione variant already trades at significant premiums, a sign the base model will follow.",
    historicalValues: generateHistory(2020, 2026, 363730, 340000, "dip"),
  },
  {
    slug: "roma",
    name: "Roma",
    yearRange: "2020-24",
    category: "Modern",
    msrp: 226570,
    currentValue: 195000,
    change1Y: -10,
    change5Y: null,
    change10Y: null,
    trend: "Depreciating",
    thesis:
      "The Roma is Ferrari's entry-level grand tourer, styled as a modern interpretation of 1960s La Dolce Vita elegance. While beautiful, its positioning as the most accessible Ferrari means higher production numbers and more turnover in the used market. Depreciation is expected to continue for 2-3 more years before stabilizing. Not a strong investment candidate, but an excellent value proposition for drivers.",
    historicalValues: generateHistory(2022, 2026, 226570, 195000, "linear"),
  },
  {
    slug: "sf90-stradale",
    name: "SF90 Stradale",
    yearRange: "2020-24",
    category: "Modern",
    msrp: 524815,
    currentValue: 420000,
    change1Y: -15,
    change5Y: null,
    change10Y: null,
    trend: "Heavy depreciation",
    thesis:
      "Ferrari's 986hp plug-in hybrid flagship represents the company's technological pinnacle with a twin-turbo V8, three electric motors, and all-wheel drive. Despite record performance numbers, the SF90 is experiencing the steepest depreciation of any current Ferrari. High original MSRPs, complex hybrid systems raising maintenance concerns, and steady new production are pressuring values. This may be a buying opportunity for patient collectors.",
    historicalValues: generateHistory(2022, 2026, 524815, 420000, "linear"),
  },
  {
    slug: "296-gtb",
    name: "296 GTB",
    yearRange: "2022-present",
    category: "Modern",
    msrp: 322986,
    currentValue: 280000,
    change1Y: -8,
    change5Y: null,
    change10Y: null,
    trend: "Depreciating",
    thesis:
      "The 296 GTB marks Ferrari's first V6 hybrid, combining a 3.0L twin-turbo V6 with an electric motor for 819hp. Purists initially balked at the downsized engine, but driving reviews have been stellar. Values are depreciating as the car is still in production with steady supply. The Assetto Fiorano and eventual special editions should hold value better. Long-term outlook depends on how the V6 hybrid is perceived historically.",
    historicalValues: generateHistory(2023, 2026, 322986, 280000, "linear"),
  },
  {
    slug: "purosangue",
    name: "Purosangue",
    yearRange: "2023-present",
    category: "Modern",
    msrp: 398350,
    currentValue: 450000,
    change1Y: 5,
    change5Y: null,
    change10Y: null,
    trend: "Above MSRP",
    thesis:
      "Ferrari's first four-door, four-seat vehicle is powered by a naturally aspirated 6.5L V12 making 715hp. Despite controversy over the concept, demand has far outstripped supply, with wait lists extending years. Trading above MSRP reflects genuine scarcity and a new buyer demographic entering the Ferrari ecosystem. As an NA V12 in a practical package, the Purosangue occupies a unique niche that should support values.",
    historicalValues: generateHistory(2024, 2026, 398350, 450000, "surge"),
  },
  {
    slug: "sf90-xx",
    name: "SF90 XX",
    yearRange: "2023-present",
    category: "Modern",
    msrp: 799000,
    currentValue: 1200000,
    change1Y: 20,
    change5Y: null,
    change10Y: null,
    trend: "Above MSRP",
    thesis:
      "The track-focused evolution of the SF90, limited to 799 units with 1,030hp. The XX badge carries enormous weight in Ferrari lore, and allocation was reserved for top clients. Trading at 50% above MSRP reflects both scarcity and the desirability of the XX nameplate. Expect continued strength as the car is fully allocated and secondary market demand remains high.",
    historicalValues: generateHistory(2024, 2026, 850000, 1200000, "surge"),
  },
  {
    slug: "daytona-sp3",
    name: "Daytona SP3",
    yearRange: "2022-24",
    category: "Modern",
    msrp: 2250000,
    currentValue: 3500000,
    change1Y: 15,
    change5Y: null,
    change10Y: null,
    trend: "Above MSRP",
    thesis:
      "Part of Ferrari's Icona series celebrating design heritage, the Daytona SP3 features the 812 Competizione's 828hp V12 in a stunning targa body inspired by 1960s sports prototypes. Limited to 599 units and allocated exclusively to VIP clients, it trades at a significant premium. The Icona series has proven to be a strong investment, and the SP3's naturally aspirated V12 and dramatic styling ensure lasting desirability.",
    historicalValues: generateHistory(2023, 2026, 2400000, 3500000, "surge"),
  },

  // === CLASSICS ===
  {
    slug: "testarossa",
    name: "Testarossa",
    yearRange: "1984-96",
    category: "Classic",
    msrp: null,
    currentValue: 165000,
    change1Y: 8,
    change5Y: 25,
    change10Y: null,
    trend: "Appreciating",
    thesis:
      "The iconic side-straked supercar of the 1980s, the Testarossa defined an era of automotive excess and pop culture. Its flat-12 engine and Pininfarina design are instantly recognizable. After bottoming out in the early 2010s, values have climbed steadily as 1980s nostalgia drives demand. The Testarossa is now firmly in 'classic' territory with appreciation expected to continue, particularly for well-maintained, low-mileage examples.",
    historicalValues: generateHistory(2016, 2026, 132000, 165000, "exponential"),
  },
  {
    slug: "355",
    name: "F355",
    yearRange: "1994-99",
    category: "Classic",
    msrp: null,
    currentValue: 85000,
    change1Y: 10,
    change5Y: 40,
    change10Y: null,
    trend: "Appreciating",
    thesis:
      "Many enthusiasts consider the F355 the best-sounding Ferrari ever made, with its 3.5L V8 screaming to 8,500 rpm. The 355 was the first Ferrari to truly combine daily usability with supercar performance. Long undervalued, the 355 has become one of the hottest classic Ferraris as buyers recognize its brilliant driving dynamics and relative affordability. Manual gearbox examples command the highest premiums.",
    historicalValues: generateHistory(2016, 2026, 60700, 85000, "exponential"),
  },
  {
    slug: "360-modena",
    name: "360 Modena",
    yearRange: "1999-05",
    category: "Classic",
    msrp: null,
    currentValue: 95000,
    change1Y: 6,
    change5Y: 20,
    change10Y: null,
    trend: "Appreciating",
    thesis:
      "The 360 Modena was a clean-sheet design that introduced aluminum construction to Ferrari's mid-engine range. Its 3.6L V8 and Pininfarina styling aged gracefully, and the car represents accessible Ferrari ownership for many collectors. After years as a depreciation casualty, the 360 has reversed course. Manual transmission cars and the Challenge Stradale variant are leading the appreciation curve.",
    historicalValues: generateHistory(2016, 2026, 79000, 95000, "exponential"),
  },
  {
    slug: "430-scuderia",
    name: "430 Scuderia",
    yearRange: "2007-10",
    category: "Classic",
    msrp: null,
    currentValue: 310000,
    change1Y: 12,
    change5Y: 35,
    change10Y: null,
    trend: "Appreciating",
    thesis:
      "The lightweight, track-focused variant of the F430, the Scuderia stripped 100kg and added the F1 Traction Control system from the Enzo. With its naturally aspirated 4.3L V8 and aggressive aero, it represents the pinnacle of the pre-turbo, pre-hybrid era. Values have been climbing rapidly as the Scuderia is increasingly seen as the last 'pure analog' Ferrari track weapon. Limited production supports continued growth.",
    historicalValues: generateHistory(2016, 2026, 230000, 310000, "exponential"),
  },
];

export function getModelBySlug(slug: string): FerrariModel | undefined {
  return ferrariModels.find((m) => m.slug === slug);
}

export function getModelsByCategory(category: Category): FerrariModel[] {
  return ferrariModels.filter((m) => m.category === category);
}

export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value.toLocaleString()}`;
}

export function formatFullCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export const totalModelsTracked = ferrariModels.length;

export const avgLegendAppreciation = Math.round(
  ferrariModels
    .filter((m) => m.category === "Legend" && m.change5Y !== null)
    .reduce((sum, m) => sum + (m.change5Y ?? 0), 0) /
    ferrariModels.filter((m) => m.category === "Legend" && m.change5Y !== null).length
);

export const totalMarketValue = ferrariModels.reduce(
  (sum, m) => sum + m.currentValue,
  0
);
