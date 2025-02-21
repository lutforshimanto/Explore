'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FullwidthContainer from '@/components/common/containers/FullwidthContainer';
import SectionContainer from '@/components/common/containers/SectionContainer';
import { ScrollArea } from '@/components/ui/scroll-area';
import NewsletterCard from './NewsletterCard';
import NewsletterCardSkeleton from './NewsletterCardSkeleton';

interface Newsletter {
  id: string;
  title: string;
  coverPhoto: string;
  createdAt: string;
}

const NewsletterPage: React.FC = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/newsletters'
        );

        console.log(response.data);
        setNewsletters(response.data);
      } catch (error) {
        console.error('Error fetching newsletters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/newsletters/${id}`);
      setNewsletters(newsletters.filter(newsletter => newsletter.id !== id));
    } catch (error) {
      console.error('Error deleting newsletter:', error);
    }
  };

  return (
    <div className="pt-10">
      <FullwidthContainer>
        <SectionContainer>
          <ScrollArea className="h-[700px] rounded-md border m-2 p-4">
            {loading ? (
              <>
                <NewsletterCardSkeleton />
                <NewsletterCardSkeleton />
                <NewsletterCardSkeleton />
              </>
            ) : (
              newsletters.map(newsletter => (
                <NewsletterCard
                  key={newsletter.id}
                  newsletter={newsletter}
                  onDelete={handleDelete}
                />
              ))
            )}
          </ScrollArea>
        </SectionContainer>
      </FullwidthContainer>
    </div>
  );
};

export default NewsletterPage;
