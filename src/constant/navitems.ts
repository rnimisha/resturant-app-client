export const NAVITEMS_WITHOUTAUTH = [
    {
        path: '/',
        name: 'Home',   
    },
    {
        path: '/products',
        name: 'Menu',
    },
    {
        path: '/login',
        name: 'Login',
    },
];

export const NAVITEMS_WITHAUTH = [
    {
        path: '/',
        name: 'Home',   
    },
    {
        path: '/products',
        name: 'Menu',
    },
    {
        path: '/cart',
        name: 'Cart',
    },
    {
        path: '/logout',
        name: 'Logout',
    },
];

interface navElement {
    path: string;
    name: string;
};

export type  navType = navElement[];