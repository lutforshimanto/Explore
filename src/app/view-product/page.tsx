'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import {
  setProducts,
  deleteProduct,
  setLoading,
  setError,
} from '@/redux/product';
import type { RootState } from '@/redux/store';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  updatedAt: string;
}

const ProductPage: React.FC = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch('http://localhost:3000/api/products', {
          next: {
            revalidate: 10,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        dispatch(setProducts(data));
        dispatch(setError(null));
      } catch (error) {
        console.error('Error fetching products:', error);
        dispatch(setError('Failed to fetch products'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      dispatch(deleteProduct(id));
      dispatch(setError(null));
    } catch (error) {
      console.error('Error deleting product:', error);
      dispatch(setError('Failed to delete product'));
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
      {error && (
        <div className="text-red-500 m-2 p-2 bg-red-50 rounded">{error}</div>
      )}
      <ScrollArea className="h-[700px] rounded-md border m-2 p-4">
        {isLoading ? (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        ) : (
          products.map((product: Product) => (
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
