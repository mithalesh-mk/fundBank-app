import React from "react";

interface Blog {
  title: string;
  author: string;
  date: string;
  content: string;
}

const sampleBlog: Blog = {
  title: "Understanding Mutual Funds",
  author: "FundBank Team",
  date: "Jan 20, 2025",
  content: `
Mutual funds are one of the most popular investment options today. 
They allow investors to pool their money together and invest in a 
diversified portfolio managed by professionals.

### Why they are useful
- Professional management  
- Diversification  
- Low minimum investment  
- High liquidity  

### Types of mutual funds
1. Equity Funds  
2. Debt Funds  
3. Hybrid Funds  

Mutual funds also come with different risk profiles, so investors can choose based on their goals.
  `,
};

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        {sampleBlog.title}
      </h1>

      {/* Meta */}
      <p className="text-gray-500 dark:text-gray-400 mt-2">
        By <span className="font-medium">{sampleBlog.author}</span> • {sampleBlog.date}
      </p>

      {/* Divider */}
      <div className="my-6 border-b border-gray-300 dark:border-gray-700"></div>

      {/* Content */}
      <article
        className="prose dark:prose-invert prose-lg"
        dangerouslySetInnerHTML={{ __html: sampleBlog.content.replace(/\n/g, "<br/>") }}
      ></article>
    </div>
  );
}
