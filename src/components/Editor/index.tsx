import { useCallback, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { useAdminUploadImage } from '@/services/helper/upload';
import 'react-quill/dist/quill.snow.css';
// import uploadToCloudinary from "./upload";

export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface EditorProps {
  value?: string;
  onChange?: (changes: EditorContentChanged) => void;
}

export default function Editor(props: EditorProps) {
  const [value, setValue] = useState<string>('');
  console.log('value:', value);
  const reactQuillRef = useRef<ReactQuill>(null);
  const { mutateAsync } = useAdminUploadImage();

  const onChange = (content: string) => {
    setValue(content);
  };

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
          const imageUrl = response.path;

          const quill = reactQuillRef?.current?.getEditor();

          if (quill) {
            const range = quill.getSelection()?.index;
            if (range) {
              quill.insertEmbed(range, 'image', imageUrl);
              //   quill.setSelection(range.index + 1);
              quill.setSelection({ index: range + 1, length: 0 });
            }
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
      theme='snow'
      placeholder='Start writing...'
      modules={{
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
      formats={[
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'code-block',
      ]}
      value={value}
      onChange={onChange}
    />
  );
}
