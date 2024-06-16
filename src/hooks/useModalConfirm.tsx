import { Cancel } from '@mui/icons-material';
import { Box, Button, Modal, Typography } from '@mui/material';
import { ReactNode, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export interface IShowConfirmModal {
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  title?: ReactNode;
  content?: ReactNode;
  showBtnOk?: boolean;
  showBtnCancel?: boolean;
  hideIconBtnOk?: boolean;
  hideIconBtnCancel?: boolean;
}

const useConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState<IShowConfirmModal>();

  const showConfirmModal = ({
    title = '',
    content = '',
    okText = 'OK',
    cancelText = 'Hủy bỏ',
    onOk = () => setIsOpen(false),
    onCancel = () => setIsOpen(false),
    showBtnCancel = true,
    showBtnOk = true,
    hideIconBtnOk = false,
    hideIconBtnCancel = false,
  }: IShowConfirmModal) => {
    setIsOpen(true);
    setModalProps({
      title,
      content,
      okText,
      cancelText,
      onOk: () => {
        onOk?.();
        setIsOpen(false);
      },
      onCancel: () => {
        onCancel?.();
        setIsOpen(false);
      },
      showBtnCancel,
      showBtnOk,
      hideIconBtnOk,
      hideIconBtnCancel,
    });
  };

  const confirmModal = () => {
    return (
      <Modal open={isOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}>
          <Typography variant='h3' mb={4}>
            {modalProps?.title}
          </Typography>
          <Typography id='modal-modal-description' sx={{ my: 2 }}>
            {modalProps?.content}
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            {modalProps?.showBtnCancel && (
              <Button
                variant='contained'
                color='error'
                sx={{ mr: 2 }}
                onClick={() => modalProps?.onCancel?.()}>
                {!modalProps.hideIconBtnCancel && <Cancel sx={{ mr: 1 }} />}{' '}
                {modalProps?.cancelText}
              </Button>
            )}
            {modalProps?.showBtnOk && (
              <Button variant='contained' onClick={() => modalProps?.onOk?.()}>
                {!modalProps.hideIconBtnOk && (
                  <CheckCircleIcon sx={{ mr: 1 }} />
                )}{' '}
                {modalProps?.okText}
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    );
  };

  return { showConfirmModal, confirmModal };
};

export default useConfirmModal;
