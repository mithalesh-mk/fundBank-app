'use client';

import { useEffect, useState } from 'react';
import { Play, Clock } from 'lucide-react'; // kept previous style imports if needed elsewhere

const sliderFill = (value: number, min: number, max: number) => {
  if (isNaN(value)) return 0;
  return ((value - min) * 100) / (max - min);
};

// helper: parse a numeric string to a finite number, fallback to 0
const parseNumber = (v: string | number) => {
  const n = typeof v === 'number' ? v : Number(String(v).trim());
  return Number.isFinite(n) ? n : 0;
};

export default function RetirementCalculator() {
  const [age, setAge] = useState<string>('');
  const [monthlyExpense, setMonthlyExpense] = useState<string>('');
  const [retAge, setRetAge] = useState<string>('');
  const [lifeExpectancy, setLifeExpectancy] = useState<string>('');

  const [roiBefore, setRoiBefore] = useState<number>(15);
  const [roiAfter, setRoiAfter] = useState<number>(8);
  const [inflation, setInflation] = useState<number>(6);

  const [hasSavings, setHasSavings] = useState<'yes' | 'no'>('no');
  const [existingSavings, setExistingSavings] = useState<string>('');

  const [annualIncome, setAnnualIncome] = useState<number>(0);
  const [totalCorpusNeeded, setTotalCorpusNeeded] = useState<number>(0);
  const [netCorpusNeeded, setNetCorpusNeeded] = useState<number>(0);
  const [monthlySavings, setMonthlySavings] = useState<number>(0);

  // Validation using parsed numbers but allow empty fields while typing
  const parsedAge = parseNumber(age);
  const parsedMonthlyExpense = parseNumber(monthlyExpense);
  const parsedRetAge = parseNumber(retAge);
  const parsedLifeExpectancy = parseNumber(lifeExpectancy);
  const parsedExisting =
    hasSavings === 'yes' ? parseNumber(existingSavings) : 0;

  const isValid =
    parsedAge > 18 &&
    parsedMonthlyExpense > 0 &&
    parsedRetAge > parsedAge &&
    parsedLifeExpectancy > parsedRetAge &&
    (hasSavings === 'no' || parsedExisting >= 0);

  // recalc whenever inputs change
  useEffect(() => {
    calculateRetirement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // if not valid yet, zero outputs but don't early-return if user is typing partial — show nothing
    if (!isValid) {
      setAnnualIncome(0);
      setTotalCorpusNeeded(0);
      setNetCorpusNeeded(0);
      setMonthlySavings(0);
      return;
    }

    // safe parsed values
    const currentAge = parsedAge;
    const retirementAge = parsedRetAge;
    const lifeExp = parsedLifeExpectancy;
    const monthlyExp = parsedMonthlyExpense;
    const roiBeforePerc = parseNumber(roiBefore);
    const roiAfterPerc = parseNumber(roiAfter);
    const infPerc = parseNumber(inflation);

    const yearsToRet = retirementAge - currentAge;
    const yearsInRetirement = lifeExp - retirementAge;

    if (
      yearsToRet <= 0 ||
      yearsInRetirement <= 0 ||
      monthlyExp <= 0 ||
      Number.isNaN(roiBeforePerc) ||
      Number.isNaN(roiAfterPerc) ||
      Number.isNaN(infPerc)
    ) {
      setAnnualIncome(0);
      setTotalCorpusNeeded(0);
      setNetCorpusNeeded(0);
      setMonthlySavings(0);
      return;
    }

    // Annual Income Required After Retirement (inflation-adjusted)
    // Future value of current expenses after yearsToRet due to inflation
    const annualIncomeValue = Math.round(
      monthlyExp * 12 * Math.pow(1 + infPerc / 100, yearsToRet)
    );
    setAnnualIncome(annualIncomeValue);

    // Total Corpus Needed at Retirement (present value of a growing annuity)
    const rAfter = roiAfterPerc / 100;
    const g = infPerc / 100;
    let totalCorpus = 0;

    // formula: PV = Payment * (1 - ((1+g)/(1+r))^n) / (r - g)
    if (Math.abs(rAfter - g) > 1e-9) {
      totalCorpus = Math.round(
        annualIncomeValue *
          ((1 - Math.pow((1 + g) / (1 + rAfter), yearsInRetirement)) /
            (rAfter - g))
      );
    } else {
      // when rAfter approx equals inflation, fallback to simple multiplication
      totalCorpus = Math.round(annualIncomeValue * yearsInRetirement);
    }
    setTotalCorpusNeeded(totalCorpus);

    // Adjust for existing savings (assume lump sum present at retirement as-is)
    const existing = parsedExisting;
    const netNeeded = Math.max(totalCorpus - existing, 0);
    setNetCorpusNeeded(netNeeded);

    // Monthly Savings Needed Before Retirement (calculate annuity payment to reach netNeeded)
    const monthsToSave = Math.max(0, yearsToRet * 12);
    const monthlyRate = roiBeforePerc / 100 / 12;
    let monthlySave = 0;

    if (monthsToSave > 0) {
      if (monthlyRate > 0) {
        // PMT formula rearranged: PMT = FV * r / ((1+r)^n - 1)
        monthlySave = Math.round(
          (netNeeded * monthlyRate) /
            (Math.pow(1 + monthlyRate, monthsToSave) - 1)
        );
      } else {
        monthlySave = Math.round(netNeeded / monthsToSave);
      }
    } else {
      monthlySave = netNeeded; // immediate lump sum required if no time to save
    }
    setMonthlySavings(monthlySave);

    // debugging
    // console.log({ annualIncomeValue, totalCorpus, existing, netNeeded, monthlySave });
  }

  // Small helpers for input handlers — preserve UI but prevent invalid characters like 'e'
  const handleNumericInput =
    (setter: (v: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      // allow empty string
      if (raw === '') {
        setter('');
        return;
      }
      // accept only digits and decimal point — remove other characters
      // but for age/years we prefer integers — we won't enforce here to keep UI unchanged
      const cleaned = raw.replace(/[^0-9.]/g, '');
      setter(cleaned);
    };

  return (
    <div className="max-w-full w-full mx-auto bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 transition">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="font-medium">Age</label>
          <input
            className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-500 dark:bg-gray-800 focus:border-gray-400 outline-none"
            value={age}
            type="number"
            onChange={(e) => {
              const raw = e.target.value;
              const cleaned = raw.replace(/[^0-9]/g, '');
              if (cleaned === '') return setAge('');

              let n = Number(cleaned);
              if (n > 120) n = 120;

              setAge(String(n));
            }}
          />

          {age !== '' && parsedAge < 18 && (
            <p className="text-red-500 text-sm">Age must be above 18</p>
          )}

          {age !== '' && parsedAge > 120 && (
            <p className="text-red-500 text-sm">Age seems invalid</p>
          )}
        </div>

        <div>
          <label className="font-medium">Monthly Expenses (₹)</label>
          <input
            className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-500 dark:bg-gray-800"
            value={monthlyExpense}
            type="number"
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, '');
              if (raw === '') return setMonthlyExpense('');
              let n = Number(raw);
              if (n > 100000000) n = 100000000; // clamp
              setMonthlyExpense(String(n));
            }}
          />

          {monthlyExpense !== '' && parsedMonthlyExpense <= 0 && (
            <p className="text-red-500 text-sm">
              Expense must be greater than ₹0
            </p>
          )}
        </div>

        {/* Retirement Age */}
        <div>
          <label className="font-medium">Retirement Age</label>
          <input
            className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-500 dark:bg-gray-800"
            value={retAge}
            type="number"
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, '');
              if (raw === '') return setRetAge('');

              let n = Number(raw);
              if (n > 120) n = 120;

              setRetAge(String(n));
            }}
          />
          {retAge !== '' && parsedRetAge <= parsedAge && (
            <p className="text-red-500 text-sm">
              Retirement age must be greater than your current age
            </p>
          )}
          {retAge !== '' && parsedRetAge > 120 && (
            <p className="text-red-500 text-sm">Invalid retirement age</p>
          )}
        </div>
        <div>
          <label className="font-medium">Life Expectancy</label>
          <input
            className="w-full mt-1 p-2 rounded-lg border border-gray-300 dark:border-gray-500 dark:bg-gray-800"
            value={lifeExpectancy}
            type="number"
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, '');
              if (raw === '') return setLifeExpectancy('');

              let n = Number(raw);
              if (n > 150) n = 150;

              setLifeExpectancy(String(n));
            }}
          />

          {/* Errors */}
          {lifeExpectancy !== '' && parsedLifeExpectancy <= parsedRetAge && (
            <p className="text-red-500 text-sm">
              Life expectancy must be greater than retirement age
            </p>
          )}
          {lifeExpectancy !== '' && parsedLifeExpectancy > 150 && (
            <p className="text-red-500 text-sm">Invalid life expectancy</p>
          )}
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
                checked={hasSavings === 'yes'}
                onChange={() => setHasSavings('yes')}
                className="w-4 h-4"
              />
              <span>Yes</span>
            </label>

            <label className="flex items-center p-2 gap-2 cursor-pointer">
              <input
                type="radio"
                name="savings"
                value="no"
                checked={hasSavings === 'no'}
                onChange={() => setHasSavings('no')}
                className="w-4 h-4"
              />
              <span>No</span>
            </label>
          </div>

          {/* Input box appears on the right */}
          {hasSavings === 'yes' && (
            <div className="flex items-center">
              <span>₹</span>
              <input
                placeholder="10000"
                className="ml-2 md:mt-0 mb-4 sm:mb-3 px-2 rounded-lg border w-[50%] md:w-64 dark:bg-gray-800"
                value={existingSavings}
                onChange={(e) => handleNumericInput(setExistingSavings)(e)}
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
                )}%, #CBD5E1 ${sliderFill(roiBefore, 0, 30)}%)`,
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
                )}%, #CBD5E1 ${sliderFill(roiAfter, 0, 30)}%)`,
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
                )}%, #CBD5E1 ${sliderFill(inflation, 3, 20)}%)`,
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

              {hasSavings === 'yes' && (
                <div>
                  <p className="text-gray-500 text-sm">Existing Savings</p>
                  <h3 className="text-lg font-bold">
                    ₹ {parsedExisting.toLocaleString()}
                  </h3>
                </div>
              )}

              <div>
                <p className="text-gray-500 text-sm">
                  Additional Income required for retirement
                </p>
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
