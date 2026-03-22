"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { X, Plus, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  ferrariModels,
  formatCurrency,
  formatFullCurrency,
  type FerrariModel,
} from "@/data/ferraris";

const CHART_COLORS = ["#DC0000", "#2563eb", "#16a34a", "#d97706"];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; color: string; dataKey: string }>;
  label?: string;
}

function CompareTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-card p-3 shadow-lg">
      <p className="text-sm font-medium mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-sm">
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-muted-foreground">{p.dataKey}:</span>
          <span className="font-semibold">{formatFullCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

function ModelSelector({
  selected,
  onSelect,
  onRemove,
  maxSelections,
}: {
  selected: FerrariModel[];
  onSelect: (model: FerrariModel) => void;
  onRemove: (slug: string) => void;
  maxSelections: number;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selectedSlugs = new Set(selected.map((m) => m.slug));

  const available = ferrariModels.filter(
    (m) =>
      !selectedSlugs.has(m.slug) &&
      (search === "" ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.yearRange.includes(search))
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {selected.map((model, i) => (
          <Badge
            key={model.slug}
            variant="outline"
            className="py-1.5 px-3 text-sm gap-2"
            style={{ borderColor: CHART_COLORS[i] }}
          >
            <div
              className="size-2 rounded-full"
              style={{ backgroundColor: CHART_COLORS[i] }}
            />
            {model.name}
            <button
              onClick={() => onRemove(model.slug)}
              className="ml-1 hover:text-[#DC0000]"
            >
              <X className="size-3" />
            </button>
          </Badge>
        ))}
        {selected.length < maxSelections && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(!open)}
            className="gap-1"
          >
            <Plus className="size-3" />
            Add Model
          </Button>
        )}
      </div>

      {open && (
        <div className="mb-6 rounded-lg border bg-card p-4 shadow-sm">
          <input
            type="text"
            enterKeyHint="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3 w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#DC0000]/50"
            autoFocus
          />
          <div className="grid gap-1 max-h-60 overflow-y-auto">
            {available.map((model) => (
              <button
                key={model.slug}
                onClick={() => {
                  onSelect(model);
                  setSearch("");
                  if (selected.length + 1 >= maxSelections) setOpen(false);
                }}
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors text-left"
              >
                <div>
                  <span className="font-medium">{model.name}</span>
                  <span className="ml-2 text-muted-foreground">
                    {model.yearRange}
                  </span>
                </div>
                <span className="text-muted-foreground tabular-nums">
                  {formatCurrency(model.currentValue)}
                </span>
              </button>
            ))}
            {available.length === 0 && (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No models found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  const [selected, setSelected] = useState<FerrariModel[]>([
    ferrariModels.find((m) => m.slug === "f40")!,
    ferrariModels.find((m) => m.slug === "f50")!,
  ]);

  const chartData = useMemo(() => {
    if (selected.length === 0) return [];

    const allYears = new Set<number>();
    selected.forEach((m) =>
      m.historicalValues.forEach((h) => allYears.add(h.year))
    );
    const years = Array.from(allYears).sort();

    return years.map((year) => {
      const point: Record<string, number> = { year };
      selected.forEach((m) => {
        const match = m.historicalValues.find((h) => h.year === year);
        if (match) point[m.name] = match.value;
      });
      return point;
    });
  }, [selected]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <BlurFade delay={0}>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          Compare Models
        </h1>
        <p className="text-muted-foreground mb-8">
          Select 2-4 models to compare values, trends, and investment metrics
          side by side.
        </p>
      </BlurFade>

      <BlurFade delay={0.05}>
        <ModelSelector
          selected={selected}
          onSelect={(model) => setSelected([...selected, model])}
          onRemove={(slug) => setSelected(selected.filter((m) => m.slug !== slug))}
          maxSelections={4}
        />
      </BlurFade>

      {selected.length >= 2 && (
        <>
          {/* Chart */}
          <BlurFade delay={0.1}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Value Trajectories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        {selected.map((m, i) => (
                          <linearGradient
                            key={m.slug}
                            id={`grad-${m.slug}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor={CHART_COLORS[i]}
                              stopOpacity={0.15}
                            />
                            <stop
                              offset="95%"
                              stopColor={CHART_COLORS[i]}
                              stopOpacity={0}
                            />
                          </linearGradient>
                        ))}
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-border"
                      />
                      <XAxis
                        dataKey="year"
                        tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                      />
                      <YAxis
                        tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                        tickFormatter={(v: number) => formatCurrency(v)}
                        width={80}
                      />
                      <Tooltip content={<CompareTooltip />} />
                      <Legend />
                      {selected.map((m, i) => (
                        <Area
                          key={m.slug}
                          type="monotone"
                          dataKey={m.name}
                          stroke={CHART_COLORS[i]}
                          strokeWidth={2}
                          fill={`url(#grad-${m.slug})`}
                          connectNulls
                        />
                      ))}
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </BlurFade>

          {/* Comparison Table */}
          <BlurFade delay={0.15}>
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 pr-4 text-left font-medium text-muted-foreground">
                        Metric
                      </th>
                      {selected.map((m, i) => (
                        <th
                          key={m.slug}
                          className="py-3 px-4 text-right font-medium"
                        >
                          <Link
                            href={`/models/${m.slug}`}
                            className="hover:text-[#DC0000] transition-colors"
                          >
                            <span
                              className="inline-block size-2 rounded-full mr-2"
                              style={{ backgroundColor: CHART_COLORS[i] }}
                            />
                            {m.name}
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 pr-4 text-muted-foreground">
                        Year Range
                      </td>
                      {selected.map((m) => (
                        <td
                          key={m.slug}
                          className="py-3 px-4 text-right tabular-nums"
                        >
                          {m.yearRange}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 text-muted-foreground">
                        Category
                      </td>
                      {selected.map((m) => (
                        <td key={m.slug} className="py-3 px-4 text-right">
                          {m.category}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 text-muted-foreground">
                        MSRP (New)
                      </td>
                      {selected.map((m) => (
                        <td
                          key={m.slug}
                          className="py-3 px-4 text-right tabular-nums"
                        >
                          {m.msrp ? formatFullCurrency(m.msrp) : "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 text-muted-foreground">
                        Current Value
                      </td>
                      {selected.map((m) => (
                        <td
                          key={m.slug}
                          className="py-3 px-4 text-right font-semibold tabular-nums"
                        >
                          {formatFullCurrency(m.currentValue)}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 text-muted-foreground">
                        1Y Change
                      </td>
                      {selected.map((m) => (
                        <td key={m.slug} className="py-3 px-4 text-right">
                          {m.change1Y !== null ? (
                            <span
                              className={`inline-flex items-center gap-0.5 font-semibold ${
                                m.change1Y >= 0 ? "text-gain" : "text-loss"
                              }`}
                            >
                              {m.change1Y >= 0 ? (
                                <ArrowUpRight className="size-3" />
                              ) : (
                                <ArrowDownRight className="size-3" />
                              )}
                              {m.change1Y >= 0 ? "+" : ""}
                              {m.change1Y}%
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 text-muted-foreground">
                        5Y Change
                      </td>
                      {selected.map((m) => (
                        <td key={m.slug} className="py-3 px-4 text-right">
                          {m.change5Y !== null ? (
                            <span
                              className={`inline-flex items-center gap-0.5 font-semibold ${
                                m.change5Y >= 0 ? "text-gain" : "text-loss"
                              }`}
                            >
                              {m.change5Y >= 0 ? "+" : ""}
                              {m.change5Y}%
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 text-muted-foreground">
                        10Y Change
                      </td>
                      {selected.map((m) => (
                        <td key={m.slug} className="py-3 px-4 text-right">
                          {m.change10Y !== null ? (
                            <span
                              className={`inline-flex items-center gap-0.5 font-semibold ${
                                m.change10Y >= 0 ? "text-gain" : "text-loss"
                              }`}
                            >
                              {m.change10Y >= 0 ? "+" : ""}
                              {m.change10Y}%
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4 text-muted-foreground">
                        Trend
                      </td>
                      {selected.map((m) => (
                        <td key={m.slug} className="py-3 px-4 text-right">
                          <Badge variant="outline" className="text-xs">
                            {m.trend}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                    {selected.some((m) => m.msrp) && (
                      <tr>
                        <td className="py-3 pr-4 text-muted-foreground">
                          Total Return
                        </td>
                        {selected.map((m) => {
                          if (!m.msrp) {
                            return (
                              <td
                                key={m.slug}
                                className="py-3 px-4 text-right text-muted-foreground"
                              >
                                N/A
                              </td>
                            );
                          }
                          const ret = Math.round(
                            ((m.currentValue - m.msrp) / m.msrp) * 100
                          );
                          return (
                            <td
                              key={m.slug}
                              className={`py-3 px-4 text-right font-bold tabular-nums ${
                                ret >= 0 ? "text-gain" : "text-loss"
                              }`}
                            >
                              {ret >= 0 ? "+" : ""}
                              {ret.toLocaleString()}%
                            </td>
                          );
                        })}
                      </tr>
                    )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </BlurFade>
        </>
      )}

      {selected.length < 2 && (
        <BlurFade delay={0.1}>
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              Select at least 2 models to start comparing
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {ferrariModels.slice(0, 8).map((m) => (
                <Button
                  key={m.slug}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelected([...selected, m])}
                  disabled={selected.some((s) => s.slug === m.slug)}
                >
                  {m.name}
                </Button>
              ))}
            </div>
          </div>
        </BlurFade>
      )}
    </div>
  );
}
