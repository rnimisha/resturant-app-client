import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './containers/Home';
import Root from './routes/Root';
import Login from './containers/Login';
import Products from './containers/Products';
import Cart from './containers/Cart';
import Logout from './containers/Logout';

import GlobalStyles from './assets/style/global.styled';

const App = (): JSX.Element => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            children: [
                { path: '/', element: <Home /> },
                { path: '/products', element: <Products /> },
                { path: '/login', element: <Login /> },
                { path: '/cart', element: <Cart /> },
                { path: '/logout', element: <Logout /> },
            ],
        },
    ]);

    return (
        <>
            <GlobalStyles />
            <RouterProvider router={router} />
        </>
    );
};

export default App;
