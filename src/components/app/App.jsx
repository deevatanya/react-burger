import { Route, Routes, useLocation } from 'react-router-dom';
import { 
  HomePage,
  LoginPage,
  RegisterPage, 
  ForgotPassword,
  ResetPassword, 
  ProfilePage,
  NotFound404, 
  IngredientPage
} from '../../pages';
import AppHeader from '../app-header/app-header';
import { ProtectedRouteElement } from '../protected-route';
import { constants } from '../../constants';

const { PATH } = constants;

function App() {
  let location = useLocation();
  const background = location.state?.background;
  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path={PATH.HOME} element={<HomePage />} />
        <Route path={PATH.PROFILE} element={<ProtectedRouteElement element={<ProfilePage />} />} />
        <Route path={`${PATH.INGREDIENTS}/:id`} element={<IngredientPage />} />
        <Route path={PATH.LOGIN} element={<LoginPage />} />
        <Route path={PATH.REGISTER} element={<RegisterPage />} />
        <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={PATH.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background ? (
        <Routes>
          <Route path={`${PATH.INGREDIENTS}/:id`} element={<HomePage />} />
        </Routes>
        ) : null }
    </>
  );
}

export default App;
// fix me доделать функционал:
// <Route path='/ingredients/:id' element={<LoginPage />} />

