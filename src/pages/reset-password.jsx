import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './form.module.css';
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { postForgotPassword } from '../services/actions/user';
import { constants } from '../constants';

export function ResetPassword() {
  const [form, setValue] = React.useState({ password: '', token: '' });
  const dispatch = useDispatch();

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value} );
    console.log(e.target.value);
  };

  const onClick = (e) => {
      e.preventDefault();
      dispatch(postForgotPassword(
        `${constants.URL}/password-reset/reset`, 
        form
    ));
  };

  // уведомление бы об успехе

  return (
    <div className={styles.wrapper} >
      <form>
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
        <Button htmlType="button" type="primary" size="medium" onClick={onClick}>
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
