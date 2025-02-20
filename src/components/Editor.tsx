'use client';

import { uploadFiles } from '@/utils/uploadthing';

import type { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';

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

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: async (file: File) => {
      const [res] = await uploadFiles('imageUploader', { files: [file] });
      return res.ufsUrl;
    },
  });

  const onChange = async () => {
    // Converts the editor's contents from Block objects to HTML and store to state.
    const html = await editor.blocksToHTMLLossy(editor.document);

    console.log(html, typeof html);

    dispatch(setHtml(html));
  };

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
