'use client';

import { uploadFiles } from '@/utils/uploadthing';

import type { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHtml } from '@/redux/newsletterhtml';
import type { RootState } from '@/redux/store';

import '@blocknote/core/style.css';
import '@blocknote/mantine/style.css';

interface EditorProps {
  //   onChange: () => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor: React.FC<EditorProps> = ({
  //   onChange,
  initialContent,
  editable = true,
}) => {
  const dispatch = useDispatch();
  const { html } = useSelector((state: RootState) => state.newsletterHtml);

  // const [editorContent, setEditorContent] = useState<PartialBlock[]>([]);

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: async (file: File) => {
      const [res] = await uploadFiles('imageUploader', { files: [file] });
      return res.ufsUrl;
    },
  });

  // async function loadInitialHTML() {
  //   const blocks = await editor.tryParseHTMLToBlocks(html);
  //   editor.replaceBlocks(editor.document, blocks);
  // }

  // loadInitialHTML();

  const onChange = async () => {
    const newHtml = await editor.blocksToHTMLLossy(editor.document);
    dispatch(setHtml(newHtml));
  };

  const initialLoad = async (editor: BlockNoteEditor, html: string) => {
    if (!html) return; // Avoid running if there's no stored HTML

    try {
      const blocks = await editor.tryParseHTMLToBlocks(html);
      editor.replaceBlocks(editor.document, blocks);
    } catch (error) {
      console.error('Error parsing HTML to blocks:', error);
    }
  };

  useEffect(() => {
    initialLoad(editor, html); // Load stored HTML when component mounts
  }, []);

  // useEffect(() => {
  //   const convertHtmlToBlocks = async () => {
  //     try {
  //       const blocks = html ? await editor.tryParseHTMLToBlocks(html) : []; // Fallback to empty
  //       setEditorContent(blocks);
  //     } catch (error) {
  //       console.error('Error parsing HTML to blocks:', error);
  //       setEditorContent([]); // Fallback if parsing fails
  //     }
  //   };

  //   convertHtmlToBlocks();
  // }, [html]);

  return (
    <div className="-mx-[54px] my-4">
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme="light"
        onChange={onChange}
      />
    </div>
  );
};

export default Editor;
