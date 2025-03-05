'use client';

import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import { useEffect } from 'react';

import '@blocknote/core/style.css';
import '@blocknote/mantine/style.css';

interface ViewerProps {
  content?: string;
}

const Viewer: React.FC<ViewerProps> = ({ content }: { content?: string }) => {
  // Initialize with default content - a single empty paragraph
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: 'paragraph',
        content: [],
      },
    ],
  });

  useEffect(() => {
    const processContent = async () => {
      if (!content) return;

      try {
        // Try parsing as JSON first
        try {
          const parsedContent = JSON.parse(content);
          editor.replaceBlocks(editor.document, parsedContent);
        } catch (jsonError) {
          // If JSON parsing fails, treat as HTML
          const blocks = await editor.tryParseHTMLToBlocks(content);
          editor.replaceBlocks(editor.document, blocks);
        }
      } catch (error) {
        console.error('Error loading content into viewer:', error);
      }
    };

    processContent();
  }, [content, editor]);

  return (
    <div className="-mx-[54px] my-4">
      <BlockNoteView editor={editor} editable={false} theme="light" />
    </div>
  );
};

export default Viewer;
