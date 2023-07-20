import { useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { patchUser } from '../services/actions/user';
import { Link } from 'react-router-dom';
import { constants } from '../constants';
import { postAuthLogout } from '../services/actions/user';
import { IState } from '../services/initialState';

const { PATH } = constants;
export const ProfilePage: FC = () => {
  const {
    name,
    email
  } = useSelector((store: IState) => store.user.data);
  const [form, setValue] = useState<{ email: string, password: string, name: string }>({ email: email, password: '******', name: name });
  const [disabled, setDisabled] = useState<{ emailDisable: boolean, passwordDisable: boolean, nameDisable: boolean }>({ emailDisable: true, passwordDisable: true, nameDisable: true });
  const [buttonsVisible, setButtonsVisible] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onChange = (e: any) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const onLogout = () => {
   postAuthLogout(`${constants.URL}/auth/logout`)(dispatch);
  };
  const onNameClick = () => {
    setDisabled({...disabled, nameDisable: false});
    setButtonsVisible(true);
  }

  const onPasswordClick = () => {
    setDisabled({...disabled, passwordDisable: false});
    setButtonsVisible(true);
  }

  const onEmailClick = () => {
    setDisabled({...disabled, emailDisable: false});
    setButtonsVisible(true);
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    patchUser(`${constants.URL}/auth/user`, form)(dispatch);
    disabled.emailDisable = true;
    disabled.passwordDisable = true;
    disabled.nameDisable = true;
    setButtonsVisible(false);
  }

  const onReset = () => {
    setValue({ email: email, password: '******', name: name });
    disabled.emailDisable = true;
    disabled.passwordDisable = true;
    disabled.nameDisable = true;
    setButtonsVisible(false);
  }

  return (
    <>
      <div className={styles.tab}>
        <div className={styles.tabs}>
          <Link to={{ pathname: PATH.PROFILE }} className={styles.link}>
            <p className="text text_type_main-medium">
              Профиль
            </p>
          </Link>
          <Link to={{ pathname: `${PATH.PROFILE}${PATH.ORDERS}` }} className={styles.link}>
            <p className="text text_type_main-medium text_color_inactive">
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
      <div className={styles.content}>
        <form onSubmit={onSubmit} onReset={onReset}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onChange}
              value={form.name}
              name={'name'}
              icon={'EditIcon'}
              onIconClick={onNameClick}
              disabled={disabled.nameDisable}
            />
            <div className="mt-6"></div>
            <Input
              onChange={onChange}
              value={form.email}
              name={'email'}
              placeholder={'Логин'}
              icon={'EditIcon'}
              onIconClick={onEmailClick}
              disabled={disabled.emailDisable}
            />
            <div className="mt-6"></div>
            <Input
              onChange={onChange}
              value={form.password}
              name={'password'}
              placeholder={'Пароль'}
              icon={'EditIcon'}
              onIconClick={onPasswordClick}
              disabled={disabled.passwordDisable}
            />
          </div>
          <div className="mt-6"></div>
          { buttonsVisible ? (
          <div>
            <Button type={'secondary'} htmlType={'reset'}>
              Отмена
            </Button>
            <Button type={'primary'} htmlType={'submit'}>
              Сохранить
            </Button>
          </div>
        ) : null}

        </form>
      </div>
    </>

  );
} 
