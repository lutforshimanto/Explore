'use client';

import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import { useEffect, useState } from 'react';

import '@blocknote/core/style.css';
import '@blocknote/mantine/style.css';
import { uploadFiles } from '@/utils/uploadthing';

interface NewsletterEditorProps {
  initialContent: string;
  // eslint-disable-next-line no-unused-vars
  onSave: (content: string) => void;
}

const NewsletterEditor: React.FC<NewsletterEditorProps> = ({
  // eslint-disable-next-line react/prop-types
  initialContent,
  // eslint-disable-next-line react/prop-types
  onSave,
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: 'paragraph',
        content: [],
      },
    ],
    uploadFile: async (file: File) => {
      const [res] = await uploadFiles('imageUploader', { files: [file] });
      return res.ufsUrl;
    },
  });

  useEffect(() => {
    const processContent = async () => {
      if (!initialContent) return;

      try {
        try {
          const parsedContent = JSON.parse(initialContent);
          editor.replaceBlocks(editor.document, parsedContent);
        } catch (jsonError) {
          const blocks = await editor.tryParseHTMLToBlocks(initialContent);
          editor.replaceBlocks(editor.document, blocks);
        }
      } catch (error) {
        console.error('Error loading content into editor:', error);
      }
    };

    processContent();
  }, [initialContent, editor]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const blocks = editor.document;
      const serializedContent = JSON.stringify(blocks);
      await onSave(serializedContent);
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="-mx-[54px]">
        <BlockNoteView editor={editor} editable={true} theme="light" />
      </div>
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default NewsletterEditor;
