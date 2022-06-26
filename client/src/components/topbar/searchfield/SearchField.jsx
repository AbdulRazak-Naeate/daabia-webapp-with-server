import * as React from 'react';
import InputUnstyled from '@mui/core/InputUnstyled';
import { styled } from '@mui/system';

const blue = {
  200: '#80BFFF',
  400: '#3399FF',
};

const white = {
    200: '#FFF',
    400: '#FFFEE',
  };
const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 100%;
  height:35px;
  font-size: 0.875rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 30px;
  padding: 12px 12px;
  transition: all 150ms ease;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? null : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[400]};
  }

  &:focus {
    outline: 2px solid ${theme.palette.mode === 'dark' ? white[400] : white[200]};
  }
`,
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled  components={{ Input: StyledInputElement }} className={props.className} placeholder={props.placeholder} ref={ref} onChange={(e)=>{props.handlesearchProduct(e.target.value)}}/>
  );
});

export default function SearchField({handlesearchProduct}) {
  return <CustomInput aria-label="search input" placeholder="Search products..." handlesearchProduct={handlesearchProduct} />;
}
