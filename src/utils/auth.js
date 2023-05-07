import { useContext, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCookie, setCookie } from './cookie';
import { postAuth, getAuth, logout } from './requests';
import { setUserValue } from '../services/actions/user';

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

// export function useProvideAuth() {
//   const dispatch = useDispatch();
//   const user = useSelector(state => state.user);

//   const getUser = async () => {
//     return await getAuth()
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           dispatch(setUserValue({ ...user, ...data.user }));
//         }
//         return data.success;
//       });
//   };

//   const signIn = async form => {
//     const data = await postAuth(form)
//       .then(res => {
//         let authToken;
//         res.headers.forEach(header => {
//           if (header.indexOf('Bearer') === 0) {
//             authToken = header.split('Bearer ')[1];
//           }
//         });
//         if (authToken) {
//           setCookie('token', authToken);
//         }
//         return res.json();
//       })
//       .then(data => data);

//     if (data.success) {
//       dispatch(setUserValue({ ...user, ...data.user }));
//     }
//   };

//   const signOut = async () => {
//     await logout();
//     dispatch(setUserValue({name: '', email: '', password: '', token: ''}));
//     deleteCookie('token');
//   };

//   return {
//     user,
//     getUser,
//     signIn,
//     signOut
//   };
// }