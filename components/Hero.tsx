import Image from 'next/image';
import Stats from './Stats';

const Hero = () => {
  return (
    <div
      className="
        w-full flex justify-center text-center px-6
        
        bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(210,100%,90%),transparent)]
        dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(210,100%,16%),transparent)]
      "
    >
      <div className="w-full font-mulish mt-28 relative">
        <div className="absolute inset-0 rounded-full pointer-events-none"></div>
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
        <h1
          className="
            text-4xl md:text-6xl font-extrabold leading-tight mt-4
            text-gray-900 dark:text-white
          "
        >
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
        <p
          className="
            text-lg md:text-xl mt-4
            text-gray-600 dark:text-gray-300
          "
        >
          Analyse mutual funds, track performance, and make confident investment
          decisions with real-time insights.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          {/* PRIMARY BUTTON — shadcn-style */}
          <button
            className="
      inline-flex items-center justify-center
      px-6 py-3 
      rounded-md 
      text-sm font-medium
      bg-blue-600 text-white 
      shadow-sm
      hover:bg-blue-700
      active:bg-blue-800
      transition-colors
      focus-visible:outline-none 
      focus-visible:ring-2 
      focus-visible:ring-blue-500 
      focus-visible:ring-offset-2
    "
          >
            Get Started
          </button>

          {/* SECONDARY BUTTON — shadcn outline */}
          <button
            className="
      inline-flex items-center justify-center
      px-6 py-3 
      rounded-md 
      text-sm font-medium
      border
      bg-white text-gray-900
      border-gray-300
      
      hover:bg-gray-100
      active:bg-gray-200

      dark:bg-transparent dark:text-white 
      dark:border-gray-700
      dark:hover:bg-gray-800/60
      dark:active:bg-gray-700/60

      transition-colors
      focus-visible:outline-none 
      focus-visible:ring-2 
      focus-visible:ring-blue-500 
      focus-visible:ring-offset-2 
      dark:focus-visible:ring-offset-gray-900
    "
          >
            Explore Funds
          </button>
        </div>
        <Stats/>
        <div className="mt-12 w-full">
          <div
            className="
      relative w-full max-w-6xl mx-auto overflow-hidden rounded-xl
      
      /* Light mode border + outline + glow */
      border-[1px] border-gray-300
      outline-[6px] outline outline-[hsla(220,25%,80%,0.2)]
      shadow-[0_0_12px_8px_hsla(220,25%,80%,0.2)]
      
      /* Dark mode border + outline + glow */
      dark:border-gray-700
      dark:outline-[6px] dark:outline-[hsla(220,20%,42%,0.1)]
      dark:shadow-[0_0_24px_12px_hsla(210,100%,25%,0.2)]
      bg-white/10 dark:bg-black/10
      backdrop-blur-md
    "
          >
            {/* Light Mode Image */}
            <Image
              src="/ligth_hero.png"
              alt="hero light"
              width={1600}
              height={900}
              className="w-full h-auto object-cover block dark:hidden"
            />

            {/* Dark Mode Image */}
            <Image
              src="/dark_hero.png"
              alt="hero dark"
              width={1600}
              height={900}
              className="w-full h-auto object-cover hidden dark:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
