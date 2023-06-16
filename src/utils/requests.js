import { getCookie, setCookie } from "./cookie";
import { constants } from '../constants';

export async function getData(URL) {
  try {
    const res = await fetch(URL);
    if (res.ok) {
      return await res.json();
    } else {
      return await res.json()
        .then((err) => Promise.reject(err))
    }
  } catch (e) {
    alert(`ooops, error: ${e.message}`);
    console.error(e);
  }
};

export async function postData(URL, data) {
  try {
    const res = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return await res.json();
    } else {
      return await res.json()
        .then((err) => Promise.reject(err));
    }
  } catch (e) {
    alert(`ooops, error: ${e.message}`);
    console.error(e);
  }
};

export const postAuth = async (URL, form) => {
  try {
    const res = await fetch(URL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(form)
    });
    if (res.ok) {
      return await res.json();
    } else {
      return await res.json()
        .then((err) => Promise.reject(err))
    }
  } catch (e){
    alert(`ooops, error: ${e.message}`);
    console.error(e);
  }
}; 

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
export const getAuth = async (URL) => {
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  };
try {
  const res = await fetch(URL, options);
  return await checkReponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const token = getCookie('token');

      const refresh = await postAuth(`${constants.URL}/auth/token`, { token: token });

      setCookie('token', refresh.refreshToken);
      setCookie('accessToken', refresh.accessToken);
      options.headers.Authorization = refresh.accessToken;

      const res2 = await fetch(URL, options);
      return await checkReponse (res2);
    } else {
      return Promise.reject(err);
    }
  }
};

export const patchUserAuth = async (URL, form) => {
  const options = {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  };
  try {
    const res = await fetch(URL, options);
    return await checkReponse(res);
    } catch (err) {
      if (err.message === "jwt expired") {
        const token = getCookie('token');
  
        const refresh = await postAuth(`${constants.URL}/auth/token`, { token: token });
  
        setCookie('token', refresh.refreshToken);
        setCookie('accessToken', refresh.accessToken);
        options.headers.Authorization = refresh.accessToken;
  
        const res2 = await fetch(URL, options);
        return await checkReponse (res2);
      } else {
        return Promise.reject(err);
      }
    }
};
