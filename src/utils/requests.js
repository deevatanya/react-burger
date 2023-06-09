import { getCookie } from "./cookie";

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

export const getAuth = async (URL) => {
try {
  const res = await fetch(URL, {
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
  });
    if (res.ok) {
      return await res.json();
    } else {
      return await res.json()
        .then((err) => Promise.reject(err))
    }
  } catch (e){
  }
};