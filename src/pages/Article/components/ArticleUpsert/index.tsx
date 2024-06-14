import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Upload from '@/components/Upload';
import Input from '@/components/Input';
import { ChangeEvent, useEffect } from 'react';
import { useFormik } from 'formik';
import { useCreateArticle, useGetArticleById } from '@/services/article';
import { useQueryClient } from '@tanstack/react-query';
import { createSchema, updateSchema } from '../utils/schema/articleSchema';

const ArticleUpsert = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isEdit = !!id;

  const { data: articleData } = useGetArticleById(id as string);

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
      tag: '',
      summary: '',
      content: '',
      thumbnail_image: '',
      id_category: '',
    },
    validationSchema: isEdit ? updateSchema : createSchema,
    validateOnChange: false,
    onSubmit(values) {
      console.log(values);
      mutation.mutate(values);
    },
  });

  useEffect(() => {
    if (articleData) {
      formik.setFieldValue('title', articleData?.title);
      formik.setFieldValue('tag', articleData?.tag);
      formik.setFieldValue('id_category', articleData?.id_category);
      formik.setFieldValue('summary', articleData?.summary);
      formik.setFieldValue('content', articleData?.content);
      formik.setFieldValue('thumbnail_image', articleData?.thumbnail_image);
    }
  }, [articleData]);

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
            helperText={
              <Box component={'span'} sx={helperTextStyle}>
                {formik.errors.title}
              </Box>
            }
            value={formik.values.title}
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
            helperText={
              <Box component={'span'} sx={helperTextStyle}>
                {formik.errors.id_category}
              </Box>
            }
            value={formik.values.id_category}
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
            helperText={
              <Box component={'span'} sx={helperTextStyle}>
                {formik.errors.tag}
              </Box>
            }
            value={formik.values.tag}
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
            helperText={
              <Box component={'span'} sx={helperTextStyle}>
                {formik.errors.summary}
              </Box>
            }
            value={formik.values.summary}
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
            helperText={
              <Box component={'span'} sx={helperTextStyle}>
                {formik.errors.content}
              </Box>
            }
            value={formik.values.content}
            onChange={handleChangeValue}
          />
        </FormControl>
        <FormControl>
          <Upload
            title={'Ảnh'}
            required
            helperText={
              <Box component={'span'} sx={helperTextStyle}>
                {formik.errors.thumbnail_image}
              </Box>
            }
            value={formik?.values.thumbnail_image}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              formik.setFieldValue('thumbnail_image', e.target.files?.[0]);
            }}
            onClearValue={() => formik.setFieldValue('thumbnail_image', null)}
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

const helperTextStyle: SxProps<Theme> = {
  color: 'red',
  fontSize: 13,
};
