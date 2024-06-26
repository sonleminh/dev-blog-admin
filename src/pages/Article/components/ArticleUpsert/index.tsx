import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SxProps,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Upload from '@/components/Upload';
import Input from '@/components/Input';
import { ChangeEvent, useEffect, useLayoutEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  useCreateArticle,
  useGetArticleById,
  useGetArticleInitial,
  useUpdateArticle,
} from '@/services/article';
import { useQueryClient } from '@tanstack/react-query';
import { createSchema, updateSchema } from '../utils/schema/articleSchema';
import { QueryKeys } from '@/constants/query-key';
import SuspenseLoader from '@/components/SuspenseLoader';
import { useNotificationContext } from '@/contexts/NotificationContext';

export interface IListOptions {
  value: string;
  label: string;
}

const ArticleUpsert = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showNotification } = useNotificationContext();

  const isEdit = !!id;

  const { data: initData } = useGetArticleInitial();
  const { data: articleData, isFetching: isFetchingInitData } =
    useGetArticleById(id as string);

  // const INIT_TAGS = initData?.tags;

  const [tags, setTags] = useState<IListOptions[]>([]);

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
    // validationSchema: isEdit ? updateSchema : createSchema,
    validateOnChange: false,
    onSubmit(values) {
      const payload = {
        title: values.title,
        tags: tags.map((item) => item?.value),
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

  function getLabelByValue(initData: IListOptions[], value: string) {
    const tag = initData.find((tag) => tag.value === value);
    if (tag) {
      return tag.label;
    }
  }

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
      // formik.setFieldValue(
      //   'thumbnail_image_edit',
      //   articleData?.thumbnail_image
      // );

      if (articleData && initData) {
        const types: IListOptions[] = [];
        articleData?.tags?.forEach((tagData: string) => {
          if (
            initData?.tags?.find((tag: IListOptions) => tag.value === tagData)
          ) {
            types.push({
              value: tagData,
              label: getLabelByValue(initData?.tags, tagData)!,
            });
          }
        });
        setTags(types);
      }
    }
  }, [articleData, initData]);

  // useLayoutEffect(() => {
  //   if (formik.values.tag === '' && initData && !isFetchingInitData) {
  //     formik.setFieldValue('tag', initData?.tags?.[0]);
  //   }
  // }, [initData, isFetchingInitData, formik.values.tag]);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const handlePlanTypeChange = (_, val: IListOptions[]) => {
    setTags(val);
    formik.setFieldValue('tag', val);
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
            value={tags}
            multiple
            fullWidth
            id='checkboxes-tags-demo'
            options={initData?.tags ?? []}
            disableCloseOnSelect
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
          <FormHelperText sx={{ mt: { xs: 0.5 }, ml: 0 }}>
            <Box component={'span'} sx={{ color: 'red' }}>
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
            value={formik?.values.content}
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
            value={
              formik?.values.thumbnail_image ??
              formik.values.thumbnail_image_edit
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              formik.setFieldValue('thumbnail_image', e.target.files?.[0]);
            }}
            // onClearValue={() => formik.setFieldValue('thumbnail_image', null)}
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
