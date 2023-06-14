import { Box } from '@mui/material';
import { TextBox, Error } from './InputBox.styled';

interface PropsType {
    name: string;
    placeholder: string;
    type?: string;
    err: string | undefined;
    touched: boolean | undefined;
}

const InputBox = ({ ...props }: PropsType): JSX.Element => {
    return (
        <Box
            sx={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '40px',
            }}
        >
            <TextBox {...props} />

            {props.err && props.touched ? <Error>{props.err} </Error> : null}
        </Box>
    );
};

export default InputBox;
