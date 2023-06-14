import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { initialOptions } from './constant/paypal';

import Root from './routes/Root';
import AdminRoot from './routes/AdminRoot';

import Home from './containers/Home';
import Login from './containers/Login';
import Products from './containers/Products';
import Cart from './containers/Cart';
import Logout from './containers/Logout';
import Register from './containers/Register';
import Order from './containers/Order';
import Dashboard from './containers/Admin/Dashboard';
import SingleProduct from './containers/Products/SingleProduct';
import Orders from './containers/Admin/Orders';

import GlobalStyles from './assets/style/global.styled';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = (): JSX.Element => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            children: [
                { path: '', element: <Home /> },
                { path: 'products', element: <Products /> },
                { path: 'products/:id', element: <SingleProduct /> },
                { path: 'cart', element: <Cart /> },
                { path: 'orders/:id', element: <Order /> },
            ],
        },
        {
            path: 'admin',
            element: <AdminRoot />,
            children: [
                { path: '', element: <Dashboard /> },
                { path: 'orders', element: <Orders /> },
                { path: 'products', element: <Orders /> },
            ],
        },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'logout', element: <Logout /> },
    ]);

    return (
        <>
            <PayPalScriptProvider options={initialOptions}>
                <GlobalStyles />
                <RouterProvider router={router} />
                <ToastContainer
                    autoClose={4000}
                    theme="colored"
                    style={{ marginTop: '40px' }}
                />
            </PayPalScriptProvider>
        </>
    );
};

export default App;
