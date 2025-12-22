import IntradayChart from "@/components/IntradayChart";
import fundService from "@/services/fundService";



async function Graph() {
  const data = await fundService.getFundNAV("147844", "2022-01-01", "2025-11-28");
  if(!data.ok){
    return <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
        Unable to load data. Please try again later.
      </h2>
    </div>
  }
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 
      dark:from-gray-900 dark:to-black text-black dark:text-white 
      transition-colors pt-12 px-6">
      
      {/* Page Title */}
      <h1 className="text-3xl font-extrabold mb-8 
        text-gray-900 dark:text-gray-100 tracking-tight">
        Intraday NAV Movement
      </h1>

      {/* Center Wrapper */}
      <div className="max-w-5xl mx-auto">

        {/* Chart Card (Premium) */}
        <div className="relative w-full h-[450px] 
          rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 
          bg-white/90 dark:bg-[#0d1117]/90 backdrop-blur-xl 
          p-6 transition-all duration-300 hover:shadow-2xl">

          {/* Soft Glow Border */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none 
            ring-1 ring-gray-300/40 dark:ring-white/10"></div>

          <IntradayChart data={data?.data.data} />
        </div>
        
      </div>
    </div>
  );
}

export default Graph;
