import { FC } from 'react';
import { useDispatch } from 'react-redux';
import styles from './profile-menu.module.css';
import { Link, useLocation } from 'react-router-dom';

import { constants } from '../../constants';
import { postAuthLogout } from '../../services/actions/user';

const { PATH } = constants;
const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const onLogout = () => {
   postAuthLogout(`${constants.URL}/auth/logout`)(dispatch);
  };

  return (
    <>
      <div className={styles.tab}>
        <div className={styles.tabs}>
          <Link to={{ pathname: PATH.PROFILE }} className={styles.link}>
            <p className={`text text_type_main-medium ${location.pathname === PATH.PROFILE ? null : 'text_color_inactive'}`}>
              Профиль
            </p>
          </Link>
          <Link to={{ pathname: `${PATH.PROFILE}${PATH.ORDERS}` }} className={styles.link}>
            <p className={`text text_type_main-medium ${location.pathname === `${PATH.PROFILE}${PATH.ORDERS}` ? null : 'text_color_inactive'}`}>
              История заказов
            </p>
          </Link>
          <Link to={{pathname: PATH.LOGIN}} className={styles.link} onClick={onLogout}>
            <p className="text text_type_main-medium text_color_inactive">
              Выход
            </p>
          </Link>
        </div>
        <div className="mt-20"></div>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
    </>

  );
} 
export default ProfileMenu;
