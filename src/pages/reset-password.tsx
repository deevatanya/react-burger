import React, {FC} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import styles from './form.module.css';
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { postForgotPassword, getUser } from '../services/actions/user';
import { constants } from '../constants';
import { IState } from '../services/initialState';

export const ResetPassword: FC = () => {
  const [form, setValue] = React.useState<{ password: string, token: string }>({ password: '', token: '' });
  const dispatch = useDispatch();
  const getAuthStatus = (state: IState) => state.user.isAuth;
  const isAuth: boolean = useSelector(getAuthStatus);

  const onChange = (e: any) => {
    setValue({ ...form, [e.target.name]: e.target.value} );
  };

  const onSubmit = (e: any) => {
      e.preventDefault();
      postForgotPassword(
        `${constants.URL}/password-reset/reset`, 
        form
    )(dispatch);
  };
  React.useEffect(() => {
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
