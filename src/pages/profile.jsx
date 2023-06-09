import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile.module.css';
import { EmailInput, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { postAuthLogin } from '../services/actions/user';
import { Link } from 'react-router-dom';
import { constants } from '../constants';

const { PATH } = constants;
export function ProfilePage() {
  const {
    name,
    email,
    password
  } = useSelector(store => store.user.data);

  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(postAuthLogin(e.target.name, e.target.value));
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
          <Link to={{ pathname: PATH.LOGIN }} className={styles.link}>
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
              value={password}
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
