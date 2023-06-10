import { Box } from '@mui/material';
import { TextBox, Error } from './InputBox.styled';

interface PropsType {
    name: string;
    placeholder: string;
    type?: string;
    err: string | undefined;
    touched: boolean | undefined;
}

function InputBox({ err, touched, ...props }: PropsType) {
    return (
        <Box
            sx={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <TextBox {...props} />
            {err && touched ? <Error>{err} </Error> : null}
        </Box>
    );
}

export default InputBox;
