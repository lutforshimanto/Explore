import React from 'react';
import { Star } from 'lucide-react';

import { Link } from '@/i18n/routing';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  rate: number;
  stock: number;
  createdAt: string;
}

interface ProductCardProps {
  product: Product;
  // eslint-disable-next-line no-unused-vars
  onDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  return (
    <div className="card mb-4 p-4 border rounded-md shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <div className="flex items-center mb-2">
        <Star className="text-yellow-400 w-5 h-5" />
        <span className="ml-1">{product.rate}</span>
      </div>
      <p className="text-gray-500 mb-2">Stock: {product.stock}</p>
      <p className="text-gray-500 mb-4">
        Added: {new Date(product.createdAt).toLocaleDateString()}
      </p>
      <div className="flex justify-between">
        <div className="space-x-4">
          <Link
            href={`/view-product/${product.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            View Details
          </Link>
          <Link
            href={`/view-product/edit/${product.id}`}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md"
          >
            Edit
          </Link>
        </div>
        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
