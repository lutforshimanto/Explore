'use client';

import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '@/redux/tabs';
import { RootState } from '@/redux/store';

import FullwidthContainer from '@/components/common/containers/FullwidthContainer';
import SectionContainer from '@/components/common/containers/SectionContainer';
import PhotoCard from '@/components/PhotoCard/PhotoCard';
import PhotoCardSkeleton from '@/components/PhotoCard/PhotoCardSkeleton';
import PostCard from '@/components/PostCard/PostCard';
import PostCardSkeleton from '@/components/PostCard/PostCardSkeleton';
import { Action, ActionSearchBar } from '@/components/ui/action-search-bar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Image } from 'lucide-react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export async function fetchPosts(): Promise<Post[]> {
  await new Promise(resolve => setTimeout(resolve, 5000));
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
}

export async function fetchPhotos(): Promise<Photo[]> {
  await new Promise(resolve => setTimeout(resolve, 5000));
  const res = await fetch('https://jsonplaceholder.typicode.com/photos');
  return res.json();
}

const transformPostsToActions = (posts: Post[]): Action[] => {
  const postActions: Action[] = posts.map(post => ({
    id: post.id.toString(),
    label: truncateText(post.title, 15),
    icon: <FileText className="h-4 w-4 text-blue-500" />,
    description: truncateText(post.body, 20),
    type: 'posts' as const,
  }));

  const viewPhotosAction: Action = {
    id: 'photos',
    label: 'View Photos',
    icon: <Image className="h-4 w-4 text-green-500" />,
    description: 'Switch to photos view',
    type: 'photos' as const,
  };

  return [...postActions, viewPhotosAction];
};

const transformPhotosToActions = (photos: Photo[]): Action[] => {
  const photoActions: Action[] = photos.slice(0, 100).map(photo => ({
    id: photo.id.toString(),
    label: truncateText(photo.title, 15),
    icon: <Image className="h-4 w-4 text-green-500" />,
    description: `Album ${photo.albumId}`,
    type: 'photos' as const,
  }));

  const viewPostsAction: Action = {
    id: 'posts',
    label: 'View Posts',
    icon: <FileText className="h-4 w-4 text-blue-500" />,
    description: 'Switch to posts view',
    type: 'posts' as const,
  };

  return [...photoActions, viewPostsAction];
};

const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

export default function HomePage() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);

  const handleTabChange = (value: 'posts' | 'photos') => {
    dispatch(setActiveTab(value));

    if (value === 'posts') {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } else {
      queryClient.invalidateQueries({ queryKey: ['photos'] });
    }
  };

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const {
    data: photos,
    isLoading: isLoadingPhotos,
    isError: isErrorPhotos,
    error: errorPhotos,
  } = useQuery({
    queryKey: ['photos'],
    queryFn: fetchPhotos,
  });

  const getActions = (): Action[] => {
    if (activeTab === 'posts' && posts) {
      return transformPostsToActions(posts);
    } else if (activeTab === 'photos' && photos) {
      return transformPhotosToActions(photos);
    }
    return [];
  };

  const actions = getActions();

  if (isError || isErrorPhotos) {
    return (
      <FullwidthContainer>
        <SectionContainer>
          {isError && <div>Error: {(error as Error).message}</div>}
          {isErrorPhotos && <div>Error: {(errorPhotos as Error).message}</div>}
        </SectionContainer>
      </FullwidthContainer>
    );
  }

  return (
    <>
      <FullwidthContainer className="bg-pink-200">
        <SectionContainer className="bg-blue-200 dark:bg-slate-800 py-10 text-center">
          <Tabs
            defaultValue={activeTab}
            onValueChange={value =>
              handleTabChange(value as 'posts' | 'photos')
            }
            className="bg-transparent"
          >
            <TabsList className="grid grid-cols-2 mb-4 w-full items-start bg-transparent">
              <TabsTrigger
                value="posts"
                className="px-4 py-2 text-[10px] md:text-sm lg:text-sm font-medium text-[#959EA6] bg-transparent border-b-2 border-[#BBC6D2] hover:text-[#3B577B] hover:bg-gray-200 data-[state=active]:text-[#3B577B] data-[state=active]:border-[#3B577B] data-[state=active]:bg-transparent"
              >
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="photos"
                className="px-4 py-2 text-[10px] md:text-sm lg:text-sm font-medium text-[#959EA6] bg-transparent border-b-2 border-border-[#BBC6D2] hover:text-[#3B577B] hover:bg-gray-200 data-[state=active]:text-[#3B577B] data-[state=active]:border-[#3B577B] data-[state=active]:bg-transparent"
              >
                Photos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts">
              Enjoy the following posts:
              <ActionSearchBar
                onTabChange={handleTabChange}
                activeTab={activeTab}
                actions={actions}
              />
              {isLoading && activeTab === 'posts' ? (
                <ScrollArea className="h-[500px] rounded-md border m-2">
                  {[...Array(6)].map((_, index) => (
                    <PostCardSkeleton key={index} />
                  ))}
                </ScrollArea>
              ) : (
                <ScrollArea className="h-[500px] rounded-md border m-2">
                  {posts
                    ?.slice(0, 50)
                    .map((post: Post) => <PostCard post={post} />)}
                </ScrollArea>
              )}
            </TabsContent>

            <TabsContent value="photos">
              Enjoy the following photos:
              <ActionSearchBar
                onTabChange={handleTabChange}
                activeTab={activeTab}
                actions={actions}
              />
              {isLoadingPhotos && activeTab === 'photos' ? (
                <ScrollArea className="h-[500px] rounded-md border m-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, index) => (
                      <PhotoCardSkeleton key={index} />
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <ScrollArea className="h-[500px] rounded-md border m-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {photos
                      ?.slice(0, 50)
                      .map(photo => <PhotoCard key={photo.id} photo={photo} />)}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>
          </Tabs>
        </SectionContainer>
      </FullwidthContainer>
    </>
  );
}
