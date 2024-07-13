import { useAdminUploadImage } from '@/services/helper/upload';
import { useCallback, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface EditorProps {
  value?: string;
  onChange?: (changes: EditorContentChanged) => void;
}

const Editor = (props: EditorProps) => {
  const [value, setValue] = useState<string>('');
  const reactQuillRef = useRef<ReactQuill>(null);
  const { mutateAsync } = useAdminUploadImage();

  const onChange = (content: string) => {
    setValue(content);
  };

  console.log('value:', value);

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input?.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        // Replace with your backend URL
        const response = await mutateAsync({ image: file });

        if (response) {
          const imageUrl = response; // Assuming the backend returns { url: 'https://path/to/image' }

          const quill = reactQuillRef.current;
          if (quill) {
            const range = quill.getEditorSelection();
            range &&
              quill
                .getEditor()
                .insertEmbed(range.index, 'image', imageUrl.path);
          }
        } else {
          console.error('Image upload failed.');
        }
      }
    };
  }, []);
  return (
    <ReactQuill
      ref={reactQuillRef}
      modules={{
        // toolbar: ['bold', 'italic', 'underline', 'strike', 'image'],
        toolbar: {
          container: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
              { list: 'ordered' },
              { list: 'bullet' },
              { indent: '-1' },
              { indent: '+1' },
            ],
            ['link', 'image', 'video'],
            ['code-block'],
            ['clean'],
          ],
          handlers: {
            image: imageHandler,
          },
        },
        clipboard: {
          matchVisual: false,
        },
      }}
      theme='snow'
      placeholder='Start writing...'
      value={value}
      onChange={onChange}
    />
  );
};

export default Editor;
