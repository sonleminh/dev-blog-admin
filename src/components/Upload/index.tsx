import { Box, Button, TextFieldProps, Typography } from '@mui/material';
import { ChangeEvent, ReactNode, useRef, useState } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

type TUploadProps = {
  title?: ReactNode;
  required?: boolean;
  onClearValue?: () => void;
  allowClearValue?: boolean;
} & TextFieldProps;

const Upload = ({
  title,
  required,
  disabled,
  onChange,
  helperText,
}: TUploadProps) => {
  const [previewSource, setPreviewSource] = useState<string>();

  const uploadInputRef = useRef<HTMLInputElement>(null);

  //   const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
  //     onChange?.(e);
  //   };
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      previewFile(file);
    }
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string);
    };
  };

  return (
    <Box>
      {title && (
        <Typography mb={1}>
          {title}
          {required && (
            <Typography component={'span'} color='red'>
              *
            </Typography>
          )}
        </Typography>
      )}
      <Box>
        <Box display={'flex'}>
          <input
            type='file'
            ref={uploadInputRef}
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
          <Button
            sx={{ width: '150px', height: '30px', mr: 5 }}
            variant='contained'
            disabled={disabled}
            onClick={() => {
              if (uploadInputRef.current) {
                uploadInputRef.current.click();
              }
            }}>
            <FileUploadIcon sx={{ mr: 1 }} />
            Upload
          </Button>
          {previewSource && (
            <>
              <Box
                sx={{
                  '.thumbnail': {
                    width: 200,
                    mr: 1,
                    border: '1px solid #aaaaaa',
                  },
                }}>
                <img src={previewSource} className='thumbnail' />
              </Box>
              <HighlightOffIcon
                onClick={() => setPreviewSource(undefined)}
                sx={{
                  fontSize: 28,
                  cursor: 'pointer',
                  ':hover': {
                    color: '#757575',
                  },
                }}
              />
            </>
          )}
        </Box>
        {helperText && (
          <Typography
            component={'span'}
            sx={{ color: 'red', ml: 1 }}
            className='MuiFormHelperText-root'>
            {helperText}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Upload;
