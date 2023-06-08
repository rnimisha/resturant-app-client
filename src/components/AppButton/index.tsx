
import Button from '@mui/material/Button';
import { ButtonStyled } from './AppButton.styled';

type PropsType ={
    text : string,
    type? : 'submit' | 'reset' | 'button'
}


const AppButton = ({text, type}: PropsType) => {
  
  return (
      <ButtonStyled type= {type}>
      {text}
      </ButtonStyled>

  )
}

export default AppButton