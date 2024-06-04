import {
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ArticleList = () => {
  return (
    <Card sx={{ mt: 3, borderRadius: 2 }}>
      <CardHeader
        action={
          <Button sx={{ bgcolor: '#000', color: '#fff', borderRadius: 2 }}>
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
        </Table>
      </TableContainer>
    </Card>
  );
};

export default ArticleList;
