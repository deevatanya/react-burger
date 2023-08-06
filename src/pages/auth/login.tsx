import React, { useCallback, useEffect, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import styles from './form.module.css';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { postAuthLogin, getUser } from '../../services/actions/user';
import { constants } from '../../constants';
import { IState } from '../../services/initialState';

export const LoginPage: FC = () => {
  const [form, setValue] = React.useState<{ email: string; password: string}>({ email: '', password: '' });
  const getAuthStatus = (state: IState) => state.user.isAuth;
  const isAuth: boolean = useSelector(getAuthStatus);

  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let onSubmit = useCallback((e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      postAuthLogin(
        `${constants.URL}/auth/login`, 
        form
    )(dispatch);
  }, [form, dispatch]
  );

  useEffect(() => {
    getUser(`${constants.URL}/auth/user`)(dispatch)
  }, [dispatch]);

  if (isAuth) {
    return (
      <Navigate
        to={constants.PATH.HOME}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit}> 
        <p className="text text_type_main-medium">
          Вход
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="mt-6"></div>
          <EmailInput
            onChange={onChange}
            value={form.email}
            name={'email'}
            isIcon={false}
            placeholder={'E-mail'}
          />
          <div className="mt-6"></div>
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={'password'}
            extraClass="mb-2"
          />
        </div>
        <div className="mt-6"></div>
        <Button htmlType="submit" type="primary" size="medium">
          Вход
        </Button>
      </form>
      <div className="mt-20"></div>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
          <Link to={{ pathname: constants.PATH.REGISTER }} className={`${styles.link} ml-2`}>
            Зарегистрироваться
          </Link>
        </p>
      <div className="mt-4"></div>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <Link to={{ pathname: constants.PATH.FORGOT_PASSWORD }} className={`${styles.link} ml-2`}>
            Восстановить пароль
          </Link>
        </p>
    </div>
  );
} 
