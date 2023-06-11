import { Formik, type FormikHelpers } from 'formik';
import { FormStyled, MainContainer } from '../Login/login.styled';
import Heading from '../../components/Heading';
import InputBox from '../../components/InputBox';
import AppButton from '../../components/AppButton';
import { Link, useNavigate } from 'react-router-dom';
import { Row } from '../Logout/logout.styled';
import {
    type ErrorResponse,
    type RegisterUser,
} from '../../utils/interface/interface';
import { registerUsers } from '../../services/auth.services';
import { extractError } from '../../utils/common';
import REGISTER_VALIDATION_SCHEMA from '../../validation/REGISTER_VALIDATION_SCHEMA';

const Register = (): JSX.Element => {
    const navigate = useNavigate();
    const initialValues: RegisterUser = {
        name: '',
        email: '',
        password: '',
        confirmpass: '',
        phone: '',
        address: '',
        role: 'C',
    };

    const handleSubmit = async (
        values: RegisterUser,
        actions: FormikHelpers<RegisterUser>
    ): Promise<void> => {
        try {
            const { confirmpass, ...vals } = values;
            const response = await registerUsers(vals);
            if (response.data.email) {
                navigate('/login');
            }
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

    return (
        <MainContainer>
            <Formik
                className="centered"
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={REGISTER_VALIDATION_SCHEMA}
            >
                {({ errors, touched }) => (
                    <FormStyled>
                        <Heading text="Create an account" />
                        <Row>
                            <InputBox
                                name="name"
                                placeholder="Your name"
                                err={errors.name}
                                touched={touched.name}
                            />
                            <InputBox
                                name="email"
                                placeholder="Your email"
                                err={errors.email}
                                touched={touched.email}
                            />
                        </Row>
                        <Row>
                            <InputBox
                                type="password"
                                name="password"
                                placeholder="Your password"
                                err={errors.password}
                                touched={touched.password}
                            />
                            <InputBox
                                type="password"
                                name="confirmpass"
                                placeholder="Confirm your password"
                                err={errors.confirmpass}
                                touched={touched.confirmpass}
                            />
                        </Row>

                        <InputBox
                            name="phone"
                            placeholder="Your contact number"
                            err={errors.phone}
                            touched={touched.phone}
                        />
                        <InputBox
                            name="address"
                            placeholder="Your address"
                            err={errors.address}
                            touched={touched.address}
                        />
                        <AppButton type="submit" text="Register" />
                        <span>
                            Already got account?
                            <Link to="/login">
                                <span className="links"> Login</span>
                            </Link>
                        </span>
                    </FormStyled>
                )}
            </Formik>
        </MainContainer>
    );
};

export default Register;
