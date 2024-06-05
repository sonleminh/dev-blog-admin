import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LockIcon from '@mui/icons-material/Lock';
import { useSignInMutate } from '../../services/auth';

const SignIn = () => {
  const signInMutation = useSignInMutate();

  console.log(2, process.env.REACT_APP_HOST);

  const handleSignIn = () => {
    signInMutation.mutate({ username: 'admin', password: 'admin' });
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 500,
          p: '40px 44px',
          borderRadius: 2,
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        }}>
        <Typography sx={{ fontSize: 24, fontWeight: 500 }}>
          Quản trị viên
        </Typography>
        <Box width={'100%'}>
          <FormControl fullWidth variant='standard'>
            <InputLabel>Tài khoản</InputLabel>
            <TextField
              variant='outlined'
              fullWidth
              name='username'
              // onChange={handleChangeValue}
              // helperText={formik.errors.username}
              placeholder='username@gmail.vn'
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Person2OutlinedIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mt: 6, borderRadius: 4 }}
            />
          </FormControl>
          <FormControl fullWidth variant='standard'>
            <InputLabel>Mật khẩu</InputLabel>
            <TextField
              variant='outlined'
              fullWidth
              type='password'
              name='password'
              // onChange={handleChangeValue}
              // helperText={formik.errors.username}
              placeholder='*******'
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mt: 6, borderRadius: 4 }}
            />
          </FormControl>
          <Button
            variant='contained'
            fullWidth
            sx={{ height: 48, mt: 3 }}
            onClick={handleSignIn}>
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
