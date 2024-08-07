import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ActionButton from '../../../../components/ActionButton';
import ButtonWithTooltip from '../../../../components/ButtonWithTooltip';

import { useNotificationContext } from '@/contexts/NotificationContext';
import useConfirmModal from '@/hooks/useModalConfirm';

import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/constants/query-key';
import { IQuery } from '@/interfaces/IQuery';
import { useDeleteTag, useGetTagList } from '@/services/tag';
import moment from 'moment';

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
import { AddCircleOutlined, Edit, Delete } from '@mui/icons-material';

const TagList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [query, setQuery] = useState<IQuery>({
    limit: 3,
    page: 1,
  });

  const { data } = useGetTagList();

  const { showNotification } = useNotificationContext();

  const { confirmModal, showConfirmModal } = useConfirmModal();

  const { mutate: deleteTagMutate } = useDeleteTag();

  const handleChangeQuery = (object: Partial<IQuery>) => {
    setQuery((prev) => ({ ...prev, ...object }));
  };

  const handleDeleteTag = (id: string) => {
    showNotification('Ok', 'error');
    deleteTagMutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.ARTICLE] });
        showNotification('Xóa tag thành công', 'success');
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
              Danh sách tag
            </Typography>
          }
        />
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>STT</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Label</TableCell>
                <TableCell>Ngày tạo</TableCell>
                <TableCell align='center'>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.tags?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>{index + 1}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>{item.label}</TableCell>
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
                              title: 'Bạn có muốn xóa tag này không?',
                              cancelText: 'Hủy bỏ',
                              onOk: () => handleDeleteTag(item?._id),
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

export default TagList;
