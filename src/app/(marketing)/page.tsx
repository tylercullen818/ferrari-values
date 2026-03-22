"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import {
  ferrariModels,
  formatCurrency,
  totalModelsTracked,
  avgLegendAppreciation,
  totalMarketValue,
  type Category,
} from "@/data/ferraris";
import { getModelImage } from "@/data/images";

const HeroCar = dynamic(
  () => import("@/components/hero-car").then((m) => m.HeroCar),
  { ssr: false, loading: () => <div className="h-full w-full bg-[#0A0A0A]" /> }
);

type SortOption = "value-desc" | "value-asc" | "change-desc" | "change-asc" | "name";
type FilterCategory = "All" | Category;
type FilterTrend = "All" | "Appreciating" | "Depreciating" | "Above MSRP";

function TrendArrow({ change }: { change: number | null }) {
  if (change === null) return <span className="text-xs text-[#888880]">N/A</span>;
  const isPositive = change >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-sm font-semibold ${isPositive ? "text-gain" : "text-loss"}`}>
      {isPositive ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
      {isPositive ? "+" : ""}
      {change}%
    </span>
  );
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>("All");
  const [trendFilter, setTrendFilter] = useState<FilterTrend>("All");
  const [sort, setSort] = useState<SortOption>("value-desc");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let models = [...ferrariModels];

    if (search) {
      const q = search.toLowerCase();
      models = models.filter(
        (m) => m.name.toLowerCase().includes(q) || m.yearRange.includes(q)
      );
    }

    if (categoryFilter !== "All") {
      models = models.filter((m) => m.category === categoryFilter);
    }

    if (trendFilter !== "All") {
      models = models.filter((m) => {
        if (trendFilter === "Appreciating")
          return (m.change1Y ?? 0) > 0 && m.trend !== "Above MSRP";
        if (trendFilter === "Depreciating") return (m.change1Y ?? 0) < 0;
        if (trendFilter === "Above MSRP") return m.trend === "Above MSRP";
        return true;
      });
    }

    switch (sort) {
      case "value-desc":
        models.sort((a, b) => b.currentValue - a.currentValue);
        break;
      case "value-asc":
        models.sort((a, b) => a.currentValue - b.currentValue);
        break;
      case "change-desc":
        models.sort((a, b) => (b.change1Y ?? 0) - (a.change1Y ?? 0));
        break;
      case "change-asc":
        models.sort((a, b) => (a.change1Y ?? 0) - (b.change1Y ?? 0));
        break;
      case "name":
        models.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return models;
  }, [search, categoryFilter, trendFilter, sort]);

  return (
    <>
      {/* Hero - Full bleed with 3D car */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0A0A0A]">
        {/* 3D Car Scene */}
        <div className="absolute inset-0 opacity-60">
          <HeroCar />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />

        {/* Content overlay */}
        <div className="relative z-10 container py-20">
          <div className="max-w-2xl">
            <BlurFade delay={0}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#333] bg-[#141414]/80 px-4 py-1.5 text-xs font-medium tracking-[0.1em] uppercase text-[#888880] backdrop-blur-sm">
                <TrendingUp className="size-3.5 text-[#DC0000]" />
                Live market data
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
                Track values, spot trends, and make informed decisions across {totalModelsTracked} models, from million-dollar legends to modern depreciators.
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

      {/* Stats - Huge animated numbers */}
      <section className="border-y border-[#222] bg-[#0e0e0e] py-16">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-12 px-4 sm:gap-20">
          {[
            { value: totalModelsTracked, label: "MODELS TRACKED", prefix: "" },
            { value: avgLegendAppreciation, label: "AVG LEGEND 5Y RETURN", prefix: "+" , suffix: "%" },
            { value: Math.round(totalMarketValue / 1000000), label: "TOTAL MARKET VALUE", prefix: "$", suffix: "M" },
            { value: 60, label: "TOP 1Y GAINER (F50)", prefix: "+", suffix: "%", highlight: true },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className={`text-5xl md:text-6xl font-bold tabular-nums tracking-[-0.02em] ${stat.highlight ? "text-[#DC0000]" : "text-[#F5F5F0]"}`}>
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
              {filtered.length} of {ferrariModels.length} models
            </p>
          </div>
        </BlurFade>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#888880]" />
              <Input
                enterKeyHint="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-[#141414] border-[#222] text-[#F5F5F0] [&:not(:focus)]:text-[#555] rounded-none focus:ring-[#DC0000]"

              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto border-[#222] text-[#F5F5F0] hover:bg-[#141414] rounded-none"
            >
              <SlidersHorizontal className="mr-2 size-4" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-6 rounded-none border border-[#222] bg-[#141414] p-6">
              <div>
                <p className="mb-2 text-[10px] font-medium text-[#888880] uppercase tracking-[0.15em]">
                  Category
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(["All", "Legend", "Classic", "Modern"] as FilterCategory[]).map(
                    (cat) => (
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
                    )
                  )}
                </div>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-medium text-[#888880] uppercase tracking-[0.15em]">
                  Trend
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(
                    ["All", "Appreciating", "Depreciating", "Above MSRP"] as FilterTrend[]
                  ).map((t) => (
                    <Button
                      key={t}
                      size="sm"
                      variant={trendFilter === t ? "default" : "outline"}
                      onClick={() => setTrendFilter(t)}
                      className={`rounded-none text-xs ${
                        trendFilter === t
                          ? "bg-[#DC0000] hover:bg-[#B30000] text-white"
                          : "border-[#333] text-[#888880] hover:text-[#F5F5F0]"
                      }`}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-medium text-[#888880] uppercase tracking-[0.15em]">
                  Sort
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { value: "value-desc" as SortOption, label: "Value (High)" },
                    { value: "value-asc" as SortOption, label: "Value (Low)" },
                    { value: "change-desc" as SortOption, label: "Best Performer" },
                    { value: "change-asc" as SortOption, label: "Worst Performer" },
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

        {/* Grid - Magazine layout with large image cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((model, i) => (
            <BlurFade key={model.slug} delay={Math.min(i * 0.03, 0.3)} inView>
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

                  {/* Trend badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <TrendArrow change={model.change1Y} />
                  </div>

                  {/* Content at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <p className="text-xs text-[#888880] mb-1">{model.yearRange}</p>
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
                      <Badge
                        variant="outline"
                        className={`text-[10px] rounded-none border-[#333] ${
                          (model.change1Y ?? 0) > 0
                            ? "text-gain border-gain/30"
                            : (model.change1Y ?? 0) < 0
                            ? "text-loss border-loss/30"
                            : "text-[#888880]"
                        }`}
                      >
                        {model.trend}
                      </Badge>
                    </div>
                    {model.msrp && (
                      <div className="mt-3 pt-3 border-t border-[#333]">
                        <div className="flex justify-between text-xs text-[#888880]">
                          <span>MSRP: {formatCurrency(model.msrp)}</span>
                          <span
                            className={
                              model.currentValue > model.msrp
                                ? "text-gain font-medium"
                                : "text-loss font-medium"
                            }
                          >
                            {model.currentValue > model.msrp ? "+" : ""}
                            {Math.round(
                              ((model.currentValue - model.msrp) / model.msrp) * 100
                            )}
                            % total return
                          </span>
                        </div>
                      </div>
                    )}
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
                  Top Performers
                </h3>
                <div className="mt-6 space-y-4">
                  {ferrariModels
                    .filter((m) => m.change1Y !== null)
                    .sort((a, b) => (b.change1Y ?? 0) - (a.change1Y ?? 0))
                    .slice(0, 5)
                    .map((m) => (
                      <Link
                        key={m.slug}
                        href={`/models/${m.slug}`}
                        className="flex items-center justify-between hover:text-[#DC0000] transition-colors"
                      >
                        <span className="text-sm font-medium text-[#F5F5F0]">{m.name}</span>
                        <TrendArrow change={m.change1Y} />
                      </Link>
                    ))}
                </div>
              </div>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <div className="border border-loss/20 bg-[#141414] p-6">
                <h3 className="text-[10px] font-medium text-[#888880] uppercase tracking-[0.15em]">
                  Biggest Decliners
                </h3>
                <div className="mt-6 space-y-4">
                  {ferrariModels
                    .filter((m) => (m.change1Y ?? 0) < 0)
                    .sort((a, b) => (a.change1Y ?? 0) - (b.change1Y ?? 0))
                    .slice(0, 5)
                    .map((m) => (
                      <Link
                        key={m.slug}
                        href={`/models/${m.slug}`}
                        className="flex items-center justify-between hover:text-[#DC0000] transition-colors"
                      >
                        <span className="text-sm font-medium text-[#F5F5F0]">{m.name}</span>
                        <TrendArrow change={m.change1Y} />
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
                    The F50 leads all models with +60% YoY growth, correcting years of undervaluation relative to its peers.
                  </p>
                  <p>
                    Hybrid models like the SF90 face the steepest depreciation as technology risk premiums compress.
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
