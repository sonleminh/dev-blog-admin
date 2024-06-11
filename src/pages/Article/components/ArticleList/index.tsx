import AddCircleIcon from '@mui/icons-material/AddCircle';
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
import { useQueryClient } from '@tanstack/react-query';
import { useGetArticleList } from '../../../../services/article';

const ArticleList = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ['article'] });
  const { data } = useGetArticleList();
  return (
    <Card sx={{ mt: 3, borderRadius: 2 }}>
      <CardHeader
        action={
          <Button
            variant='contained'
            // sx={{ bgcolor: '#000', color: '#fff', borderRadius: 2 }}
          >
            <AddCircleIcon />
          </Button>
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
                    <img
                      src='https://people.com/thmb/n6EdTmvAL3TkkAqrT47caD6tUu8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(723x121:725x123)/wisp-the-cat-from-tiktok-092823-1-74797b02afe7475295e1478b2cdf2883.jpg'
                      className='thumbnail'
                    />
                  </Box>
                </TableCell>
                <TableCell>1</TableCell>
                <TableCell>12/21/2021</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default ArticleList;
