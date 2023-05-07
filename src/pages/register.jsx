import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import styles from './form.module.css';
import { Button, EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { postAuthLogin } from '../services/actions/user';
import { constants } from '../constants';

export function RegisterPage() {
  const [form, setValue] = React.useState({ email: '', password: '', name: '' });
  const getAuthStatus = (state) => state.user.isAuth;
  const isAuth = useSelector(getAuthStatus);

  const dispatch = useDispatch();

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onClick = (e) => {
      e.preventDefault();
      dispatch(postAuthLogin(
        `${constants.URL}/auth/register`, 
        form
    ));
  };

  if (isAuth) {
    return (
      <Navigate
        to={'/'}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <form>
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
        <Button htmlType="button" type="primary" size="medium" onClick={onClick}>
          Регистрация
        </Button>
      </form>
      <div className="mt-20"></div>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
          <Link to={{ pathname: '/login' }} className={`${styles.link} ml-2`}>
            Войти
          </Link>
        </p>
    </div>
  );
} 
