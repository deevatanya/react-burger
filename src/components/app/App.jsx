import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { 
  HomePage,
  LoginPage,
  RegisterPage, 
  ForgotPassword,
  ResetPassword, 
  ProfilePage,
  NotFound404
} from '../../pages';
import AppHeader from '../app-header/app-header';
import { ProtectedRouteElement } from '../protected-route';
import { constants } from '../../constants';

const { PATH } = constants;

function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path={PATH.HOME} element={<ProtectedRouteElement element={<HomePage />} />} />
        <Route path={PATH.PROFILE} element={<ProtectedRouteElement element={<ProfilePage />} />} />

        <Route path={PATH.LOGIN} element={<LoginPage />} />
        <Route path={PATH.REGISTER} element={<RegisterPage />} />
        <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={PATH.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </Router>
  );
}

export default App;
// fix me доделать функционал:
// <Route path='/ingredients/:id' element={<LoginPage />} />