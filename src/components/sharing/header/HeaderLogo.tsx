import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const HeaderLogo = () => {
  return (
    <Box component={Link} to={'/'}>
      <svg
        width='130'
        height='45'
        viewBox='0 0 130 45'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <rect width='130' height='45' rx='8' fill='black' />
        <path
          d='M21.46 27.88C21.3133 27.88 21.2 27.8467 21.12 27.78L15.96 24.42C15.7733 24.3 15.6333 24.1467 15.54 23.96C15.46 23.7733 15.42 23.6067 15.42 23.46C15.42 23.3133 15.46 23.1467 15.54 22.96C15.6333 22.7733 15.7733 22.62 15.96 22.5L21.12 19.12C21.2 19.0667 21.3133 19.04 21.46 19.04C21.7267 19.04 21.9867 19.16 22.24 19.4C22.4933 19.6267 22.62 19.9133 22.62 20.26C22.62 20.58 22.5133 20.8 22.3 20.92L18.42 23.46L22.3 25.98C22.5133 26.1133 22.62 26.34 22.62 26.66C22.62 27.0067 22.4933 27.3 22.24 27.54C21.9867 27.7667 21.7267 27.88 21.46 27.88Z'
          fill='white'
        />
        <path
          d='M32.16 29.18C31.5333 29.18 30.9533 28.9867 30.42 28.6C29.8867 28.2133 29.46 27.7067 29.14 27.08C28.82 26.4533 28.66 25.7867 28.66 25.08V23.44C28.66 22.6933 28.82 22.0133 29.14 21.4C29.46 20.7867 29.8867 20.3 30.42 19.94C30.9533 19.5667 31.5467 19.38 32.2 19.38C32.8267 19.38 33.36 19.54 33.8 19.86C34.24 20.1667 34.5667 20.5133 34.78 20.9V14.76C34.78 14.52 34.9067 14.3267 35.16 14.18C35.4133 14.0333 35.7267 13.96 36.1 13.96C36.46 13.96 36.76 14.0333 37 14.18C37.24 14.3267 37.36 14.52 37.36 14.76V28.16C37.36 28.3733 37.24 28.5667 37 28.74C36.76 28.9133 36.46 29 36.1 29C35.78 29 35.5067 28.9133 35.28 28.74C35.0533 28.5667 34.94 28.3733 34.94 28.16V27.6C34.74 28.0133 34.38 28.38 33.86 28.7C33.3533 29.02 32.7867 29.18 32.16 29.18ZM32.98 26.92C33.3267 26.92 33.6333 26.8267 33.9 26.64C34.1667 26.44 34.38 26.2267 34.54 26C34.7 25.76 34.78 25.5733 34.78 25.44V23.44C34.78 23.0667 34.6867 22.7467 34.5 22.48C34.3267 22.2133 34.1 22.0067 33.82 21.86C33.5533 21.7133 33.28 21.64 33 21.64C32.68 21.64 32.38 21.7333 32.1 21.92C31.8333 22.0933 31.62 22.3133 31.46 22.58C31.3133 22.8467 31.24 23.1333 31.24 23.44V25.08C31.24 25.3867 31.3133 25.68 31.46 25.96C31.62 26.24 31.8333 26.4733 32.1 26.66C32.3667 26.8333 32.66 26.92 32.98 26.92ZM43.8511 29.18C42.9044 29.18 42.0644 29.0133 41.3311 28.68C40.6111 28.3333 40.0444 27.8533 39.6311 27.24C39.2178 26.6133 39.0111 25.8933 39.0111 25.08V23.38C39.0111 22.66 39.2044 22 39.5911 21.4C39.9911 20.7867 40.5178 20.3 41.1711 19.94C41.8378 19.5667 42.5778 19.38 43.3911 19.38C44.1378 19.38 44.8178 19.54 45.4311 19.86C46.0578 20.18 46.5644 20.62 46.9511 21.18C47.3378 21.74 47.5311 22.3933 47.5311 23.14C47.5311 23.7133 47.4378 24.1267 47.2511 24.38C47.0644 24.62 46.8244 24.7733 46.5311 24.84C46.2511 24.8933 45.9578 24.92 45.6511 24.92H41.5911V25.22C41.5911 25.7933 41.8044 26.26 42.2311 26.62C42.6711 26.9667 43.2378 27.14 43.9311 27.14C44.3711 27.14 44.7378 27.0733 45.0311 26.94C45.3244 26.8067 45.5778 26.68 45.7911 26.56C46.0044 26.44 46.2044 26.38 46.3911 26.38C46.5911 26.38 46.7644 26.4467 46.9111 26.58C47.0578 26.7133 47.1711 26.8733 47.2511 27.06C47.3311 27.2333 47.3711 27.3867 47.3711 27.52C47.3711 27.7467 47.2244 27.9933 46.9311 28.26C46.6511 28.5133 46.2444 28.7333 45.7111 28.92C45.1911 29.0933 44.5711 29.18 43.8511 29.18ZM41.5911 23.4H44.5111C44.7378 23.4 44.8911 23.3667 44.9711 23.3C45.0644 23.22 45.1111 23.0733 45.1111 22.86C45.1111 22.5533 45.0244 22.28 44.8511 22.04C44.6911 21.8 44.4778 21.6133 44.2111 21.48C43.9578 21.3467 43.6711 21.28 43.3511 21.28C43.0444 21.28 42.7578 21.3467 42.4911 21.48C42.2244 21.6 42.0044 21.78 41.8311 22.02C41.6711 22.2467 41.5911 22.52 41.5911 22.84V23.4ZM52.8781 29.22C52.6115 29.22 52.3648 29.18 52.1381 29.1C51.9115 29.02 51.7648 28.9067 51.6981 28.76L48.2781 20.84C48.2515 20.8 48.2248 20.7467 48.1981 20.68C48.1848 20.6 48.1781 20.5333 48.1781 20.48C48.1781 20.28 48.2715 20.1 48.4581 19.94C48.6581 19.7667 48.8915 19.6333 49.1581 19.54C49.4248 19.4333 49.6715 19.38 49.8981 19.38C50.0581 19.38 50.2048 19.4133 50.3381 19.48C50.4848 19.5467 50.5848 19.66 50.6381 19.82L52.8781 25.62L55.0981 19.86C55.1515 19.6867 55.2448 19.5667 55.3781 19.5C55.5115 19.42 55.6648 19.38 55.8381 19.38C56.0115 19.38 56.2315 19.4333 56.4981 19.54C56.7781 19.6333 57.0248 19.7667 57.2381 19.94C57.4515 20.1133 57.5581 20.3 57.5581 20.5C57.5581 20.5667 57.5515 20.6267 57.5381 20.68C57.5248 20.7333 57.5048 20.7867 57.4781 20.84L54.0381 28.76C53.9715 28.9067 53.8248 29.02 53.5981 29.1C53.3715 29.18 53.1315 29.22 52.8781 29.22ZM63.8684 29.18C63.2418 29.18 62.6751 29.02 62.1684 28.7C61.6618 28.38 61.3018 28.0133 61.0884 27.6V28.16C61.0884 28.3733 60.9751 28.5667 60.7484 28.74C60.5351 28.9133 60.2618 29 59.9284 29C59.5684 29 59.2684 28.9133 59.0284 28.74C58.7884 28.5667 58.6684 28.3733 58.6684 28.16V14.76C58.6684 14.52 58.7884 14.3267 59.0284 14.18C59.2684 14.0333 59.5684 13.96 59.9284 13.96C60.3018 13.96 60.6151 14.0333 60.8684 14.18C61.1218 14.3267 61.2484 14.52 61.2484 14.76V20.9C61.4618 20.5133 61.7884 20.1667 62.2284 19.86C62.6684 19.54 63.2018 19.38 63.8284 19.38C64.4818 19.38 65.0751 19.5667 65.6084 19.94C66.1418 20.3 66.5684 20.7867 66.8884 21.4C67.2084 22.0133 67.3684 22.6933 67.3684 23.44V25.08C67.3684 25.7867 67.2084 26.4533 66.8884 27.08C66.5684 27.7067 66.1418 28.2133 65.6084 28.6C65.0884 28.9867 64.5084 29.18 63.8684 29.18ZM63.0484 26.92C63.3684 26.92 63.6618 26.8333 63.9284 26.66C64.1951 26.4733 64.4018 26.24 64.5484 25.96C64.7084 25.68 64.7884 25.3867 64.7884 25.08V23.44C64.7884 23.1333 64.7084 22.8467 64.5484 22.58C64.4018 22.3133 64.1951 22.0933 63.9284 21.92C63.6618 21.7333 63.3618 21.64 63.0284 21.64C62.7484 21.64 62.4684 21.7133 62.1884 21.86C61.9218 22.0067 61.6951 22.2133 61.5084 22.48C61.3351 22.7467 61.2484 23.0667 61.2484 23.44V25.44C61.2484 25.5733 61.3284 25.76 61.4884 26C61.6484 26.2267 61.8618 26.44 62.1284 26.64C62.4084 26.8267 62.7151 26.92 63.0484 26.92ZM70.4795 29C70.1062 29 69.7995 28.9133 69.5595 28.74C69.3195 28.5667 69.1995 28.3733 69.1995 28.16V14.76C69.1995 14.52 69.3195 14.3267 69.5595 14.18C69.7995 14.0333 70.1062 13.96 70.4795 13.96C70.8395 13.96 71.1462 14.0333 71.3995 14.18C71.6529 14.3267 71.7795 14.52 71.7795 14.76V28.16C71.7795 28.3733 71.6529 28.5667 71.3995 28.74C71.1462 28.9133 70.8395 29 70.4795 29ZM77.9209 29.18C77.1476 29.18 76.4343 28.9933 75.7809 28.62C75.1276 28.2333 74.6009 27.7267 74.2009 27.1C73.8009 26.4733 73.6009 25.8 73.6009 25.08V23.44C73.6009 22.72 73.7943 22.0533 74.1809 21.44C74.5676 20.8133 75.0876 20.3133 75.7409 19.94C76.4076 19.5667 77.1343 19.38 77.9209 19.38C78.7076 19.38 79.4276 19.5667 80.0809 19.94C80.7476 20.3 81.2743 20.7867 81.6609 21.4C82.0609 22.0133 82.2609 22.6933 82.2609 23.44V25.08C82.2609 25.7867 82.0609 26.4533 81.6609 27.08C81.2609 27.7067 80.7276 28.2133 80.0609 28.6C79.4076 28.9867 78.6943 29.18 77.9209 29.18ZM77.9209 26.92C78.2409 26.92 78.5343 26.8333 78.8009 26.66C79.0676 26.4867 79.2809 26.26 79.4409 25.98C79.6009 25.6867 79.6809 25.3867 79.6809 25.08V23.44C79.6809 23.1333 79.6009 22.8467 79.4409 22.58C79.2809 22.3133 79.0676 22.0933 78.8009 21.92C78.5476 21.7333 78.2543 21.64 77.9209 21.64C77.6009 21.64 77.3076 21.7267 77.0409 21.9C76.7743 22.0733 76.5609 22.3 76.4009 22.58C76.2543 22.8467 76.1809 23.1333 76.1809 23.44V25.08C76.1809 25.3867 76.2543 25.6867 76.4009 25.98C76.5609 26.26 76.7743 26.4867 77.0409 26.66C77.3076 26.8333 77.6009 26.92 77.9209 26.92ZM87.6423 33.42C86.8557 33.42 86.1223 33.3067 85.4423 33.08C84.7757 32.8667 84.2357 32.5467 83.8223 32.12C83.4223 31.6933 83.2223 31.1867 83.2223 30.6C83.2223 30.0933 83.3623 29.66 83.6423 29.3C83.9223 28.9533 84.269 28.68 84.6823 28.48C84.429 28.36 84.2223 28.2 84.0623 28C83.9157 27.7867 83.8423 27.52 83.8423 27.2C83.8423 26.8267 83.9357 26.5267 84.1223 26.3C84.3223 26.06 84.569 25.84 84.8623 25.64C84.4623 25.3333 84.149 24.9667 83.9223 24.54C83.709 24.1 83.6023 23.62 83.6023 23.1V22.68C83.6023 22.0267 83.7623 21.4533 84.0823 20.96C84.4157 20.4667 84.8757 20.08 85.4623 19.8C86.0623 19.52 86.749 19.38 87.5223 19.38C87.9623 19.38 88.3757 19.4333 88.7623 19.54C89.149 19.6333 89.4957 19.7733 89.8023 19.96C90.029 19.4267 90.2423 19.0667 90.4423 18.88C90.6423 18.6933 90.8357 18.6 91.0223 18.6C91.3423 18.6 91.589 18.6933 91.7623 18.88C91.949 19.0667 92.0423 19.24 92.0423 19.4C92.0423 19.52 92.009 19.6267 91.9423 19.72C91.889 19.8133 91.8157 19.8933 91.7223 19.96C91.589 20.04 91.4357 20.14 91.2623 20.26C91.089 20.3667 90.929 20.52 90.7823 20.72C91.0223 20.9867 91.1957 21.2867 91.3023 21.62C91.4223 21.94 91.4823 22.2933 91.4823 22.68V23.1C91.4823 23.74 91.3157 24.3133 90.9823 24.82C90.649 25.3133 90.1823 25.7067 89.5823 26C88.9823 26.2933 88.2957 26.44 87.5223 26.44C87.0423 26.44 86.609 26.38 86.2223 26.26C86.1557 26.3133 86.0957 26.3733 86.0423 26.44C86.0023 26.5067 85.9823 26.58 85.9823 26.66C85.9823 26.8867 86.129 27.0467 86.4223 27.14C86.7157 27.2333 87.089 27.3067 87.5423 27.36C87.9957 27.4133 88.4757 27.4867 88.9823 27.58C89.5023 27.66 89.989 27.7933 90.4423 27.98C90.8957 28.1667 91.269 28.4467 91.5623 28.82C91.8557 29.18 92.0023 29.6667 92.0023 30.28C92.0023 31.0267 91.789 31.6267 91.3623 32.08C90.949 32.5467 90.409 32.8867 89.7423 33.1C89.089 33.3133 88.389 33.42 87.6423 33.42ZM87.6023 31.76C88.1223 31.76 88.5623 31.6333 88.9223 31.38C89.2957 31.1267 89.4823 30.7867 89.4823 30.36C89.4823 30.08 89.4023 29.8533 89.2423 29.68C89.0823 29.5067 88.8623 29.3733 88.5823 29.28C88.3157 29.2 88.0223 29.1333 87.7023 29.08C87.3823 29.04 87.0623 29 86.7423 28.96C86.4223 29.1067 86.1623 29.2933 85.9623 29.52C85.7623 29.7467 85.6623 30.02 85.6623 30.34C85.6623 30.78 85.849 31.1267 86.2223 31.38C86.609 31.6333 87.069 31.76 87.6023 31.76ZM87.5623 24.88C88.0023 24.88 88.349 24.7133 88.6023 24.38C88.8557 24.0467 88.9823 23.62 88.9823 23.1V22.68C88.9823 22.1867 88.8557 21.7733 88.6023 21.44C88.3623 21.1067 88.009 20.94 87.5423 20.94C87.089 20.94 86.7357 21.1067 86.4823 21.44C86.2423 21.7733 86.1223 22.1867 86.1223 22.68V23.08C86.1223 23.5867 86.2423 24.0133 86.4823 24.36C86.7357 24.7067 87.0957 24.88 87.5623 24.88Z'
          fill='white'
        />
        <path
          d='M97.3 29.8C97.0333 29.8 96.8067 29.7067 96.62 29.52C96.4467 29.3333 96.36 29.1333 96.36 28.92C96.36 28.8 96.3867 28.6867 96.44 28.58L103.64 14C103.773 13.72 104.013 13.58 104.36 13.58C104.6 13.58 104.827 13.6667 105.04 13.84C105.253 14 105.36 14.22 105.36 14.5C105.36 14.62 105.333 14.7333 105.28 14.84L98.08 29.36C98.0267 29.4933 97.92 29.6 97.76 29.68C97.6133 29.76 97.46 29.8 97.3 29.8ZM107.667 27.88C107.413 27.88 107.153 27.7667 106.887 27.54C106.633 27.3 106.507 27.0067 106.507 26.66C106.507 26.34 106.62 26.1133 106.847 25.98L110.707 23.46L106.847 20.92C106.62 20.8 106.507 20.58 106.507 20.26C106.507 19.9133 106.633 19.6267 106.887 19.4C107.153 19.16 107.413 19.04 107.667 19.04C107.813 19.04 107.927 19.0667 108.007 19.12L113.167 22.5C113.353 22.62 113.487 22.7733 113.567 22.96C113.66 23.1467 113.707 23.3133 113.707 23.46C113.707 23.6067 113.66 23.7733 113.567 23.96C113.487 24.1467 113.353 24.3 113.167 24.42L108.007 27.78C107.927 27.8467 107.813 27.88 107.667 27.88Z'
          fill='white'
        />
      </svg>
    </Box>
  );
};

export default HeaderLogo;
