import withAuth from '../../hoc/withAuth';
import useUserRole from '../../hooks/useUserRole';

const Cart = (): JSX.Element => {
    useUserRole({ rolesPermitted: ['C'] });
    return <div>Cart</div>;
};

export default withAuth(Cart);
