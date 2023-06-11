import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hook';
import AppButton from '../../components/AppButton';
import { logout } from '../../features/userSlice';
import { Item, MainContainer } from './logout.styled';
import useUserRole from '../../hooks/useUserRole';

const Logout = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useUserRole({ rolesPermitted: ['A', 'C'] });

    const yesAction = (): void => {
        dispatch(logout({}));
        navigate('/');
    };
    return (
        <MainContainer>
            <Item>Are you sure you want to logout? `</Item>
            <Item>
                <AppButton text="Yes" action={yesAction} />
            </Item>
            <Item>
                <AppButton text="No" error={true} />
            </Item>
        </MainContainer>
    );
};

export default Logout;
