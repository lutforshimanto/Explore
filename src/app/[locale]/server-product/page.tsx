// page.tsx (Server Component)
import React from 'react';

import { Link } from '@/i18n/routing';

import ProductList from './ProductList';

async function getProducts() {
  try {
    // Use Next.js revalidation for the entire products list - 60 seconds
    const response = await fetch('http://localhost:3000/api/products', {
      next: { revalidate: 60000 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function ProductPage() {
  const products = await getProducts();

  return (
    <div className="pt-10">
      <Link
        href="/view-product/create"
        className="bg-blue-500 text-white px-4 py-2 m-2 mb-2 font-bold rounded-md"
      >
        + Add new product
      </Link>
      {products.length === 0 && (
        <div className="text-red-500 m-2 p-2 bg-red-50 rounded">
          Failed to fetch products
        </div>
      )}
      <ProductList initialProducts={products} />
    </div>
  );
}
