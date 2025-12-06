"use client";

import { number } from "echarts";
import { useEffect, useState } from "react";


const sliderFill = (value:number, min: number, max:number) => {
    return ((value - min) * 100) / (max - min);
  };

export default function RetirementCalculator() {
  const [age, setAge] = useState("");
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [retAge, setRetAge] = useState("");
  const [lifeExpectancy, setLifeExpectancy] = useState("");

  const [roiBefore, setRoiBefore] = useState(15);
  const [roiAfter, setRoiAfter] = useState(8);
  const [inflation, setInflation] = useState(6);

  const [hasSavings, setHasSavings] = useState("no");
  const [existingSavings, setExistingSavings] = useState("");

  const [annualIncome, setAnnualIncome] = useState(0);
    const [totalCorpusNeeded, setTotalCorpusNeeded] = useState(0);
    const [netCorpusNeeded, setNetCorpusNeeded] = useState(0);
    const [monthlySavings, setMonthlySavings] = useState(0);

  // ---- VALIDATION ----
  const isValid =
    Number(age) > 18 &&
    Number(monthlyExpense) > 0 &&
    Number(retAge) > Number(age) &&
    Number(lifeExpectancy) > Number(retAge) &&
    (hasSavings === "no" || Number(existingSavings) >= 0);

  // ---- CALCULATIONS ----
  useEffect(() => {
    calculateRetirement();
  }, [
    age,
    monthlyExpense,
    retAge,
    lifeExpectancy,
    roiBefore,
    roiAfter,
    inflation,
    hasSavings,
    existingSavings,
  ]);
  
  function calculateRetirement() {
    if (!isValid) return;
  
    // 1️⃣ Convert inputs to numbers
    const currentAge = Number(age);
    const retirementAge = Number(retAge);
    const lifeExp = Number(lifeExpectancy);
    const monthlyExp = Number(monthlyExpense);
    const roiBeforePerc = Number(roiBefore);
    const roiAfterPerc = Number(roiAfter);
    const infPerc = Number(inflation);
  
    const yearsToRet = retirementAge - currentAge;
    const yearsInRetirement = lifeExp - retirementAge;
  
    if (
      yearsToRet <= 0 ||
      yearsInRetirement <= 0 ||
      monthlyExp <= 0 ||
      isNaN(monthlyExp) ||
      isNaN(roiBeforePerc) ||
      isNaN(roiAfterPerc) ||
      isNaN(infPerc)
    ) {
      setAnnualIncome(0);
      setTotalCorpusNeeded(0);
      setNetCorpusNeeded(0);
      setMonthlySavings(0);
      return;
    }
  
    // 2️⃣ Annual Income Required After Retirement (inflation-adjusted)
    const annualIncome = Math.round(
      monthlyExp * 12 * Math.pow(1 + infPerc / 100, yearsToRet)
    );
    setAnnualIncome(annualIncome);
  
    // 3️⃣ Total Corpus Needed at Retirement (PV of growing annuity, inflation-adjusted)
    const rAfter = roiAfterPerc / 100;
    const g = infPerc / 100;
  
    let totalCorpusNeeded = 0;
    if (rAfter !== g) {
      totalCorpusNeeded = Math.round(
        annualIncome * ((1 - Math.pow((1 + g) / (1 + rAfter), yearsInRetirement)) / (rAfter - g))
      );
    } else {
      // fallback if ROI after retirement equals inflation
      totalCorpusNeeded = annualIncome * yearsInRetirement;
    }
    setTotalCorpusNeeded(totalCorpusNeeded);
  
    // 4️⃣ Adjust for Existing Savings
    const existing = hasSavings === "yes" ? Number(existingSavings) : 0;
    const netCorpusNeeded = Math.max(totalCorpusNeeded - existing, 0);
    setNetCorpusNeeded(netCorpusNeeded);
  
    // 5️⃣ Monthly Savings Needed Before Retirement (FV of annuity)
    const monthsToSave = yearsToRet * 12;
    const monthlyRate = roiBeforePerc / 100 / 12;
    let monthlySavings = 0;
  
    if (monthlyRate > 0 && monthsToSave > 0) {
      monthlySavings = Math.round(
        netCorpusNeeded * monthlyRate / (Math.pow(1 + monthlyRate, monthsToSave) - 1)
      );
    } else if (monthsToSave > 0) {
      monthlySavings = Math.round(netCorpusNeeded / monthsToSave);
    }
    setMonthlySavings(monthlySavings);
  
    // 6️⃣ Log for debugging
    console.log({
      annualIncome,
      totalCorpusNeeded,
      netCorpusNeeded,
      monthlySavings,
    });
  }
  
  
  
  

  return (
    <div className="max-w-full w-full mx-auto bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 transition">

      <h1 className="text-3xl font-bold text-center">Retirement Calculator</h1>

      {/* ---- 2x2 GRID INPUTS ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age */}
        <div>
          <label className="font-medium">Age</label>
          <input
            className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-500 dark:bg-gray-800 focus:border-gray-400 outline-none"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {age && Number(age) < 18 && (
            <p className="text-red-500 text-sm">Age must be above 18</p>
          )}
        </div>

        {/* Monthly Expenses */}
        <div>
          <label className="font-medium">Monthly Expenses (₹)</label>
          <input
            className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-500 dark:bg-gray-800"
            value={monthlyExpense}
            onChange={(e) => setMonthlyExpense(e.target.value)}
          />
        </div>

        {/* Retirement Age */}
        <div>
          <label className="font-medium">Retirement Age</label>
          <input
            className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-500 dark:bg-gray-800"
            value={retAge}
            onChange={(e) => setRetAge(e.target.value)}
          />
        </div>

        {/* Life Expectancy */}
        <div>
          <label className="font-medium">Life Expectancy</label>
          <input
            className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-500 dark:bg-gray-800"
            value={lifeExpectancy}
            onChange={(e) => setLifeExpectancy(e.target.value)}
          />
        </div>
      </div>

      {/* ---- SAVINGS OPTION ---- */}
    <div className="space-y-4 mt-3">
        <p className="font-medium mb-2">Do you have existing savings?</p>

        <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-3">

    {/* Radio buttons */}
    <div className="flex items-center gap-6 mb-3">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="savings"
          value="yes"
          checked={hasSavings === "yes"}
          onChange={() => setHasSavings("yes")}
          className="w-4 h-4"
        />
        <span>Yes</span>
      </label>

      <label className="flex items-center p-2 gap-2 cursor-pointer">
        <input
          type="radio"
          name="savings"
          value="no"
          checked={hasSavings === "no"}
          onChange={() => setHasSavings("no")}
          className="w-4 h-4"
        />
        <span>No</span>
      </label>
    </div>

    {/* Input box appears on the right */}
    {hasSavings === "yes" && (
        <div>₹
      <input
        placeholder="10000"
        className="ml-2 md:mt-0 mb-4 sm:mb-3 px-2 rounded-lg border w-[50%] md:w-64 dark:bg-gray-800"
        value={existingSavings}
        onChange={(e) => setExistingSavings(e.target.value)}
        />
        </div>
        )}
    </div>
    </div>


      {/* ---- SLIDERS + RESULTS SIDE BY SIDE ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT → SLIDERS */}
        <div className="lg:col-span-2 space-y-6">

          {/* ROI BEFORE */}
          <div>
            <p className="font-medium flex justify-between">
              Expected Return Before Retirement:
              <span>{roiBefore}%</span>
            </p>
            <input
              type="range"
              min="0"
              max="30"
              value={roiBefore}
              onChange={(e) => setRoiBefore(Number(e.target.value))}
              className="w-full custom-slider"
              style={{
                background: `linear-gradient(to right, #2b7fff ${sliderFill(
                  roiBefore,
                  0,
                  30
                )}%, #4b5563 ${sliderFill(roiBefore, 0, 30)}%)`,
              }}
            />
          </div>

          {/* ROI AFTER */}
          <div>
            <p className="font-medium flex justify-between">
              Expected Return After Retirement:
              <span>{roiAfter}%</span>
            </p>
            <input
              type="range"
              min="0"
              max="30"
              value={roiAfter}
              onChange={(e) => setRoiAfter(Number(e.target.value))}
              className="w-full custom-slider"
              style={{
                background: `linear-gradient(to right, #2b7fff ${sliderFill(
                  roiAfter,
                  0,
                  30
                )}%, #4b5563 ${sliderFill(roiAfter, 0, 30)}%)`,
              }}
            />
          </div>

          {/* INFLATION */}
          <div>
            <p className="font-medium flex justify-between">
              Rate of Inflation:
              <span>{inflation}%</span>
            </p>
            <input
              type="range"
              min="3"
              max="20"
              value={inflation}
              onChange={(e) => setInflation(Number(e.target.value))}
              className="w-full custom-slider"
              style={{
                background: `linear-gradient(to right, #2b7fff ${sliderFill(
                  inflation,
                  3,
                  20
                )}%, #4b5563 ${sliderFill(inflation, 3, 20)}%)`,
              }}
            />
          </div>
        </div>

        {/* RIGHT → RESULTS */}
        <div className="bg-gray-100 md:grid-cols-4 dark:bg-gray-800 p-6 rounded-xl space-y-5">
          <h2 className="text-xl font-semibold mb-3">Results</h2>

          {!isValid ? (
            <p className="text-sm text-gray-500">
              Fill all inputs correctly to see your retirement plan.
            </p>
          ) : (
            <>
              <div>
                <p className="text-gray-500 text-sm">
                  Annual Income Required After Retirement
                </p>
                <h3 className="text-lg font-bold">
                  ₹ {annualIncome.toLocaleString()}
                </h3>
              </div>

              {hasSavings === "yes" && (
                <div>
                  <p className="text-gray-500 text-sm">Existing Savings</p>
                  <h3 className="text-lg font-bold">
                    ₹ {Number(existingSavings).toLocaleString()}
                  </h3>
                </div>
              )}

              <div>
                <p className="text-gray-500 text-sm">Additional Income required for retirement</p>
                <h3 className="text-lg font-bold text-blue-600">
                  ₹ {netCorpusNeeded.toLocaleString()}
                </h3>
              </div>

              <div>
                <p className="text-gray-500 text-sm">Monthly Savings Needed</p>
                <h3 className="text-xl font-bold text-green-600">
                  ₹ {monthlySavings.toLocaleString()}
                </h3>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
