"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  getModelBySlug,
  ferrariModels,
  formatCurrency,
  formatFullCurrency,
  type Category,
} from "@/data/ferraris";

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

function TimeHorizonBar({
  label,
  value,
}: {
  label: string;
  value: number | null;
}) {
  if (value === null) {
    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm text-muted-foreground">N/A</span>
      </div>
    );
  }
  const isPositive = value >= 0;
  const maxWidth = Math.min(Math.abs(value), 100);
  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span
          className={`text-sm font-semibold ${
            isPositive ? "text-gain" : "text-loss"
          }`}
        >
          {isPositive ? "+" : ""}
          {value}%
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isPositive ? "bg-gain" : "bg-loss"
          }`}
          style={{ width: `${Math.max(maxWidth, 3)}%` }}
        />
      </div>
    </div>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-card p-3 shadow-lg">
      <p className="text-sm font-medium">{label}</p>
      <p className="text-lg font-bold">{formatFullCurrency(payload[0].value)}</p>
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

  const totalReturn = model.msrp
    ? Math.round(((model.currentValue - model.msrp) / model.msrp) * 100)
    : null;

  const relatedModels = ferrariModels
    .filter((m) => m.category === model.category && m.slug !== model.slug)
    .slice(0, 4);

  const isAppreciating = (model.change1Y ?? 0) >= 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Breadcrumb */}
      <BlurFade delay={0}>
        <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
          <Link href="/#models">
            <ArrowLeft className="mr-2 size-4" />
            All Models
          </Link>
        </Button>
      </BlurFade>

      {/* Hero */}
      <BlurFade delay={0.05}>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className={categoryColor(model.category)} variant="secondary">
                {model.category}
              </Badge>
              <Badge
                variant="outline"
                className={
                  isAppreciating
                    ? "border-gain/30 text-gain"
                    : "border-loss/30 text-loss"
                }
              >
                {isAppreciating ? (
                  <TrendingUp className="mr-1 size-3" />
                ) : (
                  <TrendingDown className="mr-1 size-3" />
                )}
                {model.trend}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {model.name}
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">
              {model.yearRange}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Current Market Value</p>
            <p className="text-4xl font-bold tabular-nums">
              {formatFullCurrency(model.currentValue)}
            </p>
            {model.change1Y !== null && (
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
                {model.change1Y}% past 12 months
              </p>
            )}
          </div>
        </div>
      </BlurFade>

      {/* Key Stats */}
      <BlurFade delay={0.1}>
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {model.msrp && (
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">Original MSRP</p>
                <p className="text-2xl font-bold tabular-nums">
                  {formatFullCurrency(model.msrp)}
                </p>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">Current Value</p>
              <p className="text-2xl font-bold tabular-nums">
                {formatFullCurrency(model.currentValue)}
              </p>
            </CardContent>
          </Card>
          {totalReturn !== null && (
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">
                  Total Return Since New
                </p>
                <p
                  className={`text-2xl font-bold tabular-nums ${
                    totalReturn >= 0 ? "text-gain" : "text-loss"
                  }`}
                >
                  {totalReturn >= 0 ? "+" : ""}
                  {totalReturn.toLocaleString()}%
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </BlurFade>

      {/* Chart + Breakdown */}
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <BlurFade delay={0.15} className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Value History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
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
                          stopColor={isAppreciating ? "#16a34a" : "#DC0000"}
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor={isAppreciating ? "#16a34a" : "#DC0000"}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-border"
                    />
                    <XAxis
                      dataKey="year"
                      className="text-xs"
                      tick={{ fill: "var(--color-muted-foreground)" }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: "var(--color-muted-foreground)" }}
                      tickFormatter={(v: number) => formatCurrency(v)}
                      width={80}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={isAppreciating ? "#16a34a" : "#DC0000"}
                      strokeWidth={2}
                      fill="url(#valueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        <BlurFade delay={0.2}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Return by Time Horizon</CardTitle>
            </CardHeader>
            <CardContent>
              <TimeHorizonBar label="1 Year" value={model.change1Y} />
              <TimeHorizonBar label="5 Year" value={model.change5Y} />
              <TimeHorizonBar label="10 Year" value={model.change10Y} />
              {totalReturn !== null && (
                <>
                  <div className="my-2 border-t" />
                  <TimeHorizonBar label="Since New" value={totalReturn} />
                </>
              )}
            </CardContent>
          </Card>
        </BlurFade>
      </div>

      {/* Investment Thesis */}
      <BlurFade delay={0.25}>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Investment Thesis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-muted-foreground">
              {model.thesis}
            </p>
          </CardContent>
        </Card>
      </BlurFade>

      {/* Related Models */}
      {relatedModels.length > 0 && (
        <BlurFade delay={0.3} inView>
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            Related {model.category} Models
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedModels.map((related) => (
              <Link key={related.slug} href={`/models/${related.slug}`}>
                <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-[#DC0000]/30">
                  <CardContent className="p-4">
                    <h3 className="font-semibold group-hover:text-[#DC0000] transition-colors">
                      {related.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {related.yearRange}
                    </p>
                    <div className="mt-2 flex items-end justify-between">
                      <p className="text-lg font-bold tabular-nums">
                        {formatCurrency(related.currentValue)}
                      </p>
                      <span
                        className={`text-sm font-semibold ${
                          (related.change1Y ?? 0) >= 0 ? "text-gain" : "text-loss"
                        }`}
                      >
                        {(related.change1Y ?? 0) >= 0 ? "+" : ""}
                        {related.change1Y ?? 0}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </BlurFade>
      )}
    </div>
  );
}
