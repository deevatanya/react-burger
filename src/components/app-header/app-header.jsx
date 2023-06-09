import { Link, useLocation } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './app-header.module.css';
import { useEffect, useState } from 'react';
import { constants } from '../../constants';

const { PATH } = constants;

function AppHeader() {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(location.pathname);

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);

    return (
    <header  className="m-10 p-4">
        <div className={style.logo}>
            <Logo />
        </div>
        <nav className={style.menu}>
            <Link to={{pathname: PATH.HOME}} className={style.item}>
                <BurgerIcon type={currentPath === PATH.HOME ? "primary" : "secondary"} />
                <p className={`text text_type_main-default ${currentPath === PATH.HOME ? null : "text_color_inactive"}`}>
                    Конструктор
                </p>
            </Link>
            <Link to={{pathname: PATH.FEED}} className={style.item}>
                <ListIcon type={currentPath.includes(PATH.FEED) ? "primary" : "secondary"} />
                <p className={`text text_type_main-default ${currentPath.includes(PATH.FEED) ? null : "text_color_inactive"}`}>
                    Лента заказов
                </p>
            </Link>
            <Link to={{pathname: PATH.PROFILE}} className={style.item}>
                <ProfileIcon type={currentPath.includes(PATH.PROFILE) ? "primary" : "secondary"} />
                <p className={`text text_type_main-default ${currentPath.includes(PATH.PROFILE) ? null : "text_color_inactive"}`}>
                    Личный кабинет
                </p>
            </Link>
        </nav>
    </header>
    )
}

export default AppHeader;