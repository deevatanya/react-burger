import { Link } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './app-header.module.css';

function AppHeader() {
    return (
    <header  className="m-10 p-4">
        <div className={style.logo}>
            <Logo />
        </div>
        <nav className={style.menu}>
            <Link to={{pathname: '/'}} className={style.item}>
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default">
                    Конструктор
                </p>
            </Link>
            <Link to={{pathname: '/'}} className={style.item}>
                <ListIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">
                    Лента заказов
                </p>
            </Link>
            <Link to={{pathname: '/profile'}} className={style.item}>
                <ProfileIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">
                    Личный кабинет
                </p>
            </Link>
        </nav>
    </header>
    )
}

export default AppHeader;