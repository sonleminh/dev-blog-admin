import { AddCircleOutlined, Edit, Delete } from '@mui/icons-material';

import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
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

const ArticleList = () => {
  const navigate = useNavigate();
  const { data } = useGetArticleList();

  const { confirmModal, showConfirmModal } = useConfirmModal();

  const { mutate: deleteArticleMutate } = useDeleteArticle();

  const handleDeleteArticle = (id: string) => {
    deleteArticleMutate(id, { onSuccess: (data) => console.log(data) });
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
                <TableCell>STT</TableCell>
                <TableCell>Tiêu đề</TableCell>
                <TableCell>Ảnh</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell>Ngày đăng</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.articleList?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
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
                  <TableCell sx={{ textAlign: 'center' }}>
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
      </Card>
      {confirmModal()}
    </Card>
  );
};

export default ArticleList;
