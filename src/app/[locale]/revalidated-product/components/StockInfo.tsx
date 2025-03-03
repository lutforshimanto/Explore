'use client';

import useSWR from 'swr';

interface StockInfoProps {
  productId: string;
}

const fetcher = (url: string) => fetch(url).then(r => r.json());

const StockInfo = ({ productId }: StockInfoProps) => {
  const { data, error, isLoading } = useSWR(
    `http://localhost:3000/api/products/stock/${productId}`,
    fetcher,
    {
      revalidateOnFocus: true,
      // refreshInterval: 20000,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const stockCount = data?.stock;

  let stockStatus;
  let statusColor;

  if (stockCount > 10) {
    stockStatus = 'In Stock';
    statusColor = 'text-green-600 bg-green-100';
  } else if (stockCount > 0) {
    stockStatus = `Low Stock: ${stockCount} left`;
    statusColor = 'text-orange-600 bg-orange-100';
  } else {
    stockStatus = 'Out of Stock';
    statusColor = 'text-red-600 bg-red-100';
  }

  return (
    <div
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
    >
      <div>
        <span>{stockStatus}</span>
        <span className="ml-2 text-gray-500">({stockCount})</span>
      </div>
    </div>
  );
};

export default StockInfo;
