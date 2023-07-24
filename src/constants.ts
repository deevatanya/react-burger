export interface IConstants {
    URL: string,
    PATH: {
        HOME: string;
        PROFILE: string;
        ORDERS: string;
        LOGIN: string;
        REGISTER: string;
        FORGOT_PASSWORD: string;
        RESET_PASSWORD: string;
        INGREDIENTS: string;
        FEED: string;
    }
}
export const constants: IConstants = {
    URL: 'https://norma.nomoreparties.space/api',
    PATH: {
        HOME: '/',
        PROFILE: '/profile',
        ORDERS: '/orders',
        LOGIN: '/login',
        REGISTER: '/register',
        FORGOT_PASSWORD: '/forgot-password',
        RESET_PASSWORD: '/reset-password',
        INGREDIENTS: '/ingredients',
        FEED: '/feed'
    }
}