import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonWithTooltip from '../../../../components/ButtonWithTooltip';
import ActionButton from '../../../../components/ActionButton';
import { useNotificationContext } from '@/contexts/NotificationContext';

import { useQueryClient } from '@tanstack/react-query';
import {
  useDeleteArticle,
  useGetArticleList,
} from '../../../../services/article';
import { QueryKeys } from '@/constants/query-key';
import { IQuery } from '@/interfaces/IQuery';

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
import useConfirmModal from '@/hooks/useModalConfirm';
import { truncateTextByLine } from '@/utils/css-helper.util';
import moment from 'moment';

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
                <TableCell align='center'>Tiêu đề</TableCell>
                <TableCell align='center'>Ảnh</TableCell>
                <TableCell>Tóm tắt</TableCell>
                <TableCell>Ngày đăng</TableCell>
                <TableCell align='center'>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.articleList?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>{index + 1}</TableCell>
                  <TableCell sx={{ width: '30%' }}>
                    <Typography sx={{ ...truncateTextByLine(2) }}>
                      {item.title}
                    </Typography>
                  </TableCell>
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
                  <TableCell>{item.summary}</TableCell>
                  <TableCell>
                    {moment(item.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
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
            onChange={(_: React.ChangeEvent<unknown>, newPage) => {
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
