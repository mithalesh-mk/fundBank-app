"use client";

import FeatureTreeTimeline from "@/components/FeatureTreeTimeline";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import TopFundsByCategory from "@/components/TopFundsByCategory";
import { TrendingUp, LineChart, BarChart3, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="mb-6 md:mb-6 md:py-4">
      <Hero/>
      <Stats />
      <FeatureTreeTimeline />
      <TopFundsByCategory/>
    </div>
  );
}
