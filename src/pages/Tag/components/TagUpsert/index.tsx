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
import {
  useCreateArticle,
  useGetArticleById,
  useUpdateArticle,
} from '@/services/article';
import { useQueryClient } from '@tanstack/react-query';
import { createSchema, updateSchema } from '../utils/schema/articleSchema';
import { QueryKeys } from '@/constants/query-key';
import SuspenseLoader from '@/components/SuspenseLoader';
import { useNotificationContext } from '@/contexts/NotificationContext';
import { useCreateTag } from '@/services/tag';

const TagUpsert = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showNotification } = useNotificationContext();

  const isEdit = !!id;

  const { data: articleData } = useGetArticleById(id as string);

  const { mutate: createTag, isPending: isCreatePending } = useCreateTag();
  const { mutate: updateArticleMutate, isPending: isUpdatePending } =
    useUpdateArticle();

  const formik = useFormik({
    initialValues: {
      value: '',
      label: '',
    },
    // validationSchema: isEdit ? updateSchema : createSchema,
    validateOnChange: false,
    onSubmit(values) {
      if (isEdit) {
        // const payload = {
        //   title: values.label,
        // };
        // // if (!((payload.thumbnail_image as unknown) instanceof File)) {
        // //   delete payload.thumbnail_image;
        // // }
        // // console.log(payload);
        // updateArticleMutate(
        //   { _id: id, ...payload },
        //   {
        //     onSuccess() {
        //       queryClient.invalidateQueries({ queryKey: [QueryKeys.ARTICLE] });
        //       showNotification('Cập nhật bài viết thành công', 'success');
        //       navigate('/article');
        //     },
        //   }
        // );
      } else {
        createTag(values, {
          onSuccess() {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.TAG] });
            showNotification('Tạo tag thành công', 'success');
            navigate('/tag');
          },
        });
      }
    },
  });

  useEffect(() => {
    if (articleData) {
      formik.setFieldValue('title', articleData?.title);
      formik.setFieldValue('tag', articleData?.tag);
      formik.setFieldValue('summary', articleData?.summary);
      formik.setFieldValue('content', articleData?.content);
      formik.setFieldValue('thumbnail_image', articleData?.thumbnail_image);
      // formik.setFieldValue(
      //   'thumbnail_image_edit',
      //   articleData?.thumbnail_image
      // );
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
            id='value'
            label='Value'
            name='value'
            variant='filled'
            required
            helperText={
              <Box component={'span'} sx={helperTextStyle}>
                {formik.errors.value}
              </Box>
            }
            value={formik?.values.value}
            onChange={handleChangeValue}
          />
        </FormControl>
        <FormControl>
          <Input
            id='label'
            label='Label'
            name='label'
            variant='filled'
            required
            helperText={
              <Box component={'span'} sx={helperTextStyle}>
                {formik.errors.label}
              </Box>
            }
            value={formik?.values.label}
            onChange={handleChangeValue}
          />
        </FormControl>
        <Box sx={{ textAlign: 'end' }}>
          <Button onClick={() => navigate('/tag')} sx={{ mr: 2 }}>
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

export default TagUpsert;

const helperTextStyle: SxProps<Theme> = {
  color: 'red',
  fontSize: 13,
};
