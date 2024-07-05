import { useAdminUploadImage } from '@/services/helper/upload';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor } from '@ckeditor/ckeditor5-core';

import { CKEditor as BaseEditor } from '@ckeditor/ckeditor5-react';
import { Box, Typography } from '@mui/material';
import {
  FileLoader,
  UploadAdapter,
  UploadResponse,
} from '@ckeditor/ckeditor5-upload/src/filerepository';

interface ICKEditorProps {
  onChange?: (value: string) => void;
  value?: string;
  helperText?: string;
}

interface CustomUploadResponse extends UploadResponse {
  default: string;
}

export const CKEditor = ({ onChange, value, helperText }: ICKEditorProps) => {
  const { mutateAsync } = useAdminUploadImage();
  function uploadAdapter(loader: FileLoader): UploadAdapter {
    return {
      upload: () => {
        return new Promise<CustomUploadResponse>((resolve, reject) => {
          loader.file.then(async (file: File | null) => {
            if (file === null) {
              reject(new Error('No file to upload'));
              return;
            }
            const result = await mutateAsync({ image: file });
            if (result) {
              resolve({
                default: result.path,
              });
            } else {
              reject();
            }
          });
        });
      },
    };
  }

  function uploadPlugin(editor: Editor) {
    if (editor.plugins.has('FileRepository')) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return uploadAdapter(loader);
      };
    }
  }
  return (
    <Box
      sx={{
        ['.ck-editor__editable_inline']: {
          minHeight: 400,
        },
      }}>
      <BaseEditor
        config={{
          extraPlugins: [uploadPlugin],
        }}
        editor={ClassicEditor}
        onChange={(_, editor) => {
          const data = editor.getData();
          onChange?.(data);
        }}
        data={value}
      />
      {helperText && (
        <Box>
          <Typography sx={{ color: 'red' }}>{helperText}</Typography>
        </Box>
      )}
    </Box>
  );
};
