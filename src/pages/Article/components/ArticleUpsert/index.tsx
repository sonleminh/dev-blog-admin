import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SuspenseLoader from '@/components/SuspenseLoader';
import CKEditor from '@/components/CKEditor';
import Upload from '@/components/Upload';
import Input from '@/components/Input';

import { useNotificationContext } from '@/contexts/NotificationContext';
import { useQueryClient } from '@tanstack/react-query';
import { ITagOptions } from '@/interfaces/IArticle';
import { QueryKeys } from '@/constants/query-key';
import {
  useCreateArticle,
  useGetArticleById,
  useGetArticleInitial,
  useUpdateArticle,
} from '@/services/article';
import { useFormik } from 'formik';

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  SxProps,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import { createSchema, updateSchema } from '../utils/schema/articleSchema';

const ArticleUpsert = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showNotification } = useNotificationContext();
  const [tags, setTags] = useState<ITagOptions[]>([]);

  const isEdit = !!id;

  const { data: initData } = useGetArticleInitial();
  const { data: articleData } = useGetArticleById(id as string);

  const { mutate: createArticleMutate, isPending: isCreatePending } =
    useCreateArticle();
  const { mutate: updateArticleMutate, isPending: isUpdatePending } =
    useUpdateArticle();

  const formik = useFormik({
    initialValues: {
      title: '',
      tags: '',
      summary: '',
      content: '',
      thumbnail_image: undefined,
      thumbnail_image_edit: undefined,
    },
    validationSchema: isEdit ? updateSchema : createSchema,
    validateOnChange: false,
    onSubmit(values) {
      const payload = {
        title: values.title,
        tags: tags,
        summary: values.summary,
        content: values.content,
        thumbnail_image: values.thumbnail_image,
      };
      if (isEdit) {
        updateArticleMutate(
          { _id: id, ...payload },
          {
            onSuccess() {
              queryClient.invalidateQueries({ queryKey: [QueryKeys.ARTICLE] });
              showNotification('Cập nhật bài viết thành công', 'success');
              navigate('/article');
            },
          }
        );
      } else {
        createArticleMutate(payload, {
          onSuccess() {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.ARTICLE] });
            showNotification('Tạo bài viết thành công', 'success');
            navigate('/article');
          },
        });
      }
    },
  });

  useEffect(() => {
    if (articleData) {
      formik.setFieldValue('title', articleData?.title);
      formik.setFieldValue('tags', articleData?.tags);
      formik.setFieldValue('summary', articleData?.summary);
      formik.setFieldValue('content', articleData?.content);
      formik.setFieldValue(
        'thumbnail_image_edit',
        articleData?.thumbnail_image
      );
      setTags(articleData?.tags);
    }
  }, [articleData, initData]);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const handlePlanTypeChange = (
    _: React.ChangeEvent<unknown>,
    val: ITagOptions[]
  ) => {
    setTags(val);
    formik.setFieldValue('tags', val);
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
            value={formik?.values.title}
            onChange={handleChangeValue}
          />
        </FormControl>
        <FormControl>
          <Autocomplete
            multiple
            fullWidth
            id='checkboxes-tags-demo'
            options={initData?.tags ?? []}
            disableCloseOnSelect
            value={tags}
            onChange={(e, val) => handlePlanTypeChange(e, val)}
            isOptionEqualToValue={(option, value) =>
              option?.value === value?.value
            }
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Tag...'
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  bgcolor: '#fff',
                  color: 'red',
                  borderRadius: '10px',
                }}
              />
            )}
            size='small'
          />
          <FormHelperText>
            <Box component={'span'} sx={helperTextStyle}>
              {formik.errors?.tags}
            </Box>
          </FormHelperText>
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
            value={formik?.values.summary}
            onChange={handleChangeValue}
          />
        </FormControl>
        <FormControl>
          <CKEditor
            onChange={(value: string) => formik.setFieldValue('content', value)}
            value={formik.values.content ?? ''}
            helperText={formik?.errors?.content}
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
            value={
              formik?.values.thumbnail_image ??
              formik.values.thumbnail_image_edit
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              formik.setFieldValue('thumbnail_image', e.target.files?.[0]);
            }}
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
      {(isCreatePending || isUpdatePending) && <SuspenseLoader />}
    </Card>
  );
};

export default ArticleUpsert;

const helperTextStyle: SxProps<Theme> = {
  color: 'red',
  fontSize: 13,
};
