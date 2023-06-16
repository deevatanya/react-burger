import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './profile.module.css';
import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { patchUser } from '../services/actions/user';
import { Link, useNavigate } from 'react-router-dom';
import { constants } from '../constants';
import { postAuthLogout } from '../services/actions/user';

const { PATH } = constants;
export function ProfilePage() {
  const {
    name,
    email
  } = useSelector(store => store.user.data);
  const [form, setValue] = useState({ email: email, password: '******', name: name });
  const [disabled, setDisabled] = useState({ emailDisable: true, passwordDisable: true, nameDisable: true });
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onLogout = () => {
    dispatch(postAuthLogout(`${constants.URL}/auth/logout`));
    navigate(constants.PATH.LOGIN, {replace: true});
  };
  const onNameClick = (e) => {
    setDisabled({...disabled, nameDisable: false});
    setButtonsVisible(true);
  }

  const onPasswordClick = (e) => {
    setDisabled({...disabled, passwordDisable: false});
    setButtonsVisible(true);
  }

  const onEmailClick = (e) => {
    setDisabled({...disabled, emailDisable: false});
    setButtonsVisible(true);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(patchUser(`${constants.URL}/auth/user`, form));
    for (let i in disabled) {
      disabled[i] = true;
    }
    setButtonsVisible(false);
  }

  const onReset = (e) => {
    setValue({ email: email, password: '******', name: name });
    for (let i in disabled) {
      disabled[i] = true;
    }
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
            <EmailInput
              onChange={onChange}
              value={form.email}
              name={'email'}
              placeholder={'Логин'}
              icon={'EditIcon'}
              onIconClick={onEmailClick}
              disabled={disabled.emailDisable}
            />
            <div className="mt-6"></div>
            <PasswordInput
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
