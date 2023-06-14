import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Home from './containers/Home';
import Root from './routes/Root';
import Login from './containers/Login';
import Products from './containers/Products';
import Cart from './containers/Cart';
import Logout from './containers/Logout';
import Register from './containers/Register';
import Order from './containers/Order';

import GlobalStyles from './assets/style/global.styled';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleProduct from './containers/Products/SingleProduct';
import { initialOptions } from './constant/paypal';

const App = (): JSX.Element => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            children: [
                { path: '/', element: <Home /> },
                { path: '/products', element: <Products /> },
                { path: '/products/:id', element: <SingleProduct /> },
                { path: '/login', element: <Login /> },
                { path: '/register', element: <Register /> },
                { path: '/cart', element: <Cart /> },
                { path: '/logout', element: <Logout /> },
                { path: '/orders/:id', element: <Order /> },
            ],
        },
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
