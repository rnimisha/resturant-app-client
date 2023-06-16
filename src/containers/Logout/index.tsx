import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hook';
import { logout } from '../../features/userSlice';
import { MainContainer } from './logout.styled';
import useUserRole from '../../hooks/useUserRole';
import Confirmation from '../../components/Confirmation';

const Logout = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useUserRole({ rolesPermitted: ['A', 'C'] });

    const yesAction = (): void => {
        dispatch(logout({}));
        navigate('/');
    };
    const cancelAction = (): void => {
        navigate(-1);
    };

    return (
        <MainContainer>
            <Confirmation
                title="Are you sure you want to logout? "
                yesAction={yesAction}
                cancelAction={cancelAction}
            />
        </MainContainer>
    );
};

export default Logout;
