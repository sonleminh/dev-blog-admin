import { Alert, AlertColor, Snackbar } from '@mui/material';
import { ReactNode, createContext, useState } from 'react';

interface INotificationContext {
  showNotification: (message: ReactNode, severity?: AlertColor) => void;
}

const NotificateContext = createContext<INotificationContext | undefined>(
  undefined
);

export const NotificatioContextnProvider: FC = ({ children }) => {
  const [message, setMessage] = useState<ReactNode>('');
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [open, isOpen] = useState(false);

  const showNotification = (
    message: ReactNode,
    severity: AlertColor = 'success'
  ) => {
    isOpen(true);
    setMessage(message);
    setSeverity(severity);
  };
  return (
    <NotificateContext.Provider value={{ showNotification }}>
      {children}
      {open && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert severity={severity} variant='filled'>
            {message}
          </Alert>
        </Snackbar>
      )}
    </NotificateContext.Provider>
  );
};
