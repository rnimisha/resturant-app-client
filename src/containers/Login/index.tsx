import { Formik, type FormikHelpers } from 'formik';
import { type ErrorResponse, type User } from '../../utils/interface/interface';
import { useAppDispatch } from '../../app/hook';
import { loginUser } from '../../features/userSlice';
import { extractError } from '../../utils/common';
import InputBox from '../../components/InputBox';
import { FormStyled, MainContainer } from './login.styled';
import Heading from '../../components/Heading';
import AppButton from '../../components/AppButton';
import { Link, useNavigate } from 'react-router-dom';
import LOGIN_VALIDATION_SCHEMA from '../../validation/LOGIN_VALIDATION_SCHEMA';
import { Box } from '@mui/material';

const Login = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (
        values: User,
        actions: FormikHelpers<User>
    ): Promise<void> => {
        const { email, password } = values;

        try {
            await dispatch(loginUser({ email, password }));
            navigate('/');
        } catch (error) {
            const err = JSON.parse((error as Error).message) as ErrorResponse;
            if (err.fieldError != null) {
                const errs = extractError(err.fieldError);
                actions.setErrors(errs);
            } else {
                alert(err.msg);
            }
        }
    };

    const initialValues: User = {
        email: '',
        password: '',
    };

    return (
        <MainContainer>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={LOGIN_VALIDATION_SCHEMA}
            >
                {({ errors, touched }) => (
                    <FormStyled>
                        <Heading text="Login Form" />
                        <InputBox
                            name="email"
                            placeholder="Your email"
                            err={errors.email}
                            touched={touched.email}
                        />
                        <InputBox
                            type="password"
                            name="password"
                            placeholder="Your password"
                            err={errors.password}
                            touched={touched.password}
                        />
                        <AppButton type="submit" text="Login" />
                        <Box mt={3}>
                            New user?
                            <Link to="/register">
                                <span className="links"> Register here</span>
                            </Link>
                        </Box>
                    </FormStyled>
                )}
            </Formik>
        </MainContainer>
    );
};

export default Login;
