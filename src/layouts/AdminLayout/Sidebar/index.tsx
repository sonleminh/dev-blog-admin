import HeaderLogo from '../../../components/Header/HeaderLogo';
import { Box, Button, Divider, List, ListItem } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuList = [
    {
      link: '/dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />,
    },
    {
      link: '/article',
      label: 'Bài viết',
      icon: <ArticleIcon />,
    },
    {
      link: '/tag',
      label: 'Tag',
      icon: <ListAltIcon />,
    },
  ];
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 260,
        height: '100%',
        bgcolor: 'black',
      }}>
      <Box
        sx={{
          width: 140,
          m: '28px auto',
          border: '1px solid #fff',
          borderRadius: 2,
        }}>
        <HeaderLogo />
      </Box>
      <Divider sx={{ bgcolor: '#a1a1a1' }} />
      <List sx={{ mt: 2 }}>
        {menuList?.map((item, index) => (
          <ListItem key={index}>
            <Button
              disableRipple
              component={NavLink}
              to={item.link}
              startIcon={item.icon}
              sx={{
                width: '100%',
                color: '#eeeeee',
                justifyContent: 'start',
                textTransform: 'none',
                fontSize: 16,
                fontWeight: 500,
                '&.active': {
                  color: '#000',
                  background: '#fff',
                },
              }}>
              {item.label}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
