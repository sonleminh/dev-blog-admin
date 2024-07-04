import { CKEditor as BaseEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from 'ckeditor5';
import { Editor } from '@ckeditor/ckeditor5-core';
import { FileLoader } from '@ckeditor/ckeditor5-upload/src/filerepository';

export const CKEditor = () => {
  function uploadAdapter(loader: FileLoader) {
    console.log('loaeder:', loader);
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then(async (file: File) => {
            const result = await mutateAsync({ image: file });
            if (result) {
              resolve({
                default: `${process.env.REACT_APP_HOST}/assets/${decodeURI(
                  result.path
                )}`,
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
    console.log(editor);
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: FileLoader
    ) => {
      return uploadAdapter(loader);
    };
  }
  return (
    <BaseEditor
      config={{
        extraPlugins: [uploadPlugin],
      }}
      editor={ClassicEditor}
    />
  );
};
