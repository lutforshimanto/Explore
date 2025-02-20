'use client'; // this registers <Editor> as a Client Component
import '@blocknote/core/fonts/inter.css';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCallback, useEffect, useState } from 'react';
import SectionContainer from '../containers/SectionContainer';
import { useDispatch, useSelector } from 'react-redux';
import { setHtml } from '@/redux/newsletterhtml';
import type { RootState } from '@/redux/store';

// Our <Editor> component we can reuse later
export default function Editor() {
  const dispatch = useDispatch();
  const { html } = useSelector((state: RootState) => state.newsletterHtml);
  // const [html, setHTML] = useState<string>('');

  // Creates a new editor instance with some initial content.
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: html || 'Start writing your newsletter...',
            styles: {
              bold: true,
            },
          },
        ],
      },
    ],
  });

  const onChange = async () => {
    // Converts the editor's contents from Block objects to HTML and store to state.
    const html = await editor.blocksToHTMLLossy(editor.document);

    console.log(html, typeof html);

    dispatch(setHtml(html));
  };

  useEffect(() => {
    // on mount, trigger initial conversion of the initial content to html
    onChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Renders the editor instance using a React component.
  return (
    <SectionContainer className="py-10">
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-bold mb-2">Edit</h2>
        <BlockNoteView editor={editor} onChange={onChange} />
      </div>
      <div className={'item bordered mt-10'}>
        <div>Output (HTML):</div>
        <div className="item bordered">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </SectionContainer>
  );
}
