'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from '@/i18n/routing';

import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  rate: number;
  stock: number;
  createdAt: string;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="pt-10">
      <Link
        href="/view-product/create"
        className="bg-blue-500 text-white px-4 py-2 m-2 mb-2 font-bold rounded-md"
      >
        + Add new product
      </Link>
      <ScrollArea className="h-[700px] rounded-md border m-2 p-4">
        {loading ? (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        ) : (
          products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
            />
          ))
        )}
      </ScrollArea>
    </div>
  );
};

export default ProductPage;
