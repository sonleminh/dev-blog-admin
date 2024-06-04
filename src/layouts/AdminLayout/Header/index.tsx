import { Box, Button, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Header = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        width: '100%',
        height: 80,
        bgcolor: '#fefeff',
        boxShadow:
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      }}>
      <Button endIcon={<KeyboardArrowDownIcon />} sx={{ mr: 4 }}>
        <Typography sx={{ fontWeight: 500, textTransform: 'none' }}>
          Son Le
        </Typography>
      </Button>
    </Box>
  );
};

export default Header;
