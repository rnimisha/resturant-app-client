import { ButtonStyled } from './AppButton.styled';

interface PropsType {
    text: string;
    type?: 'submit' | 'reset' | 'button';
}

function AppButton({ text, type }: PropsType) {
    return <ButtonStyled type={type}>{text}</ButtonStyled>;
}

export default AppButton;
