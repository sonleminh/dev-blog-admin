import { AddCircleOutlined, Edit, Delete } from '@mui/icons-material';

import {
  Box,
  Card,
  CardHeader,
  Divider,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../../../../components/ActionButton';
import ButtonWithTooltip from '../../../../components/ButtonWithTooltip';
import {
  useDeleteArticle,
  useGetArticleList,
} from '../../../../services/article';
import useConfirmModal from '@/hooks/useModalConfirm';
import { useNotificationContext } from '@/contexts/NotificationContext';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/constants/query-key';
import { useState } from 'react';
import { IQuery } from '@/interfaces/IQuery';

const ArticleList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [query, setQuery] = useState<IQuery>({
    limit: 10,
    page: 1,
  });

  const { data } = useGetArticleList({ ...query });

  const { showNotification } = useNotificationContext();

  const { confirmModal, showConfirmModal } = useConfirmModal();

  const { mutate: deleteArticleMutate } = useDeleteArticle();

  const handleChangeQuery = (object: Partial<IQuery>) => {
    setQuery((prev) => ({ ...prev, ...object }));
  };

  const handleDeleteArticle = (id: string) => {
    showNotification('Ok', 'error');
    deleteArticleMutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.ARTICLE] });
        showNotification('Xóa bài viết thành công', 'success');
      },
    });
  };

  return (
    <Card sx={{ mt: 3, borderRadius: 2 }}>
      <Card>
        <CardHeader
          action={
            <ButtonWithTooltip
              variant='contained'
              onClick={() => navigate('create')}
              title='Thêm gói cước'>
              <AddCircleOutlined />
            </ButtonWithTooltip>
          }
          title={
            <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
              Danh sách bài viết
            </Typography>
          }
        />
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>STT</TableCell>
                <TableCell>Tiêu đề</TableCell>
                <TableCell align='center'>Ảnh</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell>Ngày đăng</TableCell>
                <TableCell align='center'>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.articleList?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>{index + 1}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell align='center'>
                    <Box
                      sx={{
                        '.thumbnail': {
                          width: 100,
                          height: 100,
                          objectFit: 'contain',
                        },
                      }}>
                      <img src={item.thumbnail_image} className='thumbnail' />
                    </Box>
                  </TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>12/21/2021</TableCell>
                  <TableCell align='center'>
                    <ActionButton>
                      <Box mb={1}>
                        <ButtonWithTooltip
                          color='primary'
                          onClick={() => navigate(`update/${item?._id}`)}
                          variant='outlined'
                          title='Chỉnh sửa'
                          placement='left'>
                          <Edit />
                        </ButtonWithTooltip>
                      </Box>
                      <Box>
                        <ButtonWithTooltip
                          color='error'
                          onClick={() => {
                            showConfirmModal({
                              title: 'Bạn có muốn xóa bài viết này không?',
                              cancelText: 'Hủy bỏ',
                              onOk: () => handleDeleteArticle(item?._id),
                            });
                          }}
                          variant='outlined'
                          title='Xoá'
                          placement='left'>
                          <Delete />
                        </ButtonWithTooltip>
                      </Box>
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        <Box
          p={2}
          sx={{
            ['.MuiPagination-ul']: {
              justifyContent: 'center',
            },
            textAlign: 'right',
          }}>
          <Typography>Tổng cộng: {data?.total ?? 0}</Typography>
          <Pagination
            count={Math.ceil((data?.total ?? 0) / query.limit!)}
            page={query.page ?? 0}
            onChange={(e, newPage) => {
              handleChangeQuery({ page: newPage });
            }}
            defaultPage={query.page ?? 0}
            showFirstButton
            showLastButton
          />
        </Box>
      </Card>
      {confirmModal()}
    </Card>
  );
};

export default ArticleList;
