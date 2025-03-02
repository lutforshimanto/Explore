// ProductList.tsx (Client Component)
'use client';

import React, { useState } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';

import ProductCard from './ProductCard';

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

interface ProductListProps {
  initialProducts: Product[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Update state to remove the deleted product
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <ScrollArea className="h-[700px] rounded-md border m-2 p-4">
      {products.map((product: Product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={() => handleDelete(product.id)}
        />
      ))}
    </ScrollArea>
  );
}
