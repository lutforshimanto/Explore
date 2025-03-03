import { Product } from '../types';

import ProductCard from './ProductCard';

async function getProducts() {
  const response = await fetch('http://localhost:3000/api/products', {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json() as Promise<Product[]>;
}

export default async function ProductList() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
