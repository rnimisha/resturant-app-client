import { ButtonStyled } from './AppButton.styled';

interface PropsType {
    text: string;
    type?: 'submit' | 'reset' | 'button';
    error?: boolean;
    action?: () => void;
}

const AppButton = ({ text, type, error, action }: PropsType): JSX.Element => {
    return (
        <ButtonStyled type={type} error={error || false} onClick={action}>
            {text}
        </ButtonStyled>
    );
};

export default AppButton;
