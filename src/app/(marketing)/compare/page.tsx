"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/magicui/blur-fade";
import {
  ferrariModels,
  formatCurrency,
  formatFullCurrency,
  type FerrariModel,
} from "@/data/ferraris";
import { getModelImage } from "@/data/images";

const CHART_COLORS = ["#DC0000", "#D4A012", "#22c55e", "#3b82f6"];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; color: string; dataKey: string }>;
  label?: string;
}

function CompareTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="border border-[#333] bg-[#141414] p-3 shadow-lg">
      <p className="text-sm font-medium text-[#F5F5F0] mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-sm">
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-[#888880]">{p.dataKey}:</span>
          <span className="font-semibold text-[#F5F5F0]">{formatFullCurrency(p.value)}</span>
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
      m.historicalValues.length > 1 &&
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
            className="py-1.5 px-3 text-sm gap-2 rounded-none border-[#333] text-[#F5F5F0]"
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
            className="gap-1 rounded-none border-[#333] text-[#888880] hover:text-[#F5F5F0] hover:bg-[#141414]"
          >
            <Plus className="size-3" />
            Add Model
          </Button>
        )}
      </div>

      {open && (
        <div className="mb-6 border border-[#222] bg-[#141414] p-4 shadow-sm">
          <input
            type="text"
            enterKeyHint="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3 w-full border border-[#333] bg-[#0A0A0A] px-3 py-2 text-sm text-[#F5F5F0] focus:outline-none focus:ring-1 focus:ring-[#DC0000]"
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
                className="flex items-center justify-between px-3 py-2 text-sm hover:bg-[#1a1a1a] transition-colors text-left"
              >
                <div>
                  <span className="font-medium text-[#F5F5F0]">{model.name}</span>
                  <span className="ml-2 text-[#888880]">
                    {model.yearRange}
                  </span>
                </div>
                <span className="text-[#888880] tabular-nums">
                  {formatCurrency(model.currentValue)}
                </span>
              </button>
            ))}
            {available.length === 0 && (
              <p className="py-4 text-center text-sm text-[#888880]">
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
  const [selected, setSelected] = useState<FerrariModel[]>(() => {
    const f40 = ferrariModels.find((m) => m.slug === "f40");
    const f50 = ferrariModels.find((m) => m.slug === "f50");
    return [f40, f50].filter(Boolean) as FerrariModel[];
  });

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
    <div className="mx-auto max-w-6xl px-4 py-12">
      <BlurFade delay={0}>
        <h1 className="text-4xl font-bold tracking-[-0.02em] mb-2 text-[#F5F5F0] md:text-5xl">
          Compare Models
        </h1>
        <p className="text-[#888880] mb-10">
          Select 2-4 models to compare 2020-2026 value trajectories side by side.
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
          {/* Side by side cards */}
          <BlurFade delay={0.08}>
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {selected.map((model, i) => (
                <div key={model.slug} className="relative h-[200px] overflow-hidden border border-[#222] bg-[#141414]" style={{ borderTopColor: CHART_COLORS[i], borderTopWidth: 2 }}>
                  <div className="absolute inset-0">
                    <Image
                      src={getModelImage(model.slug)}
                      alt={model.name}
                      fill
                      className="object-cover opacity-30"
                      sizes="25vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <Link href={`/models/${model.slug}`} className="hover:text-[#DC0000] transition-colors">
                      <h3 className="font-bold text-[#F5F5F0] text-lg">{model.name}</h3>
                    </Link>
                    <p className="text-xs text-[#888880]">{model.yearRange}</p>
                    <p className="mt-1 text-xl font-bold tabular-nums text-[#F5F5F0]">{formatCurrency(model.currentValue)}</p>
                  </div>
                </div>
              ))}
            </div>
          </BlurFade>

          {/* Chart */}
          <BlurFade delay={0.1}>
            <div className="border border-[#222] bg-[#141414] p-6 mb-8">
              <h3 className="text-sm font-semibold text-[#F5F5F0] mb-6">Value Trajectories (2020-2026)</h3>
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
                    <Tooltip content={<CompareTooltip />} />
                    <Legend
                      wrapperStyle={{ color: "#888880", fontSize: 12 }}
                    />
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
            </div>
          </BlurFade>

          {/* Comparison Table */}
          <BlurFade delay={0.15}>
            <div className="border border-[#222] bg-[#141414] p-6">
              <h3 className="text-sm font-semibold text-[#F5F5F0] mb-6">Key Metrics</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#222]">
                      <th className="py-3 pr-4 text-left text-[10px] font-medium uppercase tracking-[0.15em] text-[#888880]">
                        Metric
                      </th>
                      {selected.map((m, i) => (
                        <th
                          key={m.slug}
                          className="py-3 px-4 text-right font-medium text-[#F5F5F0]"
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
                    <tr className="border-b border-[#1a1a1a]">
                      <td className="py-3 pr-4 text-[#888880]">Year Range</td>
                      {selected.map((m) => (
                        <td key={m.slug} className="py-3 px-4 text-right tabular-nums text-[#F5F5F0]">
                          {m.yearRange}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#1a1a1a]">
                      <td className="py-3 pr-4 text-[#888880]">Category</td>
                      {selected.map((m) => (
                        <td key={m.slug} className="py-3 px-4 text-right text-[#F5F5F0]">
                          {m.category}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#1a1a1a]">
                      <td className="py-3 pr-4 text-[#888880]">Engine</td>
                      {selected.map((m) => (
                        <td key={m.slug} className="py-3 px-4 text-right text-[#F5F5F0]">
                          {m.engine}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#1a1a1a]">
                      <td className="py-3 pr-4 text-[#888880]">2020 Value</td>
                      {selected.map((m) => (
                        <td key={m.slug} className="py-3 px-4 text-right tabular-nums text-[#F5F5F0]">
                          {m.startValue ? formatFullCurrency(m.startValue) : "N/A"}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#1a1a1a]">
                      <td className="py-3 pr-4 text-[#888880]">2026 Value</td>
                      {selected.map((m) => (
                        <td key={m.slug} className="py-3 px-4 text-right font-semibold tabular-nums text-[#F5F5F0]">
                          {formatFullCurrency(m.currentValue)}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-[#1a1a1a]">
                      <td className="py-3 pr-4 text-[#888880]">6-Year Change</td>
                      {selected.map((m) => (
                        <td key={m.slug} className="py-3 px-4 text-right">
                          {m.sixYearChange !== null ? (
                            <span
                              className={`inline-flex items-center gap-0.5 font-semibold ${
                                m.sixYearChange >= 0 ? "text-gain" : "text-loss"
                              }`}
                            >
                              {m.sixYearChange >= 0 ? (
                                <ArrowUpRight className="size-3" />
                              ) : (
                                <ArrowDownRight className="size-3" />
                              )}
                              {m.sixYearChange >= 0 ? "+" : ""}
                              {m.sixYearChange.toFixed(1)}%
                            </span>
                          ) : (
                            <span className="text-[#555]">N/A</span>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-[#888880]">Data Source</td>
                      {selected.map((m) => (
                        <td key={m.slug} className="py-3 px-4 text-right text-[#555] text-xs">
                          {m.dataSource}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </BlurFade>
        </>
      )}

      {selected.length < 2 && (
        <BlurFade delay={0.1}>
          <div className="py-20 text-center">
            <p className="text-lg text-[#888880] mb-6">
              Select at least 2 models to start comparing
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {ferrariModels
                .filter((m) => m.historicalValues.length > 1)
                .slice(0, 8)
                .map((m) => (
                  <Button
                    key={m.slug}
                    variant="outline"
                    size="sm"
                    onClick={() => setSelected([...selected, m])}
                    disabled={selected.some((s) => s.slug === m.slug)}
                    className="rounded-none border-[#333] text-[#888880] hover:text-[#F5F5F0] hover:bg-[#141414]"
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
