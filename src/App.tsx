import { useRoutes } from 'react-router-dom';
import routes from './routers';
import { ThemeProvider } from '@mui/material';
import { theme } from './themes/theme';
import { AuthContextProvider } from './contexts/AuthContext';
import { NotificationContextProvider } from './contexts/NotificationContext';

function App() {
  const content = useRoutes(routes);
  return (
    <ThemeProvider theme={theme()}>
      <NotificationContextProvider>
        <AuthContextProvider>{content}</AuthContextProvider>
      </NotificationContextProvider>
    </ThemeProvider>
  );
}

export default App;
