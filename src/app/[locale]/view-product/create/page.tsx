'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { CircleX } from 'lucide-react';

import { Link } from '@/i18n/routing';
import { UploadDropzone } from '@/utils/uploadthing';

const CreateProductPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    rate: 0,
    stock: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:3000/api/products', formData);
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
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
            required
          />
        </div>
        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            value={formData.image}
            onChange={e => setFormData({ ...formData, image: e.target.value })}
            className="w-full p-2 border rounded"
            required
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
            min="0"
            max="5"
            required
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
            min="0"
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Creating...' : 'Create Product'}
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

export default CreateProductPage;
