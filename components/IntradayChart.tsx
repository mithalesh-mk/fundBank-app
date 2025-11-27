"use client";

import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";

export default function IntradayEChart() {
  const rawData = [
    { time: "2024-04-09T09:30:00Z", value: 1669.0 },
    { time: "2024-04-09T09:31:00Z", value: 1669.2 },
    { time: "2024-04-09T09:32:00Z", value: 1669.35 },
    { time: "2024-04-09T09:33:00Z", value: 1669.1 },
    { time: "2024-04-09T09:34:00Z", value: 1669.5 },
    { time: "2024-04-09T09:35:00Z", value: 1670.0 },
    { time: "2024-04-09T09:36:00Z", value: 1670.4 },
    { time: "2024-04-09T09:37:00Z", value: 1670.25 },
    { time: "2024-04-09T09:38:00Z", value: 1670.6 },
    { time: "2024-04-09T09:39:00Z", value: 1671.0 },
    { time: "2024-04-09T09:40:00Z", value: 1671.3 },
    { time: "2024-04-09T09:41:00Z", value: 1671.1 },
    { time: "2024-04-09T09:42:00Z", value: 1671.5 },
    { time: "2024-04-09T09:43:00Z", value: 1671.9 },
    { time: "2024-04-09T09:44:00Z", value: 1672.1 },
    { time: "2024-04-09T09:45:00Z", value: 1672.4 },
    { time: "2024-04-09T09:46:00Z", value: 1672.2 },
    { time: "2024-04-09T09:47:00Z", value: 1672.6 },
    { time: "2024-04-09T09:48:00Z", value: 1673.0 },
    { time: "2024-04-09T09:49:00Z", value: 1673.4 },
    { time: "2024-04-09T09:50:00Z", value: 1673.1 },
    { time: "2024-04-09T09:51:00Z", value: 1673.8 },
    { time: "2024-04-09T09:52:00Z", value: 1674.2 },
    { time: "2024-04-09T09:53:00Z", value: 1674.0 },
    { time: "2024-04-09T09:54:00Z", value: 1674.5 },
    { time: "2024-04-09T09:55:00Z", value: 1675.0 },
    { time: "2024-04-09T09:56:00Z", value: 1675.3 },
    { time: "2024-04-09T09:57:00Z", value: 1675.1 },
    { time: "2024-04-09T09:58:00Z", value: 1675.4 },
    { time: "2024-04-09T09:59:00Z", value: 1675.8 },
  ];

  // Convert to chart format
  const seriesData = rawData.map((d) => [new Date(d.time).getTime(), d.value]);

  // Tight y-axis range
  const values = rawData.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  // --- 📱 Responsive Scaling ---
  const { fontSmall, fontMedium, fontLarge, lineWidth } = useMemo(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1200;

    if (width < 500) {
      // Mobile
      return {
        fontSmall: 8,
        fontMedium: 10,
        fontLarge: 12,
        lineWidth: 1,
      };
    } else if (width < 900) {
      // Tablet
      return {
        fontSmall: 9,
        fontMedium: 14,
        fontLarge: 16,
        lineWidth: 1,
      };
    } else {
      // Desktop
      return {
        fontSmall: 13,
        fontMedium: 15,
        fontLarge: 18,
        lineWidth: 3,
      };
    }
  }, []);

  const option = {
    backgroundColor: "transparent",

    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(15, 23, 42, 0.95)",
      borderColor: "rgba(148, 163, 184, 0.25)",
      borderWidth: 1,
      padding: 10,
      extraCssText: "border-radius: 10px; backdrop-filter: blur(6px);",
      textStyle: { color: "#e2e8f0", fontSize: fontSmall },

      formatter: (params: any) => {
        const p = params[0];
        const date = new Date(p.value[0]);

        const formattedDate = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        const formattedTime = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return `
          <div style="display:flex; flex-direction:column; gap:4px;">
            <div style="font-size:${fontMedium}px; color:#f1f5f9; font-weight:600;">
              ${formattedDate} · ${formattedTime}
            </div>

            <div style="height:1px; background:rgba(148,163,184,0.2); margin:6px 0;"></div>

            <div style="font-size:${fontSmall}px; color:#94a3b8;">
              NAV
            </div>
            <div style="font-size:${fontLarge}px; color:#22c55e; font-weight:700;">
              ₹${p.value[1]}
            </div>
          </div>
        `;
      },
    },

    grid: {
      left: "4%",
      right: "4%",
      bottom: "6%",
      top: "10%",
    },

    xAxis: {
      type: "time",
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { show: true },
    },

    yAxis: {
      type: "value",
      min: minVal - 0.5,
      max: maxVal + 0.5,
      axisLabel: { show: false },
      splitLine: { lineStyle: { color: "rgba(100,116,139,0.2)" } },
    },

    series: [
      {
        type: "line",
        data: seriesData,
        smooth: true,
        symbol: "none",
        lineStyle: {
          color: "#22c55e",
          width: lineWidth, // responsive line width
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />;
}
