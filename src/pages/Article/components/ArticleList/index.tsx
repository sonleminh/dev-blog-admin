import { AddCircleOutlined, Edit } from '@mui/icons-material';

import {
  Box,
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
import { useQueryClient } from '@tanstack/react-query';
import { useGetArticleList } from '../../../../services/article';
import ActionButton from '../../../../components/ActionButton';
import ButtonWithTooltip from '../../../../components/ButtonWithTooltip';
import { useNavigate } from 'react-router-dom';

const ArticleList = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ['article'] });
  const { data } = useGetArticleList();
  return (
    <Card sx={{ mt: 3, borderRadius: 2 }}>
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
                      },
                    }}>
                    <img src={item.thumbnail_image} className='thumbnail' />
                  </Box>
                </TableCell>
                <TableCell>1</TableCell>
                <TableCell>12/21/2021</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <ActionButton>
                    <ButtonWithTooltip
                      color='primary'
                      fullWidth
                      onClick={() => navigate(`update/${item?._id}`)}
                      variant='outlined'
                      title='Chỉnh sửa'
                      placement='left'>
                      <Edit />
                    </ButtonWithTooltip>
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default ArticleList;
