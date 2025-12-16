import Image from "next/image";
import Stats from "./Stats";

const Hero = () => {
  return (
    <section
      className="
        w-full px-6
        bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(210,100%,90%),transparent)]
        dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(210,100%,16%),transparent)]
      "
    >
      <div className="max-w-7xl mx-auto pt-28 font-mulish">

        {/* ---------------- HERO ROW ---------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="text-center md:text-left">
            <div
              className="
                inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm
                bg-gradient-to-r from-blue-100/40 to-purple-100/40 border-blue-300/50
                dark:from-blue-500/10 dark:to-purple-500/10 dark:border-blue-800/50
              "
            >
              <span
                className="
                  text-sm bg-gradient-to-r bg-clip-text text-transparent
                  from-blue-700 to-purple-700
                  dark:from-blue-400 dark:to-purple-400
                "
              >
                Trusted by 100,000+ investors
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-4 text-gray-900 dark:text-white">
              Smarter Investing for
              <span
                className="
                  block bg-gradient-to-r text-transparent bg-clip-text
                  from-blue-600 to-blue-800
                  dark:from-blue-400 dark:to-blue-600
                "
              >
                Your Financial Growth
              </span>
            </h1>

            <p className="text-lg md:text-xl mt-4 text-gray-600 dark:text-gray-300">
              Analyse mutual funds, track performance, and make confident
              investment decisions with real-time insights.
            </p>

            <div className="mt-8 flex justify-center md:justify-start gap-4">
              <button className="px-6 py-3 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition">
                Get Started
              </button>

              <button className="px-6 py-3 rounded-md text-sm font-medium border border-gray-300 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                Explore Funds
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="/ggg.png"
              alt="Investment Dashboard"
              width={600}
              height={420}
              className="rounded-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

/* ---------------- STAT COMPONENT ---------------- */
const Stat = ({ title, value }: { title: string; value: string }) => (
  <div>
    <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
    <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1">
      {value}
    </p>
  </div>
);
