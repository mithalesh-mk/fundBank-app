"use client";

import React, { useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";

// ----- Sample Data (Replace these with API data later) -----
const dataSets: Record<string, { time: string; value: number }[]> = {

  // ---------------------- 1 MONTH (Daily Data ~ 30 Points) ----------------------
  "1M": [
    { time: "2024-03-10T09:30:00Z", value: 1658 },
    { time: "2024-03-11T09:30:00Z", value: 1660 },
    { time: "2024-03-12T09:30:00Z", value: 1662 },
    { time: "2024-03-13T09:30:00Z", value: 1663 },
    { time: "2024-03-14T09:30:00Z", value: 1664 },
    { time: "2024-03-15T09:30:00Z", value: 1666 },
    { time: "2024-03-16T09:30:00Z", value: 1668 },
    { time: "2024-03-17T09:30:00Z", value: 1667 },
    { time: "2024-03-18T09:30:00Z", value: 1669 },
    { time: "2024-03-19T09:30:00Z", value: 1670 },
    { time: "2024-03-20T09:30:00Z", value: 1671 },
    { time: "2024-03-21T09:30:00Z", value: 1672 },
    { time: "2024-03-22T09:30:00Z", value: 1674 },
    { time: "2024-03-23T09:30:00Z", value: 1675 },
    { time: "2024-03-24T09:30:00Z", value: 1677 },
    { time: "2024-03-25T09:30:00Z", value: 1678 },
    { time: "2024-03-26T09:30:00Z", value: 1680 },
    { time: "2024-03-27T09:30:00Z", value: 1681 },
    { time: "2024-03-28T09:30:00Z", value: 1683 },
    { time: "2024-03-29T09:30:00Z", value: 1684 },
    { time: "2024-03-30T09:30:00Z", value: 1685 },
    { time: "2024-03-31T09:30:00Z", value: 1686 },
    { time: "2024-04-01T09:30:00Z", value: 1687 },
    { time: "2024-04-02T09:30:00Z", value: 1687.5 },
    { time: "2024-04-03T09:30:00Z", value: 1688 },
    { time: "2024-04-04T09:30:00Z", value: 1689 },
    { time: "2024-04-05T09:30:00Z", value: 1690 },
    { time: "2024-04-06T09:30:00Z", value: 1691 },
    { time: "2024-04-07T09:30:00Z", value: 1692 },
    { time: "2024-04-08T09:30:00Z", value: 1693 },
  ],

  // ---------------------- 3 MONTHS (Weekly Data) ----------------------
  "3M": [
    { time: "2024-02-01T09:30:00Z", value: 1630 },
    { time: "2024-02-08T09:30:00Z", value: 1640 },
    { time: "2024-02-15T09:30:00Z", value: 1652 },
    { time: "2024-02-22T09:30:00Z", value: 1659 },
    { time: "2024-03-01T09:30:00Z", value: 1666 },
    { time: "2024-03-08T09:30:00Z", value: 1675 },
    { time: "2024-03-15T09:30:00Z", value: 1679 },
    { time: "2024-03-22T09:30:00Z", value: 1684 },
    { time: "2024-03-29T09:30:00Z", value: 1687 },
    { time: "2024-04-05T09:30:00Z", value: 1691 },
  ],

  // ---------------------- 6 MONTHS (Bi-weekly Data) ----------------------
  "6M": [
    { time: "2023-11-01T09:30:00Z", value: 1550 },
    { time: "2023-11-15T09:30:00Z", value: 1565 },
    { time: "2023-12-01T09:30:00Z", value: 1580 },
    { time: "2023-12-15T09:30:00Z", value: 1600 },
    { time: "2024-01-01T09:30:00Z", value: 1618 },
    { time: "2024-01-15T09:30:00Z", value: 1635 },
    { time: "2024-02-01T09:30:00Z", value: 1648 },
    { time: "2024-02-15T09:30:00Z", value: 1660 },
    { time: "2024-03-01T09:30:00Z", value: 1672 },
    { time: "2024-03-15T09:30:00Z", value: 1681 },
    { time: "2024-04-01T09:30:00Z", value: 1690 },
  ],

  // ---------------------- 1 YEAR (Monthly Data) ----------------------
  "1Y": [
    { time: "2023-04-01T09:30:00Z", value: 1500 },
    { time: "2023-05-01T09:30:00Z", value: 1512 },
    { time: "2023-06-01T09:30:00Z", value: 1530 },
    { time: "2023-07-01T09:30:00Z", value: 1544 },
    { time: "2023-08-01T09:30:00Z", value: 1558 },
    { time: "2023-09-01T09:30:00Z", value: 1572 },
    { time: "2023-10-01T09:30:00Z", value: 1590 },
    { time: "2023-11-01T09:30:00Z", value: 1602 },
    { time: "2023-12-01T09:30:00Z", value: 1620 },
    { time: "2024-01-01T09:30:00Z", value: 1645 },
    { time: "2024-02-01T09:30:00Z", value: 1660 },
    { time: "2024-03-01T09:30:00Z", value: 1675 },
    { time: "2024-04-01T09:30:00Z", value: 1690 },
  ],

  // ---------------------- 5 YEARS (Quarterly Data) ----------------------
  "5Y": [
    { time: "2019-04-01T09:30:00Z", value: 1120 },
    { time: "2019-07-01T09:30:00Z", value: 1150 },
    { time: "2019-10-01T09:30:00Z", value: 1180 },
    { time: "2020-01-01T09:30:00Z", value: 1205 },
    { time: "2020-04-01T09:30:00Z", value: 1220 },
    { time: "2020-07-01T09:30:00Z", value: 1255 },
    { time: "2020-10-01T09:30:00Z", value: 1280 },
    { time: "2021-01-01T09:30:00Z", value: 1310 },
    { time: "2021-04-01T09:30:00Z", value: 1360 },
    { time: "2021-07-01T09:30:00Z", value: 1388 },
    { time: "2021-10-01T09:30:00Z", value: 1405 },
    { time: "2022-01-01T09:30:00Z", value: 1430 },
    { time: "2022-04-01T09:30:00Z", value: 1460 },
    { time: "2022-07-01T09:30:00Z", value: 1495 },
    { time: "2022-10-01T09:30:00Z", value: 1520 },
    { time: "2023-01-01T09:30:00Z", value: 1545 },
    { time: "2023-04-01T09:30:00Z", value: 1575 },
    { time: "2023-07-01T09:30:00Z", value: 1605 },
    { time: "2023-10-01T09:30:00Z", value: 1640 },
    { time: "2024-01-01T09:30:00Z", value: 1665 },
    { time: "2024-04-01T09:30:00Z", value: 1690 },
  ],
};


export default function IntradayEChart() {
  const ranges = ["1M", "3M", "6M", "1Y", "5Y"];
  const [activeRange, setActiveRange] = useState("1M");

  const rawData = dataSets[activeRange];

  const seriesData = rawData.map((d) => [new Date(d.time).getTime(), d.value]);
  const values = rawData.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  // --- Responsive Typography & Line Width ---
  const { fontSmall, fontMedium, fontLarge, lineWidth } = useMemo(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1200;

    if (width < 500) {
      return { fontSmall: 8, fontMedium: 10, fontLarge: 12, lineWidth: 1 };
    } else if (width < 900) {
      return { fontSmall: 9, fontMedium: 14, fontLarge: 16, lineWidth: 2 };
    } else {
      return { fontSmall: 12, fontMedium: 15, fontLarge: 18, lineWidth: 3 };
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

        return `
            <div style="display:flex; flex-direction:column; gap:4px;">
              <div style="font-size:${fontMedium}px; font-weight:600;">
                ${date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
              </div>
              <div style="color:#94a3b8; font-size:${fontSmall}px;">NAV</div>
              <div style="font-size:${fontLarge}px; color:#22c55e; font-weight:700;">
                ₹${p.value[1]}
              </div>
            </div>
        `;
      },
    },

    grid: { left: "4%", right: "4%", bottom: "6%", top: "10%" },

    xAxis: {
      type: "time",
      axisLabel: { show: false},
      axisTick: { show: false },
      axisLine: { show: true },
    },

    yAxis: {
      type: "value",
      min: minVal - 2,
      max: maxVal + 2,
      axisLabel: { show: false},
      splitLine: { lineStyle: { color: "rgba(100,116,139,0.2)" } },
    },

    series: [
      {
        type: "line",
        data: seriesData,
        smooth: true,
        symbol: "none",
        lineStyle: { color: "#22c55e", width: lineWidth },
      },
    ],
  };

  return (
    <div className="w-full">
      {/* --------------------- Chart --------------------- */}
      <ReactECharts option={option} style={{ height: "350px", width: "100%" }} />

      {/* ----------------- Range Buttons ----------------- */}
      <div className="flex items-center gap-2 mb-4 flex-wrap justify-end">
        {ranges.map((r) => (
          <button
            key={r}
            onClick={() => setActiveRange(r)}
            className={`px-3 py-1.5 text-sm rounded-2xl border transition-all
              ${
                activeRange === r
                  ? "bg-green-500 text-white border-green-600 shadow"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300"
              }
            `}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}
