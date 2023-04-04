import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './app-header.module.css';

function AppHeader() {
    return (
    <header  className="m-10 p-4">
        <div className={style.logo}>
            <Logo />
        </div>
        <nav className={style.menu}>
            <a href='https://react.dev/' className={style.item}>
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default">
                    Конструктор
                </p>
            </a>
            <a href='https://react.dev' className={style.item}>
                <ListIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">
                    Лента заказов
                </p>
            </a>
            <a href='https://react.dev/' className={style.item}>
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">
                    Личный кабинет
                </p>
            </a>
        </nav>
    </header>
    )
}

export default AppHeader;