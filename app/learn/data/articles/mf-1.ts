import { LessonArticle } from "./types";


const article: LessonArticle = {
  id: "mf-1",
  title: "What is a Mutual Fund",
  timeMinutes: 6,
  content: [
    {
      type: "paragraph",
      text:
        "A mutual fund is an investment vehicle that pools money from many investors and invests it into a diversified portfolio of assets such as stocks, bonds, gold, or money-market instruments. A professional fund manager handles decisions on behalf of all investors, making mutual funds a convenient option for both beginners and experienced investors."
    },

    {
      type: "heading",
      text: "How Mutual Funds Work"
    },
    {
      type: "paragraph",
      text:
        "When you invest in a mutual fund, your money is combined with funds from thousands of other investors. The combined pool is then managed by an Asset Management Company (AMC) like SBI Mutual Fund, HDFC Mutual Fund, ICICI Prudential, etc. The fund manager allocates the pool into different assets based on the fund's objective—growth, income, stability, or a mix."
    },

    {
      type: "diagram",
      text: `
Investors → Asset Management Company (AMC) → Fund Manager  
                  ↓  
         Investments (Stocks, Bonds, Gold)  
                  ↓  
           NAV Grows → Returns to Investors
      `
    },

    {
      type: "heading",
      text: "What is NAV?"
    },
    {
      type: "paragraph",
      text:
        "NAV stands for Net Asset Value. It is the price of one unit of a mutual fund. NAV changes every business day based on the market value of the underlying investments. A rising NAV indicates growth in the value of the fund’s investments."
    },
    {
      type: "diagram",
      text: `
NAV = (Total Value of Fund Investments – Fund Expenses) ÷ Total Units Issued
      `
    },

    {
      type: "heading",
      text: "Why Mutual Funds Are Popular in India"
    },
    {
      type: "list",
      items: [
        "Start investing with as little as ₹100–₹500 via SIP",
        "Managed by SEBI-regulated fund managers",
        "Ideal for long-term wealth creation",
        "Highly diversified — reduces risk",
        "Transparent with monthly factsheets and disclosures",
        "Tax benefits through ELSS under Section 80C"
      ]
    },

    {
      type: "heading",
      text: "Types of Mutual Funds"
    },
    {
      type: "list",
      items: [
        "Equity Funds — Invest in stocks; best for long-term goals.",
        "Debt Funds — Invest in bonds and fixed-income securities; stable but lower returns.",
        "Hybrid Funds — Mix of equity + debt; balanced risk and reward.",
        "Index Funds — Track indices like Nifty 50 or Sensex; low-cost and passive.",
        "Sector/Thematic Funds — Invest in specific industries; higher risk."
      ]
    },

    {
      type: "heading",
      text: "Risks You Should Know"
    },
    {
      type: "paragraph",
      text:
        "Although mutual funds are safer compared to investing directly in stocks, they still carry market-linked risks. Equity funds may fluctuate as markets move, debt funds can be affected by interest rate changes, and sector funds carry concentration risk. It's important to choose funds aligned with your time horizon and goals."
    },

    {
      type: "heading",
      text: "Who Should Invest?"
    },
    {
      type: "paragraph",
      text:
        "Mutual funds are ideal for anyone looking to build long-term wealth without needing deep market knowledge. They fit beginners who prefer SIP-based disciplined investing, as well as experienced investors who want diversified exposure to equity and debt markets."
    },

    {
      type: "heading",
      text: "FAQs"
    },
    {
      type: "faq",
      items: [
        {
          q: "Is a mutual fund safer than stocks?",
          a:
            "Generally yes. Mutual funds diversify across many companies and are managed by professionals, reducing risk compared to picking individual stocks."
        },
        {
          q: "How much money do I need to start?",
          a:
            "You can begin with ₹100–₹500 through SIP or ₹1,000–₹5,000 via lump-sum in most funds."
        },
        {
          q: "Do I need a demat account?",
          a:
            "No. Mutual funds can be bought directly from AMC websites or apps like Groww, Zerodha, or Paytm Money without a demat account."
        },
        {
          q: "Can I lose money in a mutual fund?",
          a:
            "Yes. Mutual funds are market-linked products. While diversification reduces risk, values may go down in the short term due to market volatility."
        }
      ]
    }
  ]
};

export default article;
