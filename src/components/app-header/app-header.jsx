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
            <div className={style.item}>
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default">
                    Конструктор
                </p>
            </div>
            <div className={style.item}>
                <ListIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">
                    Лента заказов
                </p>
            </div>
            <div className={style.item}>
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">
                    Личный кабинет
                </p>
            </div>
        </nav>
    </header>
    )
}

export default AppHeader;