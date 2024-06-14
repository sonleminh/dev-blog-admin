import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Upload from '@/components/Upload';
import Input from '@/components/Input';
import { ChangeEvent, useState } from 'react';
import { useFormik } from 'formik';
import { useCreateArticle } from '@/services/article';
import { useQueryClient } from '@tanstack/react-query';
// import Upload from '@/src/components/Upload';

const ArticleUpsert = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isEdit = !!id;
  const mutation = useCreateArticle({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article'] });
      navigate('/article');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      summary: '',
      content: '',
      thumbnail_image: '',
      id_category: '',
    },
    onSubmit(values) {
      mutation.mutate(values);
    },
  });

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  return (
    <Card sx={{ mt: 3, borderRadius: 2 }}>
      <CardHeader
        title={
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            {isEdit ? 'Sửa bài viết' : 'Thêm bài viết'}
          </Typography>
        }
      />
      <Divider />

      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl>
          <Input
            id='title'
            label='Tiêu đề'
            name='title'
            variant='filled'
            required
            onChange={handleChangeValue}
          />
        </FormControl>
        <FormControl>
          <Input
            id='id_category'
            label='Danh mục'
            name='id_category'
            variant='filled'
            required
            onChange={handleChangeValue}
          />
        </FormControl>
        <FormControl>
          <Input
            id='tag'
            label='Tag'
            name='tag'
            variant='filled'
            required
            onChange={handleChangeValue}
          />
        </FormControl>
        <FormControl>
          <Input
            id='summary'
            label='Tóm tắt'
            name='summary'
            variant='filled'
            required
            onChange={handleChangeValue}
          />
        </FormControl>
        <FormControl>
          <Input
            id='content'
            label='Nội dung'
            name='content'
            variant='filled'
            required
            onChange={handleChangeValue}
          />
        </FormControl>
        <FormControl>
          <Upload
            title={'Ảnh'}
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              formik.setFieldValue('thumbnail_image', e.target.files?.[0])
            }
          />
        </FormControl>
        <Box sx={{ textAlign: 'end' }}>
          <Button onClick={() => navigate('/article')} sx={{ mr: 2 }}>
            Trở lại
          </Button>
          <Button variant='contained' onClick={() => formik.handleSubmit()}>
            Thêm
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArticleUpsert;
