"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const features = [
  {
    id: 1,
    title: "Various Assets",
    desc: "Analyse mutual funds across categories and diversify your investments intelligently.",
    img: "/dark_hero.png",
  },
  {
    id: 2,
    title: "Market Analysis",
    desc: "Get deep insights with real-time data, returns comparison and risk metrics.",
    img: "/dark_hero.png",
  },
  {
    id: 3,
    title: "Enhanced Tools",
    desc: "Use calculators, SIP planners and performance trackers in one place.",
    img: "/dark_hero.png",
  },
];

export default function FeatureTreeTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const [openId, setOpenId] = useState<number | null>(0);

  /* ---------- OBSERVER ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full px-6 py-24 mt-24">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Save time. Get{" "}
            <span className="text-blue-600 dark:text-blue-400">
              higher return
            </span>.
            <br />
            Multiply wealth.
          </h2>
        </div>

        {/* TREE */}
        <div className="relative">

          {/* ANIMATED CENTER LINE */}
          <div
            className={`
              hidden md:block absolute left-1/2 top-0 w-[3px]
              bg-gray-300 dark:bg-gray-700
              ${animate ? "animate-draw-line" : "h-0"}
            `}
            style={{ height: "100%" }}
          />

          <div className="space-y-20">
            {features.map((f, i) => {
              const isLeft = i % 2 === 0;
              const isOpen = openId === f.id;

              return (
                <div key={f.id} className="relative">

                  {/* DESKTOP */}
                  <div className="hidden md:grid grid-cols-[1fr_auto_1fr]">

                    {isLeft ? (
                      <Card
                        align="right"
                        feature={f}
                        isOpen={isOpen}
                        onClick={() => setOpenId(isOpen ? null : f.id)}
                      />
                    ) : (
                      <div />
                    )}

                    {/* NODE */}
                    <div className="relative flex justify-center">
                      <div className="relative z-10 mt-[22px]">
                        <div className="h-4 w-4 rounded-full bg-blue-600 dark:bg-blue-400 ring-4 ring-blue-100 dark:ring-blue-900" />
                      </div>

                      {/* CONNECTOR */}
                      <div
                        className={`absolute top-[30px] h-px w-16 bg-gray-300 dark:bg-gray-700 ${
                          isLeft ? "-left-16" : "left-0"
                        }`}
                      />
                    </div>

                    {!isLeft ? (
                      <Card
                        align="left"
                        feature={f}
                        isOpen={isOpen}
                        onClick={() => setOpenId(isOpen ? null : f.id)}
                      />
                    ) : (
                      <div />
                    )}
                  </div>

                  {/* MOBILE */}
                  <div className="md:hidden relative pl-8">
                    <div className="absolute left-3 top-0 h-full w-px bg-gray-300 dark:bg-gray-700" />
                    <div className="absolute left-[9px] top-6 h-3 w-3 rounded-full bg-blue-600 dark:bg-blue-400" />

                    <MobileCard
                      feature={f}
                      isOpen={isOpen}
                      onClick={() => setOpenId(isOpen ? null : f.id)}
                    />
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CARDS ---------------- */

function Card({ feature, isOpen, onClick, align }: any) {
  return (
    <div className={`flex ${align === "right" ? "justify-end pr-8" : "pl-8"}`}>
      <div
        onClick={onClick}
        className="
          cursor-pointer w-[380px]
          rounded-2xl p-6
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-800
          shadow-sm hover:shadow-md transition
        "
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {feature.title}
        </h3>

        <Expandable feature={feature} isOpen={isOpen} />
      </div>
    </div>
  );
}

function MobileCard({ feature, isOpen, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="rounded-xl p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
    >
      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
        {feature.title}
      </h3>

      <Expandable feature={feature} isOpen={isOpen} />
    </div>
  );
}

function Expandable({ feature, isOpen }: any) {
  return (
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-[420px] mt-4 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {feature.desc}
      </p>

      <Image
        src={feature.img}
        alt={feature.title}
        width={260}
        height={160}
        className="rounded-lg"
      />
    </div>
  );
}
