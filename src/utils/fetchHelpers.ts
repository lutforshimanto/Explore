import { api } from '@/lib/api';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export async function fetchPosts(): Promise<Post[]> {
  await new Promise(resolve => setTimeout(resolve, 5000));
  const response = await api.get<Post[]>('/posts');
  return response.data;
}

export async function fetchPhotos(): Promise<Photo[]> {
  await new Promise(resolve => setTimeout(resolve, 5000));
  const response = await api.get<Photo[]>('/photos');
  return response.data;
}
