import { getCookie, setCookie } from "./cookie";
import { constants } from '../constants';

interface IForm { password?: string, token?: string, email?: string }

export async function getData(URL: string) {
  try {
    const res = await fetch(URL);
    if (res.ok) {
      return await res.json();
    } else {
      return await res.json()
        .then((err) => Promise.reject(err))
    }
  } catch (e: any) {
    alert(`ooops, error: ${e.message}`);
    console.error(e);
  }
};

export async function postData(URL: string, data: { ingredients: string[] }) {
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
  } catch (e: any) {
    alert(`ooops, error: ${e.message}`);
    console.error(e);
  }
};

export const postAuth = async (URL: string, form: IForm) => {
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
  } catch (e: any){
    alert(`ooops, error: ${e.message}`);
    console.error(e);
  }
}; 

const checkReponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));
};
export const getAuth = async (URL: string) => {
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
  //@ts-ignore
  const res = await fetch(URL, options);
  return await checkReponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const token = getCookie('token');

      const refresh = await postAuth(`${constants.URL}/auth/token`, { token: token });

      setCookie('token', refresh.refreshToken);
      setCookie('accessToken', refresh.accessToken);
      options.headers.Authorization = refresh.accessToken;
      //@ts-ignore
      const res2 = await fetch(URL, options);
      return await checkReponse (res2);
    } else {
      return Promise.reject(err);
    }
  }
};

export const patchUserAuth = async (URL: string, form: IForm) => {
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
    //@ts-ignore
    const res = await fetch(URL, options);
    return await checkReponse(res);
    } catch (err: any) {
      if (err.message === "jwt expired") {
        const token = getCookie('token');
  
        const refresh = await postAuth(`${constants.URL}/auth/token`, { token: token });
  
        setCookie('token', refresh.refreshToken);
        setCookie('accessToken', refresh.accessToken);
        options.headers.Authorization = refresh.accessToken;
        //@ts-ignore
        const res2 = await fetch(URL, options);
        return await checkReponse (res2);
      } else {
        return Promise.reject(err);
      }
    }
};
