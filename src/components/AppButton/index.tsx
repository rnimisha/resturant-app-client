import { ButtonStyled } from './AppButton.styled';

interface PropsType {
    text: string;
    type?: 'submit' | 'reset' | 'button';
}

const AppButton = ({ text, type }: PropsType): JSX.Element => {
    return <ButtonStyled type={type}>{text}</ButtonStyled>;
};

export default AppButton;
