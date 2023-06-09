import { useDispatch, useSelector } from 'react-redux';
import styles from './profile.module.css';
import { EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { postAuthLogin } from '../services/actions/user';
import { Link, useNavigate } from 'react-router-dom';
import { constants } from '../constants';
import { postAuthLogout } from '../services/actions/user';

const { PATH } = constants;
export function ProfilePage() {
  const {
    name,
    email
  } = useSelector(store => store.user.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChange = e => {
    dispatch(postAuthLogin(e.target.name, e.target.value));
  };

  const onLogout = () => {
    dispatch(postAuthLogout(`${constants.URL}/auth/logout`));
    navigate(constants.PATH.LOGIN, {replace: true});
  };

  return (
    <>
      <div className={styles.tab}>
        <div className={styles.tabs}>
          <Link to={{ pathname: PATH.PROFILE }} className={styles.link}>
            <p className="text text_type_main-medium">
              Профиль
            </p>
          </Link>
          <Link to={{ pathname: PATH.ORDERS }} className={styles.link}>
            <p className="text text_type_main-medium text_color_inactive">
              История заказов
            </p>
          </Link>
          <Link className={styles.link} onClick={onLogout}>
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
      <div className={styles.content}>
        <form>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onChange}
              value={name}
              name={'name'}
              icon={'EditIcon'}
            />
            <div className="mt-6"></div>
            <EmailInput
              onChange={onChange}
              value={email}
              name={'email'}
              placeholder={'Логин'}
              icon={'EditIcon'}
            />
            <div className="mt-6"></div>
            <PasswordInput
              onChange={onChange}
              value={'******'}
              name={'password'}
              placeholder={'Пароль'}
              icon={'EditIcon'}
            />
          </div>
        </form>
      </div>
    </>

  );
} 
