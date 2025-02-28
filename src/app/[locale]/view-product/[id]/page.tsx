'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Star } from 'lucide-react';

import ProductCardSkeleton from '../ProductCardSkeleton';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  rate: number;
  stock: number;
  createdAt: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/products/${id}`
          );
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <ProductCardSkeleton />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-96 object-cover rounded-lg mb-8"
      />
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <div className="flex items-center mb-4">
        <Star className="text-yellow-400 w-6 h-6" />
        <span className="ml-2 text-xl">{product.rate}</span>
      </div>
      <p className="text-lg mb-4">Stock: {product.stock}</p>
      <p className="text-gray-500">
        Added: {new Date(product.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ProductDetailPage;
