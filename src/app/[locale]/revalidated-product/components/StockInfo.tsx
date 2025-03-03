import { cache } from 'react';

interface StockInfoProps {
  productId: string;
}

const getStock = cache(async (productId: string) => {
  const response = await fetch(
    `http://localhost:3000/api/products/stock/${productId}`,
    {
      next: { revalidate: 5 },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch stock information');
  }

  return response.json();
});

export default async function StockInfo({ productId }: StockInfoProps) {
  const stockData = await getStock(productId);
  const stockCount = stockData.stock;

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
}
