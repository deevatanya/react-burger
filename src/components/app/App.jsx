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

function App() {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </Router>
  );
}

export default App;
// fix me доделать функционал:
// <Route path='/ingredients/:id' element={<LoginPage />} />