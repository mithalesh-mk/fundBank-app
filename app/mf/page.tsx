import MFSearch from '@/components/MFSearch';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <MFSearch />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      Loading search…
    </div>
  );
}
