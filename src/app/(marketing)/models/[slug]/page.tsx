"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  getModelBySlug,
  getModelsByCategory,
  formatCurrency,
  formatFullCurrency,
} from "@/data/ferraris";
import { getModelImage } from "@/data/images";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border border-[#333] bg-[#141414] p-3 shadow-lg">
      <p className="text-sm font-medium text-[#F5F5F0]">{label}</p>
      <p className="text-lg font-bold text-[#F5F5F0]">{formatFullCurrency(payload[0].value)}</p>
    </div>
  );
}

export default function ModelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const model = getModelBySlug(slug);

  if (!model) {
    notFound();
  }

  const hasHistoricalRange = model.historicalValues.length > 1;
  const isAppreciating = (model.sixYearChange ?? 0) >= 0;

  const relatedModels = getModelsByCategory(model.category)
    .filter((m) => m.slug !== model.slug)
    .slice(0, 4);

  return (
    <div>
      {/* Full-width hero image */}
      <div className="relative aspect-[21/9] w-full overflow-hidden">
        <Image
          src={getModelImage(model.slug)}
          alt={model.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-6 z-10">
          <Button variant="ghost" size="sm" asChild className="text-[#F5F5F0] hover:bg-[#141414]/50 backdrop-blur-sm border border-[#333]">
            <Link href="/#models">
              <ArrowLeft className="mr-2 size-4" />
              All Models
            </Link>
          </Button>
        </div>

        {/* Floating stats overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#888880] bg-[#0A0A0A]/60 px-2.5 py-1 backdrop-blur-sm border border-[#333]">
                    {model.category}
                  </span>
                  <Badge
                    variant="outline"
                    className={`rounded-none border-[#333] backdrop-blur-sm bg-[#0A0A0A]/60 ${
                      isAppreciating
                        ? "text-gain border-gain/30"
                        : "text-loss border-loss/30"
                    }`}
                  >
                    {model.engine}
                  </Badge>
                </div>
                <h1 className="text-5xl font-bold tracking-[-0.02em] md:text-6xl lg:text-7xl text-[#F5F5F0]">
                  {model.name}
                </h1>
                <p className="mt-2 text-lg text-[#888880]">
                  {model.yearRange}
                </p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#888880]">Current Market Value</p>
                <p className="text-4xl font-bold tabular-nums text-[#F5F5F0] md:text-5xl">
                  {formatFullCurrency(model.currentValue)}
                </p>
                {model.sixYearChange !== null && (
                  <p
                    className={`mt-1 text-sm font-semibold inline-flex items-center gap-1 ${
                      isAppreciating ? "text-gain" : "text-loss"
                    }`}
                  >
                    {isAppreciating ? (
                      <ArrowUpRight className="size-4" />
                    ) : (
                      <ArrowDownRight className="size-4" />
                    )}
                    {isAppreciating ? "+" : ""}
                    {model.sixYearChange.toFixed(1)}% over 6 years (2020-2026)
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        {/* Key Stats */}
        <BlurFade delay={0.05}>
          <div className="mb-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {model.startValue && (
              <div className="border border-[#222] bg-[#141414] p-6">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#888880]">2020 Value</p>
                <p className="mt-2 text-2xl font-bold tabular-nums text-[#F5F5F0]">
                  {formatFullCurrency(model.startValue)}
                </p>
              </div>
            )}
            <div className="border border-[#222] bg-[#141414] p-6">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#888880]">2026 Value</p>
              <p className="mt-2 text-2xl font-bold tabular-nums text-[#F5F5F0]">
                {formatFullCurrency(model.currentValue)}
              </p>
            </div>
            {model.sixYearChange !== null && (
              <div className="border border-[#222] bg-[#141414] p-6">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#888880]">
                  6-Year Change
                </p>
                <p
                  className={`mt-2 text-2xl font-bold tabular-nums ${
                    model.sixYearChange >= 0 ? "text-gain" : "text-loss"
                  }`}
                >
                  {model.sixYearChange >= 0 ? "+" : ""}
                  {model.sixYearChange.toFixed(1)}%
                </p>
              </div>
            )}
            <div className="border border-[#222] bg-[#141414] p-6">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#888880]">Engine</p>
              <p className="mt-2 text-2xl font-bold text-[#F5F5F0]">
                {model.engine}
              </p>
            </div>
          </div>
        </BlurFade>

        {/* Chart */}
        {hasHistoricalRange && (
          <BlurFade delay={0.1}>
            <div className="border border-[#222] bg-[#141414] p-6 mb-4">
              <h3 className="text-sm font-semibold text-[#F5F5F0] mb-6">Value History (2020-2026)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={model.historicalValues}>
                    <defs>
                      <linearGradient
                        id="valueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#DC0000"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#DC0000"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#222"
                    />
                    <XAxis
                      dataKey="year"
                      tick={{ fill: "#888880", fontSize: 12 }}
                      axisLine={{ stroke: "#222" }}
                      tickLine={{ stroke: "#222" }}
                    />
                    <YAxis
                      tick={{ fill: "#888880", fontSize: 12 }}
                      tickFormatter={(v: number) => formatCurrency(v)}
                      width={80}
                      axisLine={{ stroke: "#222" }}
                      tickLine={{ stroke: "#222" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#DC0000"
                      strokeWidth={2}
                      fill="url(#valueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <p className="text-xs text-[#555] mb-10 italic">
              Values derived from auction results, dealer listings, and private sales. Intermediate years estimated from market trends. Source: {model.dataSource}
            </p>
          </BlurFade>
        )}

        {!hasHistoricalRange && (
          <BlurFade delay={0.1}>
            <div className="border border-[#222] bg-[#141414] p-8 mb-10 text-center">
              <p className="text-[#888880]">
                Limited historical data available for this model. Only 2026 market value is tracked.
              </p>
            </div>
          </BlurFade>
        )}

        {/* Related Models */}
        {relatedModels.length > 0 && (
          <BlurFade delay={0.2} inView>
            <h2 className="mb-6 text-2xl font-bold tracking-[-0.02em] text-[#F5F5F0]">
              Related {model.category} Models
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedModels.map((related) => (
                <Link key={related.slug} href={`/models/${related.slug}`}>
                  <div className="group relative h-[200px] overflow-hidden border border-[#222] bg-[#141414] cursor-pointer transition-all duration-300 hover:border-[#DC0000]/40">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={getModelImage(related.slug)}
                        alt={related.name}
                        fill
                        className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      <h3 className="font-semibold text-[#F5F5F0] group-hover:text-[#DC0000] transition-colors">
                        {related.name}
                      </h3>
                      <p className="text-xs text-[#888880]">
                        {related.yearRange}
                      </p>
                      <div className="mt-2 flex items-end justify-between">
                        <p className="text-lg font-bold tabular-nums text-[#F5F5F0]">
                          {formatCurrency(related.currentValue)}
                        </p>
                        {related.sixYearChange !== null && (
                          <span
                            className={`text-sm font-semibold ${
                              related.sixYearChange >= 0 ? "text-gain" : "text-loss"
                            }`}
                          >
                            {related.sixYearChange >= 0 ? "+" : ""}
                            {related.sixYearChange.toFixed(1)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </BlurFade>
        )}
      </div>
    </div>
  );
}
