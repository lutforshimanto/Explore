'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import FullwidthContainer from '@/components/common/containers/FullwidthContainer';
import SectionContainer from '@/components/common/containers/SectionContainer';
import Cover from '@/components/Cover';
import Viewer from '../Viewer';

interface Newsletter {
  id: string;
  title: string;
  coverPhoto: string;
  content: string;
  createdAt: string;
}

const NewsletterDetailPage: React.FC = () => {
  const { id } = useParams();
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchNewsletter = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/newsletters/${id}`
          );
          console.log(response.data);
          setNewsletter(response.data);
        } catch (error) {
          console.error('Error fetching newsletter:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchNewsletter();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!newsletter) {
    return <div>Newsletter not found</div>;
  }

  return (
    <FullwidthContainer>
      <SectionContainer>
        <div className="mb-4">
          <Cover url={newsletter.coverPhoto} setUrl={() => {}} />
        </div>
        <h1 className="text-3xl font-bold mb-4">{newsletter.title}</h1>
        <Viewer content={newsletter.content} />
      </SectionContainer>
    </FullwidthContainer>
  );
};

export default NewsletterDetailPage;
