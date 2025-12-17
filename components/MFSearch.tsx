'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import fundService, { MutualFundScheme } from '@/services/fundService';

const PAGE_SIZE = 20;

export default function MFSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialTerm = searchParams.get('q') ?? '';

  const [query, setQuery] = useState(initialTerm);
  const [debouncedQuery, setDebouncedQuery] = useState(initialTerm);

  const [results, setResults] = useState<MutualFundScheme[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  // Sync query with URL param changes
  useEffect(() => {
    const urlQuery = searchParams.get('q') ?? '';
    if (urlQuery !== query) {
      setQuery(urlQuery);
      setDebouncedQuery(urlQuery);
    }
  }, [searchParams]);

  // Debounce the query
  useEffect(() => {
    const t = setTimeout(() => {
      const trimmed = query.trim();
      setDebouncedQuery(trimmed);
      
      // Update URL when debounced query changes
      const currentQuery = searchParams.get('q') ?? '';
      if (trimmed !== currentQuery) {
        router.replace(trimmed ? `/mf?q=${encodeURIComponent(trimmed)}` : '/mf', {
          scroll: false,
        });
      }
    }, 400);

    return () => clearTimeout(t);
  }, [query, router, searchParams]);

  // Reset pagination on new search
  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedQuery]);

  // Fetch results
  useEffect(() => {
    if (!debouncedQuery || !hasMore || loading) return;

    const controller = new AbortController();
    setLoading(true);
    loadingRef.current = true;

    fundService
      .searchFunds(debouncedQuery, controller.signal, {
        page,
        limit: PAGE_SIZE,
      })
      .then((res) => {
        if (!res.ok) return;

        setResults((prev) => [...prev, ...res.data]);

        if (res.data.length < PAGE_SIZE) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') console.error(err);
      })
      .finally(() => {
        setLoading(false);
        loadingRef.current = false;
      });

    return () => controller.abort();
  }, [debouncedQuery, page, hasMore]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingRef.current) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasMore]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmed = query.trim();
      // Immediately update both query states and URL
      setDebouncedQuery(trimmed);
      router.replace(trimmed ? `/mf?q=${encodeURIComponent(trimmed)}` : '/mf', {
        scroll: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="">
        <div className="max-w-4xl mx-auto px-4 py-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Search Mutual Funds
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Explore all matching funds beyond quick search results
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-2">
        <div
          className="
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-700
          rounded-2xl shadow-sm
          flex flex-col
          h-[70vh]
        "
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div
              className="
              flex items-center gap-2 px-4 py-3 rounded-xl
              bg-gray-50 dark:bg-gray-800
              border border-gray-300 dark:border-gray-700
              focus-within:border-blue-500
            "
            >
              <Search className="w-5 h-5 text-gray-500" />
              <input
                value={query}
                placeholder="Search by fund name, AMC, category…"
                className="
                w-full bg-transparent outline-none text-sm
                text-gray-800 dark:text-gray-200
                placeholder-gray-500
              "
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {debouncedQuery && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {results.length} results for "{debouncedQuery}"
              </p>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {results.map((fund) => (
              <div
                key={fund.scheme_code}
                onClick={() => router.push(`/mutual-funds/${fund.scheme_code}`)}
                className="
                mb-3 p-4 rounded-xl
                border border-gray-200 dark:border-gray-800
                bg-gray-50 dark:bg-gray-800
                cursor-pointer transition
                hover:border-blue-500 hover:bg-blue-50
                dark:hover:bg-[#222637]
              "
              >
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {fund.scheme_name}
                </span>
              </div>
            ))}

            {loading && (
              <div className="text-center text-gray-500 py-6">
                Loading more…
              </div>
            )}

            {hasMore && <div ref={observerRef} className="h-10" />}

            {!loading && results.length === 0 && debouncedQuery && (
              <div className="text-center py-20 text-gray-500">
                No funds found
              </div>
            )}

            {!debouncedQuery && (
              <div className="text-center py-20 text-gray-500">
                Start typing to search for mutual funds
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}