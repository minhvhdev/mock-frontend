import { Route, Routes } from 'react-router-dom';
import './App.scss';
import AdminRoute from './components/CustomRoute/AdminRoute';
import PrivateRoute from './components/CustomRoute/PrivateRoute';
import UnLoginRoute from './components/CustomRoute/UnLoginRouter';
import { WithMessage } from './contexts/WithMessage';
import CheckOutPage from './pages/CheckOutPage/CheckOutPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import AdminPage from './pages/AdminPage/AdminPage';
import Test from './components/test/Test';

function App() {
  return (
    <div className="App">
      <WithMessage>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<UnLoginRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/checkout" element={<CheckOutPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<CheckOutPage />} />
          </Route>
          <Route element={<UnLoginRoute />}>
            <Route path="/admin" element={<Test />} />
          </Route>
        </Routes>
      </WithMessage>
    </div>
  );
}

export default App;
