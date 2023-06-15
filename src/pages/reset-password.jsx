import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import styles from './form.module.css';
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { postForgotPassword, getUser } from '../services/actions/user';
import { constants } from '../constants';

export function ResetPassword() {
  const [form, setValue] = React.useState({ password: '', token: '' });
  const dispatch = useDispatch();
  const getAuthStatus = (state) => state.user.isAuth;
  const isAuth = useSelector(getAuthStatus);

  const getResetPass = (state) => state.user.isResetPassword;
  const isResetPass = useSelector(getResetPass);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value} );
  };

  const onSubmit = (e) => {
      e.preventDefault();
      dispatch(postForgotPassword(
        `${constants.URL}/password-reset/reset`, 
        form
    ));
  };
  React.useEffect(() => {
    dispatch(getUser(`${constants.URL}/auth/user`))
  }, [dispatch]);
  
  if (isAuth) {
    return (
      <Navigate
        to={constants.PATH.HOME}
      />
    );
  }

  if (!isResetPass) {
    return (
      <Navigate
        to={constants.PATH.FORGOT_PASSWORD}
      />
    );
  }

  return (
    <div className={styles.wrapper} >
      <form onSubmit={onSubmit}>
        <p className="text text_type_main-medium">
          Восстановление пароля
        </p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="mt-6"></div>
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={'password'}
            placeholder={'Введите новый пароль'}
            icon={'ShowIcon'}
          />
        <div className="mt-6"></div>
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={onChange}
            value={form.token}
            name={'token'}
          />
        </div>
        <div className="mt-6"></div>
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <div className="mt-20"></div>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
          <Link to={{ pathname: constants.PATH.LOGIN }} className={`${styles.link} ml-2`}>
            Войти
          </Link>
        </p>
    </div>
  );
} 
