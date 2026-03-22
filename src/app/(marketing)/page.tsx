"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight, TrendingUp, Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

type SortOption = "value-desc" | "value-asc" | "change-desc" | "change-asc" | "name";
type FilterCategory = "All" | Category;
type FilterTrend = "All" | "Appreciating" | "Depreciating" | "Above MSRP";

function TrendArrow({ change }: { change: number | null }) {
  if (change === null) return <span className="text-xs text-muted-foreground">N/A</span>;
  const isPositive = change >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-sm font-semibold ${isPositive ? "text-gain" : "text-loss"}`}>
      {isPositive ? <ArrowUpRight className="size-4" /> : <ArrowDownRight className="size-4" />}
      {isPositive ? "+" : ""}
      {change}%
    </span>
  );
}

function categoryColor(category: Category): string {
  switch (category) {
    case "Legend":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
    case "Classic":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "Modern":
      return "bg-zinc-100 text-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-400";
  }
}

function cardGradient(category: Category): string {
  switch (category) {
    case "Legend":
      return "bg-gradient-to-br from-amber-500/20 to-amber-600/30 dark:from-amber-500/10 dark:to-amber-600/20";
    case "Classic":
      return "bg-gradient-to-br from-blue-500/20 to-blue-600/30 dark:from-blue-500/10 dark:to-blue-600/20";
    case "Modern":
      return "bg-gradient-to-br from-zinc-400/20 to-zinc-500/30 dark:from-zinc-500/10 dark:to-zinc-600/20";
  }
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
      {/* Hero */}
      <section className="flex flex-col items-center justify-center gap-6 px-4 pb-12 pt-20 text-center md:pt-28">
        <BlurFade delay={0}>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
            <TrendingUp className="size-4 text-[#DC0000]" />
            Live market data for {totalModelsTracked} models
          </div>
        </BlurFade>
        <BlurFade delay={0.05}>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Ferrari Market
            <span className="text-[#DC0000]"> Intelligence</span>
          </h1>
        </BlurFade>
        <BlurFade delay={0.1}>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Track values, spot trends, and make informed decisions. From million-dollar legends to modern depreciators, we cover every corner of the Ferrari market.
          </p>
        </BlurFade>
        <BlurFade delay={0.15}>
          <div className="flex gap-3">
            <Button size="lg" className="bg-[#DC0000] hover:bg-[#B30000] text-white" asChild>
              <a href="#models">Explore Models</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/compare">Compare Values</Link>
            </Button>
          </div>
        </BlurFade>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/40 py-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-4 sm:gap-16">
          <div className="text-center">
            <p className="text-3xl font-bold">
              <NumberTicker value={totalModelsTracked} />
            </p>
            <p className="text-sm text-muted-foreground">Models Tracked</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">
              +<NumberTicker value={avgLegendAppreciation} />%
            </p>
            <p className="text-sm text-muted-foreground">Avg. Legend 5Y Return</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">
              $<NumberTicker value={Math.round(totalMarketValue / 1000000)} />M
            </p>
            <p className="text-sm text-muted-foreground">Total Market Value</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#DC0000]">
              +<NumberTicker value={60} />%
            </p>
            <p className="text-sm text-muted-foreground">Top 1Y Gainer (F50)</p>
          </div>
        </div>
      </section>

      {/* Model Grid */}
      <section id="models" className="mx-auto max-w-7xl px-4 py-16">
        <BlurFade delay={0} inView>
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">All Models</h2>
            <p className="mt-1 text-muted-foreground">
              {filtered.length} of {ferrariModels.length} models
            </p>
          </div>
        </BlurFade>

        {/* Search & Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                enterKeyHint="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="sm:w-auto"
            >
              <SlidersHorizontal className="mr-2 size-4" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-4 rounded-lg border bg-card p-4">
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
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
                        className={
                          categoryFilter === cat
                            ? "bg-[#DC0000] hover:bg-[#B30000] text-white"
                            : ""
                        }
                      >
                        {cat}
                      </Button>
                    )
                  )}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
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
                      className={
                        trendFilter === t
                          ? "bg-[#DC0000] hover:bg-[#B30000] text-white"
                          : ""
                      }
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
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
                      className={
                        sort === s.value
                          ? "bg-[#DC0000] hover:bg-[#B30000] text-white"
                          : ""
                      }
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((model, i) => (
            <BlurFade key={model.slug} delay={Math.min(i * 0.03, 0.3)} inView>
              <Link href={`/models/${model.slug}`}>
                <Card className="group cursor-pointer transition-all hover:shadow-lg hover:border-[#DC0000]/30">
                  <div
                    className={`relative h-36 rounded-t-lg ${cardGradient(model.category)} flex items-center justify-center overflow-hidden`}
                  >
                    <span className="text-2xl font-bold text-foreground/20 group-hover:text-foreground/30 transition-colors">
                      {model.name}
                    </span>
                    <Badge
                      className={`absolute top-2 right-2 text-[10px] ${categoryColor(model.category)}`}
                      variant="secondary"
                    >
                      {model.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold leading-tight group-hover:text-[#DC0000] transition-colors">
                          {model.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {model.yearRange}
                        </p>
                      </div>
                      <TrendArrow change={model.change1Y} />
                    </div>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Current Value</p>
                        <p className="text-lg font-bold tabular-nums">
                          {formatCurrency(model.currentValue)}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          (model.change1Y ?? 0) > 0
                            ? "border-gain/30 text-gain"
                            : (model.change1Y ?? 0) < 0
                            ? "border-loss/30 text-loss"
                            : ""
                        }`}
                      >
                        {model.trend}
                      </Badge>
                    </div>
                    {model.msrp && (
                      <div className="mt-2 pt-2 border-t">
                        <div className="flex justify-between text-xs text-muted-foreground">
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
                  </CardContent>
                </Card>
              </Link>
            </BlurFade>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No models match your filters. Try adjusting your search.
          </div>
        )}
      </section>

      {/* Market Overview */}
      <section className="border-y bg-muted/40 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <BlurFade delay={0} inView>
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-center">
              Market Snapshot
            </h2>
          </BlurFade>
          <div className="grid gap-6 md:grid-cols-3">
            <BlurFade delay={0.05} inView>
              <Card className="border-gain/20">
                <CardContent className="p-6">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Top Performers
                  </h3>
                  <div className="mt-4 space-y-3">
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
                          <span className="text-sm font-medium">{m.name}</span>
                          <TrendArrow change={m.change1Y} />
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <Card className="border-loss/20">
                <CardContent className="p-6">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Biggest Decliners
                  </h3>
                  <div className="mt-4 space-y-3">
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
                          <span className="text-sm font-medium">{m.name}</span>
                          <TrendArrow change={m.change1Y} />
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </BlurFade>
            <BlurFade delay={0.15} inView>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Market Insights
                  </h3>
                  <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
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
                </CardContent>
              </Card>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <BlurFade delay={0} inView>
          <div className="mx-auto max-w-2xl rounded-2xl border bg-card p-8 text-center shadow-sm md:p-12">
            <h2 className="mb-3 text-3xl font-bold tracking-tight">
              Compare Models Head to Head
            </h2>
            <p className="mb-6 text-muted-foreground">
              Select up to 4 models and compare values, trends, and investment potential side by side.
            </p>
            <Button size="lg" className="bg-[#DC0000] hover:bg-[#B30000] text-white" asChild>
              <Link href="/compare">Open Comparison Tool</Link>
            </Button>
          </div>
        </BlurFade>
      </section>
    </>
  );
}
