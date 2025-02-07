'use client';
import FullwidthContainer from '@/components/common/containers/FullwidthContainer';
import SectionContainer from '@/components/common/containers/SectionContainer';
import PhotoCard from '@/components/PhotoCard/PhotoCard';
import PhotoCardSkeleton from '@/components/PhotoCard/PhotoCardSkeleton';
import PostCard from '@/components/PostCard/PostCard';
import PostCardSkeleton from '@/components/PostCard/PostCardSkeleton';
import { ActionSearchBar } from '@/components/ui/action-search-bar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useQuery, useMutation } from '@tanstack/react-query';
// import { RootState } from "@/redux/store";
// import { useSelector } from "react-redux";

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
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
}

export async function fetchPhotos(): Promise<Photo[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/photos');
  return res.json();
}

export default function HomePage() {
  // const { count } = useSelector((store: RootState) => store.counter.counter);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const {
    data: photos,
    isLoading: isLoadingPhotos,
    isError: isErrorPhotos,
    error: errorPhotos,
  } = useQuery({
    queryKey: ['photos'],
    queryFn: fetchPhotos,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  // if (isLoading || isLoadingPhotos) {
  //   return (
  //     <FullwidthContainer className="bg-pink-200">
  //       <SectionContainer className="bg-blue-200 dark:bg-slate-800 py-10 text-center">
  //         <Tabs defaultValue="posts" className="bg-transparent">
  //           <TabsList className="grid grid-cols-2 mb-4 w-full items-start bg-transparent">
  //             <TabsTrigger
  //               value="posts"
  //               className="px-4 py-2 text-[10px] md:text-sm lg:text-sm font-medium text-[#959EA6] bg-transparent border-b-2 border-[#BBC6D2] hover:text-[#3B577B] hover:bg-gray-200 data-[state=active]:text-[#3B577B] data-[state=active]:border-[#3B577B] data-[state=active]:bg-transparent"
  //             >
  //               Posts
  //             </TabsTrigger>
  //             <TabsTrigger
  //               value="photos"
  //               className="px-4 py-2 text-[10px] md:text-sm lg:text-sm font-medium text-[#959EA6] bg-transparent border-b-2 border-[#BBC6D2] hover:text-[#3B577B] hover:bg-gray-200 data-[state=active]:text-[#3B577B] data-[state=active]:border-[#3B577B] data-[state=active]:bg-transparent"
  //             >
  //               Photos
  //             </TabsTrigger>
  //           </TabsList>

  //           <TabsContent value="posts">
  //             <ScrollArea className="h-[500px] rounded-md border m-2">
  //               {[...Array(6)].map((_, index) => (
  //                 <PostCardSkeleton key={index} />
  //               ))}
  //             </ScrollArea>
  //           </TabsContent>

  //           <TabsContent value="photos">
  //             <ScrollArea className="h-[500px] rounded-md border m-2">
  //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  //                 {[...Array(6)].map((_, index) => (
  //                   <PhotoCardSkeleton key={index} />
  //                 ))}
  //               </div>
  //             </ScrollArea>
  //           </TabsContent>
  //         </Tabs>
  //       </SectionContainer>
  //     </FullwidthContainer>
  //   );
  // }

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
          <Tabs defaultValue="posts" className="bg-transparent">
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
              <ActionSearchBar />
              {isLoading ? (
                <ScrollArea className="h-[500px] rounded-md border m-2">
                  {[...Array(6)].map((_, index) => (
                    <PostCardSkeleton key={index} />
                  ))}
                </ScrollArea>
              ) : (
                <ScrollArea className="h-[500px] rounded-md border m-2">
                  {data
                    ?.slice(0, 50)
                    .map((post: Post) => <PostCard post={post} />)}
                </ScrollArea>
              )}
            </TabsContent>

            <TabsContent value="photos">
              Enjoy the following photos:
              <ActionSearchBar />
              {isLoadingPhotos ? (
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
