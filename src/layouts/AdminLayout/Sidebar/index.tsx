import HeaderLogo from '../../../components/sharing/header/HeaderLogo';
import { Box, Button, Divider, List, ListItem } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 290,
        height: '100%',
        bgcolor: 'black',
      }}>
      <Box
        sx={{
          width: 130,
          m: '28px auto',
          border: '1px solid #fff',
          borderRadius: 2,
        }}>
        <HeaderLogo />
      </Box>
      <Divider sx={{ bgcolor: '#a1a1a1' }} />
      <List>
        <ListItem>
          <Button
            component={NavLink}
            to='/article'
            startIcon={<ArticleIcon />}
            sx={{
              color: '#fff',
              '&.active': {
                color: 'pink',
              },
            }}>
            Bài viết
          </Button>
        </ListItem>
        <ListItem>
          <Button
            component={NavLink}
            to='/category'
            startIcon={<ListAltIcon />}
            sx={{
              color: '#fff',
              '&.active': {
                color: 'pink',
              },
            }}>
            Danh mục
          </Button>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
