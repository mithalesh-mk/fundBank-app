"use client";

import { useParams, useRouter } from "next/navigation";
import { articles } from "@/app/learn/data/articles";
import { ArrowLeft } from "lucide-react";

export default function TopicPage() {
  const router = useRouter();
  const { lessonId } = useParams();
  // const lesson = articles[lessonId as string];
  const lesson = articles["mf-1"];
  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        Lesson not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-6 md:px-20 py-10 bg-white dark:bg-gray-900">
      
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-6 hover:underline"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {lesson.title}
      </h1>

      {/* Time */}
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {lesson.timeMinutes} min read
      </div>

      {/* Article Content */}
      <div className="mt-8 prose dark:prose-invert max-w-none">
        {lesson.content.map((block, i) => {
          switch (block.type) {
            case "heading":
              return <h2 key={i}>{block.text}</h2>;

            case "paragraph":
              return <p key={i}>{block.text}</p>;

            case "diagram":
              return (
                <pre
                  key={i}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm overflow-x-auto"
                >
                  {block.text}
                </pre>
              );

            case "list":
              return (
                <ul key={i}>
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );

            case "faq":
              return (
                <div key={i} className="mt-6">
                  <h3 className="font-semibold text-lg">FAQs</h3>
                  {block.items.map((faq, j) => (
                    <div key={j} className="mt-3">
                      <p className="font-medium">{faq.q}</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
