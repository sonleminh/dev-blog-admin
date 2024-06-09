import LockIcon from '@mui/icons-material/Lock';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { ChangeEvent, useState } from 'react';
import * as yup from 'yup';
import { useSignInMutate } from '../../services/auth';
const schema = yup.object({
  username: yup
    .string()
    .required('Trường này không được để trống!')
    .max(50, 'Không được quá 50 ký tự!'),
  password: yup.string().required('Trường này không được để trống!'),
});
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const signInMutation = useSignInMutate();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit(values) {
      signInMutation.mutate(values);
    },
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    formik.setFieldValue(name, value);
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
          <FormControl fullWidth variant='standard' sx={{ maxHeight: 100 }}>
            <InputLabel>Tài khoản</InputLabel>
            <TextField
              variant='outlined'
              size='small'
              fullWidth
              name='username'
              placeholder='username@gmail.com'
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Person2OutlinedIcon />
                  </InputAdornment>
                ),
              }}
              helperText={
                <Typography
                  component={'span'}
                  sx={{ fontSize: 13, color: 'red' }}>
                  {formik.errors.username}
                </Typography>
              }
              onChange={handleChange}
              sx={{ mt: 6, borderRadius: 4 }}
            />
          </FormControl>
          <FormControl fullWidth variant='standard'>
            <InputLabel>Mật khẩu</InputLabel>
            <TextField
              variant='outlined'
              size='small'
              fullWidth
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='*******'
              autoFocus
              helperText={
                <Typography
                  component={'span'}
                  sx={{ fontSize: 13, color: 'red' }}>
                  {formik.errors.password}
                </Typography>
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <LockIcon sx={{ fontSize: 20 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position='start'>
                    {formik.values.password ? (
                      <Box
                        onClick={() => setShowPassword(!showPassword)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}>
                        {showPassword ? (
                          <Visibility sx={{ fontSize: 20 }} />
                        ) : (
                          <VisibilityOff sx={{ fontSize: 20 }} />
                        )}
                      </Box>
                    ) : (
                      <></>
                    )}
                  </InputAdornment>
                ),
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  formik.handleSubmit();
                }
              }}
              onChange={handleChange}
              sx={{ mt: 6, borderRadius: 4 }}
            />
          </FormControl>
          <Button
            variant='contained'
            fullWidth
            sx={{ height: 48, mt: 3 }}
            disabled={!formik.values.username && !formik.values.password}
            onClick={() => formik.handleSubmit()}>
            Đăng nhập
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
