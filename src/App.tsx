import { useRoutes } from 'react-router-dom';
import routes from './routers';
import { ThemeProvider } from '@mui/material';
import { theme } from './themes/theme';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  const content = useRoutes(routes);
  return (
    <ThemeProvider theme={theme()}>
      <AuthContextProvider>{content}</AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
