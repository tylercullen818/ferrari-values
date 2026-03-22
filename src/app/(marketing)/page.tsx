"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import {
  ferrariModels,
  formatCurrency,
  totalModelsTracked,
  totalMarketValue,
  bestPerformer,
  worstPerformer,
  getAllCategories,
  type FerrariCategory,
} from "@/data/ferraris";
import { getModelImage } from "@/data/images";

type SortOption = "value-desc" | "value-asc" | "change-desc" | "change-asc" | "name";
type FilterCategory = "All" | FerrariCategory;

function TrendArrow({ change }: { change: number | null }) {
  if (change === null) return <span className="text-xs text-[#888880]">N/A</span>;
  const isPositive = change >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-sm font-semibold ${isPositive ? "text-gain" : "text-loss"}`}>
      {isPositive ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
      {isPositive ? "+" : ""}{change.toFixed(1)}%
    </span>
  );
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>("All");
  const [sort, setSort] = useState<SortOption>("value-desc");
  const [showFilters, setShowFilters] = useState(false);

  const categories: FilterCategory[] = ["All", ...getAllCategories()];

  const filtered = useMemo(() => {
    let models = [...ferrariModels];

    if (search) {
      const q = search.toLowerCase();
      models = models.filter(
        (m) => m.name.toLowerCase().includes(q) || m.yearRange.includes(q) || m.category.toLowerCase().includes(q)
      );
    }

    if (categoryFilter !== "All") {
      models = models.filter((m) => m.category === categoryFilter);
    }

    switch (sort) {
      case "value-desc":
        models.sort((a, b) => b.currentValue - a.currentValue);
        break;
      case "value-asc":
        models.sort((a, b) => a.currentValue - b.currentValue);
        break;
      case "change-desc":
        models.sort((a, b) => (b.sixYearChange ?? -999) - (a.sixYearChange ?? -999));
        break;
      case "change-asc":
        models.sort((a, b) => (a.sixYearChange ?? 999) - (b.sixYearChange ?? 999));
        break;
      case "name":
        models.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return models;
  }, [search, categoryFilter, sort]);

  return (
    <>
      {/* Hero - Full bleed cinematic F40 photo */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1600&q=80"
            alt="Ferrari F40"
            fill
            className="object-cover opacity-50"
            priority
            sizes="100vw"
          />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />

        {/* Content overlay */}
        <div className="relative z-10 container py-20">
          <div className="max-w-2xl">
            <BlurFade delay={0}>
              <div className="mb-6 inline-flex items-center gap-2 border border-[#333] bg-[#141414]/80 px-4 py-1.5 text-xs font-medium tracking-[0.1em] uppercase text-[#888880] backdrop-blur-sm">
                <TrendingUp className="size-3.5 text-[#DC0000]" />
                Real market data — March 2026
              </div>
            </BlurFade>
            <BlurFade delay={0.05}>
              <h1 className="text-5xl font-bold tracking-[-0.02em] leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl text-[#F5F5F0]">
                Ferrari Market
                <br />
                <span className="text-[#DC0000]">Intelligence</span>
              </h1>
            </BlurFade>
            <BlurFade delay={0.1}>
              <p className="mt-6 max-w-lg text-lg text-[#888880] leading-relaxed">
                Track values, spot trends, and make informed decisions across {totalModelsTracked} models with real auction data from 2020-2026.
              </p>
            </BlurFade>
            <BlurFade delay={0.15}>
              <div className="mt-8 flex gap-4">
                <Button size="lg" className="bg-[#DC0000] hover:bg-[#B30000] text-white rounded-none px-8 text-sm tracking-[0.05em] uppercase font-medium" asChild>
                  <a href="#models">Explore Models</a>
                </Button>
                <Button size="lg" variant="outline" className="border-[#333] text-[#F5F5F0] hover:bg-[#141414] rounded-none px-8 text-sm tracking-[0.05em] uppercase font-medium" asChild>
                  <Link href="/compare">Compare</Link>
                </Button>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="border-y border-[#222] bg-[#0e0e0e] py-16">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-12 px-4 sm:gap-20">
          {[
            { value: totalModelsTracked, label: "MODELS TRACKED", prefix: "" },
            { value: 123, label: `BEST PERFORMER (${bestPerformer.model.name})`, prefix: "+", suffix: "%" },
            { value: 42, label: `WORST (${worstPerformer.model.name})`, prefix: "-", suffix: "%", highlight: true },
            { value: Math.round(totalMarketValue / 1000000), label: "TOTAL MARKET VALUE", prefix: "$", suffix: "M" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className={`text-5xl md:text-6xl font-bold tabular-nums tracking-[-0.02em] ${stat.highlight ? "text-loss" : "text-[#F5F5F0]"}`}>
                {stat.prefix}<NumberTicker value={stat.value} />{stat.suffix || ""}
              </p>
              <p className="mt-2 text-[10px] font-medium tracking-[0.15em] uppercase text-[#888880]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Model Grid */}
      <section id="models" className="mx-auto max-w-7xl px-4 py-20">
        <BlurFade delay={0} inView>
          <div className="mb-10">
            <h2 className="text-4xl font-bold tracking-[-0.02em] text-[#F5F5F0]">All Models</h2>
            <p className="mt-2 text-sm text-[#888880]">
              {filtered.length} of {ferrariModels.length} models — 6-year market data (2020-2026)
            </p>
          </div>
        </BlurFade>

        {/* Category Tabs */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={categoryFilter === cat ? "default" : "outline"}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-none text-xs ${
                categoryFilter === cat
                  ? "bg-[#DC0000] hover:bg-[#B30000] text-white"
                  : "border-[#333] text-[#888880] hover:text-[#F5F5F0]"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#888880]" />
              <Input
                enterKeyHint="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-[#141414] border-[#222] text-[#F5F5F0] rounded-none focus:ring-[#DC0000]"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto border-[#222] text-[#F5F5F0] hover:bg-[#141414] rounded-none"
            >
              <SlidersHorizontal className="mr-2 size-4" />
              Sort
            </Button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-6 border border-[#222] bg-[#141414] p-6">
              <div>
                <p className="mb-2 text-[10px] font-medium text-[#888880] uppercase tracking-[0.15em]">
                  Sort By
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { value: "value-desc" as SortOption, label: "Value (High)" },
                    { value: "value-asc" as SortOption, label: "Value (Low)" },
                    { value: "change-desc" as SortOption, label: "Best Appreciation" },
                    { value: "change-asc" as SortOption, label: "Worst Depreciation" },
                    { value: "name" as SortOption, label: "Name" },
                  ].map((s) => (
                    <Button
                      key={s.value}
                      size="sm"
                      variant={sort === s.value ? "default" : "outline"}
                      onClick={() => setSort(s.value)}
                      className={`rounded-none text-xs ${
                        sort === s.value
                          ? "bg-[#DC0000] hover:bg-[#B30000] text-white"
                          : "border-[#333] text-[#888880] hover:text-[#F5F5F0]"
                      }`}
                    >
                      {s.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((model, i) => (
            <BlurFade key={model.slug} delay={Math.min(i * 0.02, 0.2)} inView>
              <Link href={`/models/${model.slug}`}>
                <div className="group relative h-[380px] overflow-hidden border border-[#222] bg-[#141414] cursor-pointer transition-all duration-500 hover:border-[#DC0000]/40">
                  {/* Background image */}
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                    <Image
                      src={getModelImage(model.slug)}
                      alt={model.name}
                      fill
                      className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#888880] bg-[#0A0A0A]/70 px-2.5 py-1 backdrop-blur-sm border border-[#333]">
                      {model.category}
                    </span>
                  </div>

                  {/* 6Y change badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <TrendArrow change={model.sixYearChange} />
                  </div>

                  {/* Content at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <p className="text-xs text-[#888880] mb-1">{model.yearRange} — {model.engine}</p>
                    <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#F5F5F0] group-hover:text-[#DC0000] transition-colors duration-300">
                      {model.name}
                    </h3>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-[#888880]">Current Value</p>
                        <p className="text-xl font-bold tabular-nums text-[#F5F5F0]">
                          {formatCurrency(model.currentValue)}
                        </p>
                      </div>
                      {model.sixYearChange !== null && (
                        <div className="text-right">
                          <p className="text-[10px] uppercase tracking-[0.15em] text-[#888880]">6Y Change</p>
                          <p className={`text-sm font-bold tabular-nums ${model.sixYearChange >= 0 ? "text-gain" : "text-loss"}`}>
                            {model.sixYearChange >= 0 ? "+" : ""}{model.sixYearChange.toFixed(1)}%
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-[#888880]">
            No models match your filters. Try adjusting your search.
          </div>
        )}
      </section>

      {/* Market Overview */}
      <section className="border-y border-[#222] bg-[#0e0e0e] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <BlurFade delay={0} inView>
            <h2 className="mb-12 text-4xl font-bold tracking-[-0.02em] text-center text-[#F5F5F0]">
              Market Snapshot
            </h2>
          </BlurFade>
          <div className="grid gap-6 md:grid-cols-3">
            <BlurFade delay={0.05} inView>
              <div className="border border-gain/20 bg-[#141414] p-6">
                <h3 className="text-[10px] font-medium text-[#888880] uppercase tracking-[0.15em]">
                  Top Performers (6Y)
                </h3>
                <div className="mt-6 space-y-4">
                  {ferrariModels
                    .filter((m) => m.sixYearChange !== null && m.sixYearChange > 0)
                    .sort((a, b) => (b.sixYearChange ?? 0) - (a.sixYearChange ?? 0))
                    .slice(0, 5)
                    .map((m) => (
                      <Link
                        key={m.slug}
                        href={`/models/${m.slug}`}
                        className="flex items-center justify-between hover:text-[#DC0000] transition-colors"
                      >
                        <span className="text-sm font-medium text-[#F5F5F0]">{m.name}</span>
                        <TrendArrow change={m.sixYearChange} />
                      </Link>
                    ))}
                </div>
              </div>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <div className="border border-loss/20 bg-[#141414] p-6">
                <h3 className="text-[10px] font-medium text-[#888880] uppercase tracking-[0.15em]">
                  Biggest Decliners (6Y)
                </h3>
                <div className="mt-6 space-y-4">
                  {ferrariModels
                    .filter((m) => m.sixYearChange !== null && m.sixYearChange < 0)
                    .sort((a, b) => (a.sixYearChange ?? 0) - (b.sixYearChange ?? 0))
                    .slice(0, 5)
                    .map((m) => (
                      <Link
                        key={m.slug}
                        href={`/models/${m.slug}`}
                        className="flex items-center justify-between hover:text-[#DC0000] transition-colors"
                      >
                        <span className="text-sm font-medium text-[#F5F5F0]">{m.name}</span>
                        <TrendArrow change={m.sixYearChange} />
                      </Link>
                    ))}
                </div>
              </div>
            </BlurFade>
            <BlurFade delay={0.15} inView>
              <div className="border border-[#222] bg-[#141414] p-6">
                <h3 className="text-[10px] font-medium text-[#888880] uppercase tracking-[0.15em]">
                  Market Insights
                </h3>
                <div className="mt-6 space-y-4 text-sm text-[#888880] leading-relaxed">
                  <p>
                    The Ferrari collector market remains bifurcated. Legends and limited-production models continue to appreciate, while modern production cars face typical depreciation cycles.
                  </p>
                  <p>
                    The F40 leads all models with +123.5% over 6 years. The Superamerica has declined -41.8%, the sharpest loss in the dataset.
                  </p>
                  <p>
                    Modern GTs (Roma, Portofino, GTC4 Lusso T) are depreciating 12-20%, while Testarossa-era models are rising 29-78%.
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <BlurFade delay={0} inView>
          <div className="mx-auto max-w-2xl border border-[#222] bg-[#141414] p-10 text-center md:p-16">
            <h2 className="mb-4 text-3xl font-bold tracking-[-0.02em] text-[#F5F5F0]">
              Compare Models Head to Head
            </h2>
            <p className="mb-8 text-[#888880]">
              Select up to 4 models and compare values, trends, and investment potential side by side.
            </p>
            <Button size="lg" className="bg-[#DC0000] hover:bg-[#B30000] text-white rounded-none px-10 text-sm tracking-[0.05em] uppercase font-medium" asChild>
              <Link href="/compare">Open Comparison Tool</Link>
            </Button>
          </div>
        </BlurFade>
      </section>
    </>
  );
}
