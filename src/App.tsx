import { useRoutes } from 'react-router-dom';
import routes from './routers';
import { ThemeProvider } from '@mui/material';
import { theme } from './themes/theme';

function App() {
  const content = useRoutes(routes);
  return <ThemeProvider theme={theme()}>{content}</ThemeProvider>;
}

export default App;
