import { Box, Container, Typography, styled } from '@mui/material';

const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  return (
    <FooterWrapper className='footer-wrapper'>
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems='center'
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent='space-between'>
        <Box>
          <Typography sx={{ color: 'rgba(34, 51, 84, 0.7)', fontSize: 15 }}>
            &copy; Dev Blog Admin Dashboard
          </Typography>
        </Box>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
