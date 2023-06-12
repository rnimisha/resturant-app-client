import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './containers/Home';
import Root from './routes/Root';
import Login from './containers/Login';
import Products from './containers/Products';
import Cart from './containers/Cart';
import Logout from './containers/Logout';
import Register from './containers/Register';

import GlobalStyles from './assets/style/global.styled';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SingleProduct from './containers/Products/SingleProduct';

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
            ],
        },
    ]);

    return (
        <>
            <GlobalStyles />
            <RouterProvider router={router} />
            <ToastContainer
                autoClose={4000}
                theme="colored"
                style={{ marginTop: '40px' }}
            />
        </>
    );
};

export default App;
