'use client';

import type { PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';

import '@blocknote/core/style.css';
import '@blocknote/mantine/style.css';

interface ViewerProps {
  content?: string;
}

const Viewer: React.FC<ViewerProps> = ({ content }: { content?: string }) => {
  const editor = useCreateBlockNote({
    initialContent: content
      ? (JSON.parse(content) as PartialBlock[])
      : undefined,
    // Read-only editor doesn't need upload functionality
  });

  return (
    <div className="-mx-[54px] my-4">
      <BlockNoteView editor={editor} editable={false} theme="light" />
    </div>
  );
};

export default Viewer;
