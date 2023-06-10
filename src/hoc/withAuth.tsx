import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hook';

const withAuth = (OriginalComponent: FC<any>) => {
    return (props: any) => {
        const navigate = useNavigate();
        const { token } = useAppSelector((state) => state.user);

        useEffect(() => {
            if (!token || token.trim().length === 0) {
                navigate('/login');
            }
        }, [navigate, token]);

        return <OriginalComponent {...props} />;
    };
};

export default withAuth;
