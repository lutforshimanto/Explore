import Image from 'next/image';

import { Product } from '../types';

import StockInfo from './StockInfo';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white">
      <div className="relative h-64 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <div className="bg-yellow-100 px-2 py-1 rounded text-sm font-medium">
            ★ {product.rate}
          </div>
        </div>
        <p className="mt-2 text-gray-600 line-clamp-3">{product.description}</p>
        <div className="mt-4">
          <StockInfo productId={product.id} />
        </div>
        <div className="mt-4 text-xs text-gray-500">
          Added on {new Date(product.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
