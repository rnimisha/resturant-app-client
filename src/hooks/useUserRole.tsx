import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hook';

interface PropsType {
    rolesPermitted: string[];
}

const useUserRole = ({ rolesPermitted }: PropsType): void => {
    const navigate = useNavigate();
    const { token, role } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (token === '' || token.trim().length < 1) {
            navigate('/login');
        }

        if (role !== null) {
            !rolesPermitted.includes(role) && navigate('/');
        }
    }, [role, navigate, token]);
};

export default useUserRole;
