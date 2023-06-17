

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
        path: '/orders/myorders',
        name: 'Order',
    },
    {
        path: '/logout',
        name: 'Logout',
    },
];

interface navElement {
    path: string;
    name: string;
    icon?: string;
};

export const ADMIN_SIDE_NAV = [
    {
        path: '/admin/',
        name: 'Dashboard',
        icon: 'dashboard'
    },
    {
        path: '/admin/orders',
        name: 'Orders',  
        icon: 'local_mall' 
    },
    {
        path: '/admin/products',
        name: 'Products',   
        icon: 'fastfood'
    },
]

export const ADMIN_SIDE_NAV_SETTINGS = [

    {
        path: '/logout',
        name: 'Logout',   
        icon: 'logout'
    },
]

export type  navType = navElement[];