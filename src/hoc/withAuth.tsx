import { type FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hook';

const withAuth = (OriginalComponent: FC<any>): FC<any> => {
    const WrappedComponent = (props: any): JSX.Element => {
        const navigate = useNavigate();
        const { token } = useAppSelector((state) => state.user);

        useEffect(() => {
            if (!token || token.trim().length === 0) {
                navigate('/login');
            }
        }, [navigate, token]);

        return <OriginalComponent {...props} />;
    };

    return WrappedComponent;
};

export default withAuth;
