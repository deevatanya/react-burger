import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import styles from './form.module.css';
import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { postAuthLogin } from '../services/actions/user';
import { constants } from '../constants';
import { IState } from '../services/initialState';

export const RegisterPage: FC = () => {
  const [form, setValue] = React.useState<{ email: string, password: string, name: string }>({ email: '', password: '', name: '' });
  const getAuthStatus = (state: IState) => state.user.isAuth;
  const isAuth: boolean = useSelector(getAuthStatus);

  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      postAuthLogin(
        `${constants.URL}/auth/register`, 
        form
    )(dispatch);
  };

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
          Регистрация
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="mt-6"></div>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onChange}
            value={form.name}
            name={'name'}
          />
          <div className="mt-6"></div>
          <EmailInput
            onChange={onChange}
            value={form.email}
            name={'email'}
            placeholder={'E-mail'}
          />
          <div className="mt-6"></div>
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={'password'}
            placeholder={'Пароль'}
          />
        </div>
        <div className="mt-6"></div>
        <Button htmlType="submit" type="primary" size="medium">
          Регистрация
        </Button>
      </form>
      <div className="mt-20"></div>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
          <Link to={{ pathname: constants.PATH.LOGIN }} className={`${styles.link} ml-2`}>
            Войти
          </Link>
        </p>
    </div>
  );
} 
