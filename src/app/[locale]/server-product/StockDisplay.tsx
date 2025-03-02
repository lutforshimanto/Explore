// StockDisplay.tsx
// This is a Server Component that fetches stock data with revalidation
import { Suspense } from 'react';

interface StockDisplayProps {
  productId: string;
}

// Loading fallback component
function StockLoading() {
  return (
    <span className="inline-block w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
  );
}

// Server component to fetch and display stock
async function StockData({ productId }: { productId: string }) {
  // Using next revalidate option with 3-second interval
  const response = await fetch(
    `http://localhost:3000/api/products/stock/${productId}`,
    { next: { revalidate: 3 } } // Revalidate every 3 seconds
  );

  if (!response.ok) {
    return <span className="text-red-500">Error loading stock</span>;
  }

  const data = await response.json();
  return <span>{data.stock}</span>;
}

export default function StockDisplay({ productId }: StockDisplayProps) {
  return (
    <p className="text-gray-500 mb-2">
      Stock:{' '}
      <Suspense fallback={<StockLoading />}>
        <StockData productId={productId} />
      </Suspense>
    </p>
  );
}
