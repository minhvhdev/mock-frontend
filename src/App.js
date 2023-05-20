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
import RoomDetailPage from './pages/RoomDetailPage/RoomDetailPage';
import Dashboard from './components/Admin/Dashboard';
import Room from './components/Admin/Room';
import User from './components/Admin/User';
import Account from './components/Admin/Account';
import Booking from './components/Admin/Booking';
function App() {
  return (
    <div className="App">
      <WithMessage>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room-detail/:id" element={<RoomDetailPage />} />

          <Route element={<UnLoginRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/checkout" element={<AdminPage />} />
          </Route>
          
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<CheckOutPage />} />
          </Route>
          <Route element={<UnLoginRoute />}>
            <Route path="/admin" element={<Test />} />  
          </Route>
          <Route path="/admin" element={<AdminPage />}>
              <Route path="" element={<Dashboard />}/>
              <Route path="room" element={<Room />}/>
              <Route path="user" element={<User />}/>
              <Route path="booking" element={<Booking />}/>
              <Route path="account" element={<Account />}/>
            </Route>
        </Routes>
      </WithMessage>
    </div>
  );
}

export default App;
