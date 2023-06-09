import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import styles from './form.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { postForgotPassword, getUser } from '../services/actions/user';
import { constants } from '../constants';

export function ForgotPassword() {
  const [form, setValue] = React.useState({ email: '' });
  const dispatch = useDispatch();

  const getAuthStatus = (state) => state.user.isAuth;
  const isAuth = useSelector(getAuthStatus);

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value} );
  };

  const onSubmit = (e) => {
      e.preventDefault();
      dispatch(postForgotPassword(
        `${constants.URL}/password-reset`, 
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

  return (
    <div className={styles.wrapper}>
      <form onSubmit={onSubmit}>
        <p className="text text_type_main-medium">
          Восстановление пароля
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
        </div>
        <div className="mt-6"></div>
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
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
