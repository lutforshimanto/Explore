'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

import ProductCardSkeleton from '../../ProductCardSkeleton';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  rate: number;
  stock: number;
  createdAt: string;
}

const EditProductPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    rate: 0,
    stock: 0,
  });

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/products/${id}`
          );
          setProduct(response.data);
          setFormData({
            name: response.data.name,
            description: response.data.description,
            image: response.data.image,
            rate: response.data.rate,
            stock: response.data.stock,
          });
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/products/${id}`, formData);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) {
    return <ProductCardSkeleton />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={e =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            value={formData.image}
            onChange={e => setFormData({ ...formData, image: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Rate</label>
          <input
            type="number"
            value={formData.rate}
            onChange={e =>
              setFormData({ ...formData, rate: parseFloat(e.target.value) })
            }
            className="w-full p-2 border rounded"
            step="0.1"
          />
        </div>
        <div>
          <label className="block mb-1">Stock</label>
          <input
            type="number"
            value={formData.stock}
            onChange={e =>
              setFormData({ ...formData, stock: parseInt(e.target.value) })
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
