import { createGlobalStyle } from 'styled-components';
import COLOR from '../../constant/color.ts';

const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Quicksand', sans-serif;
  }
  body{
    font-family: 'Quicksand', sans-serif;
    font-weight: 400;
    color: ${COLOR.black};
    font-weight: 19px;
  }

  a{
    text-decoration: none;
  }

  .links{
    color: ${COLOR.primary};
    font-weight: 600;
  }

  .centered{
    justify-content: center;
    align-items: center;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyles;
