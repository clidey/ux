/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import { useState } from "react";
import { Area, AreaChart, Bar, BarChart } from "recharts";
import * as UX from "@clidey/ux";
import { Demo } from "./demo-shell";
const data = [
  { week: "Mon", completed: 18, planned: 24 },
  { week: "Tue", completed: 28, planned: 32 },
  { week: "Wed", completed: 24, planned: 30 },
  { week: "Thu", completed: 42, planned: 40 },
  { week: "Fri", completed: 38, planned: 44 },
  { week: "Sat", completed: 52, planned: 50 },
  { week: "Sun", completed: 64, planned: 58 },
];
export function ChartPreview() {
  const [kind, setKind] = useState("area");
  const [compare, setCompare] = useState(false);
  const shared = (
    <>
      <UX.ThemedCartesianGrid vertical={false} />
      <UX.ThemedXAxis dataKey="week" />
      <UX.ThemedYAxis width={32} />
      <UX.ChartTooltip content={<UX.ChartTooltipContent />} />
      <UX.ChartLegend content={<UX.ChartLegendContent />} />
    </>
  );
  return (
    <Demo hint="Switch chart types, show a second series, and hover a data point for its tooltip.">
      <div className="ux-demo-row">
        <UX.Button
          variant={kind === "area" ? "secondary" : "ghost"}
          onClick={() => setKind("area")}
        >
          Area chart
        </UX.Button>
        <UX.Button variant={kind === "bar" ? "secondary" : "ghost"} onClick={() => setKind("bar")}>
          Bar chart
        </UX.Button>
        <UX.Switch id="chart-compare" checked={compare} onCheckedChange={setCompare} />
        <UX.Label htmlFor="chart-compare">Show planned work</UX.Label>
      </div>
      <UX.ChartContainer
        className="ux-demo-chart"
        config={{
          completed: { label: "Completed", color: "var(--chart-1)" },
          planned: { label: "Planned", color: "var(--chart-2)" },
        }}
      >
        {kind === "area" ? (
          <AreaChart data={data}>
            {shared}
            <Area
              type="monotone"
              dataKey="completed"
              stroke="var(--color-completed)"
              fill="var(--color-completed)"
              fillOpacity={0.16}
              strokeWidth={2}
            />
            {compare && (
              <Area
                type="monotone"
                dataKey="planned"
                stroke="var(--color-planned)"
                fill="var(--color-planned)"
                fillOpacity={0.1}
              />
            )}
          </AreaChart>
        ) : (
          <BarChart data={data}>
            {shared}
            <Bar dataKey="completed" fill="var(--color-completed)" radius={[4, 4, 0, 0]} />
            {compare && <Bar dataKey="planned" fill="var(--color-planned)" radius={[4, 4, 0, 0]} />}
          </BarChart>
        )}
      </UX.ChartContainer>
    </Demo>
  );
}
