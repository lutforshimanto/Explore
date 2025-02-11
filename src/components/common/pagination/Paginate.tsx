'use client';

import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PostCard from '@/components/PostCard/PostCard';
import PhotoCard from '@/components/PhotoCard/PhotoCard';
import PostCardSkeleton from '@/components/PostCard/PostCardSkeleton';
import PhotoCardSkeleton from '@/components/PhotoCard/PhotoCardSkeleton';
import PaginationPrevious from './PaginationPrevious';
import PaginationNext from './PaginationNext';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface PaginatedContentProps {
  activeTab: 'posts' | 'photos';
  isLoading: boolean;
  isLoadingPhotos: boolean;
  filteredContent: (Post | Photo)[];
  itemsPerPage: number;
  onItemsPerPageChange?: (value: string) => void;
}

const Paginate: React.FC<PaginatedContentProps> = ({
  activeTab,
  isLoading,
  isLoadingPhotos,
  filteredContent,
  itemsPerPage,
  onItemsPerPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPageState, setItemsPerPageState] = useState(
    itemsPerPage.toString()
  );

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleItemsPerPage = (value: string) => {
    setItemsPerPageState(value);
    setCurrentPage(0); // Reset to first page when changing items per page
    onItemsPerPageChange?.(value);
  };

  const getPaginatedData = () => {
    const offset = currentPage * parseInt(itemsPerPageState);
    return filteredContent.slice(offset, offset + parseInt(itemsPerPageState));
  };

  const pageCount = Math.ceil(
    filteredContent.length / parseInt(itemsPerPageState)
  );

  return (
    <div className="space-y-4 p-2">
      <div className="min-h-[600px]">
        {activeTab === 'posts' && (
          <>
            {isLoading ? (
              <ScrollArea className="h-[500px] rounded-md border m-2">
                {[...Array(parseInt(itemsPerPageState))].map((_, index) => (
                  <PostCardSkeleton key={index} />
                ))}
              </ScrollArea>
            ) : (
              <ScrollArea className="h-[500px] rounded-md border m-2">
                {getPaginatedData().map(post => (
                  <PostCard key={post.id} post={post as Post} />
                ))}
              </ScrollArea>
            )}
          </>
        )}

        {activeTab === 'photos' && (
          <>
            {isLoadingPhotos ? (
              <ScrollArea className="h-[500px] rounded-md border m-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(parseInt(itemsPerPageState))].map((_, index) => (
                    <PhotoCardSkeleton key={index} />
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <ScrollArea className="h-[500px] rounded-md border m-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {getPaginatedData().map(photo => (
                    <PhotoCard key={photo.id} photo={photo as Photo} />
                  ))}
                </div>
              </ScrollArea>
            )}
          </>
        )}
      </div>

      <div className="flex flex-col justify-start gap-2 md:gap-0 md:flex-row md:justify-between md:items-center">
        <div className="flex gap-3 items-center">
          <span className="text-sm text-gray-500">Items per page</span>
          <Select value={itemsPerPageState} onValueChange={handleItemsPerPage}>
            <SelectTrigger
              disabled={filteredContent.length < 11}
              aria-label="Items per page"
              className="w-[100px] lg:w-[180px]"
            >
              <SelectValue placeholder={itemsPerPageState} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="36">36</SelectItem>
              <SelectItem value="48">48</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ReactPaginate
          previousLabel={<PaginationPrevious />}
          nextLabel={<PaginationNext />}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          renderOnZeroPageCount={null}
          containerClassName="flex items-center justify-center gap-2"
          pageClassName="px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          previousClassName="px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          nextClassName="px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
          activeClassName="!bg-blue-500 !text-white hover:!bg-blue-600 border-blue-500"
          disabledClassName="opacity-50 cursor-not-allowed hover:bg-transparent"
          breakLabel="..."
          breakClassName="px-3 py-1"
          nextAriaLabel="Go to next page"
          previousAriaLabel="Go to previous page"
          ariaLabelBuilder={page => `Go to page ${page}`}
          prevRel="prev"
          nextRel="next"
          extraAriaContext="pagination navigation"
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
        />
      </div>
    </div>
  );
};

export default Paginate;
