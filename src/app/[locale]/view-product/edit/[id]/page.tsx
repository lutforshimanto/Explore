'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { CircleX } from 'lucide-react';

import { Link } from '@/i18n/routing';
import { UploadDropzone } from '@/utils/uploadthing';

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

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
  };

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/products/${id}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch product');
          }
          const data = await response.json();
          setProduct(data);
          setFormData({
            name: data.name,
            description: data.description,
            image: data.image,
            rate: data.rate,
            stock: data.stock,
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
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
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
          <label className="block mb-1">Product Image</label>
          {formData.image ? (
            <div className="mt-4 space-y-4 bg-gray-50 rounded-xl p-6 shadow-sm relative group">
              <button
                onClick={handleRemoveImage}
                type="button"
                className="absolute -top-2 -right-2 bg-gray-400 text-white w-6 h-6 rounded-full 
                flex items-center justify-center hover:bg-red-700 transition-all duration-200 
                shadow-md opacity-0 group-hover:opacity-100"
                aria-label="Remove image"
              >
                <CircleX size={24} />
              </button>
              <div className="mt-2">
                <Image
                  src={formData.image}
                  alt="Product Image"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </div>
          ) : (
            <UploadDropzone
              endpoint="imageUploader"
              className="border-dashed border-2 border-gray-300 rounded-lg"
              onClientUploadComplete={res => {
                setFormData(prev => ({ ...prev, image: res[0].ufsUrl }));
              }}
              onUploadError={(error: Error) => {
                console.log('Upload ERROR. Details: ', error.message);
              }}
            />
          )}
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
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Product
          </button>
          <Link
            href="/view-product"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 inline-block text-center"
          >
            Back to Products
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditProductPage;
