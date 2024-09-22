import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { TextBody } from './Texts/Texts';
import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from '@mui/material/styles';

const violetBase = '#6420AA';
const violetMain = alpha(violetBase, 1);

const theme = createTheme({
  palette: {
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});

function CustomButton({ startIcon, endIcon, label, width, height, onClick}) {


  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={onClick} sx={{ width: width ? width : null ,  height: height ? height : null}} color='violet' startIcon={startIcon ? startIcon : null} endIcon={endIcon ? endIcon : null}>
          <TextBody color={"#ffffff"}>
            {label}
          </TextBody>
        </Button>
      </Stack>
    </ThemeProvider>
  )
}

export default CustomButton