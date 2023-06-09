import { Route, Routes } from 'react-router-dom';
import './App.scss';
import AdminRoute from './components/CustomRoute/AdminRoute';
import PrivateRoute from './components/CustomRoute/PrivateRoute';
import PublicRoute from './components/CustomRoute/PublicRoute';
import UnLoginRoute from './components/CustomRoute/UnLoginRouter';
import Test from './components/test/Test';
import AdminPage from './pages/AdminPage/AdminPage';
import BookingManagement from './pages/BookingManagement/BookingManagement';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import RoomDetailPage from './pages/RoomDetailPage/RoomDetailPage';
import RoomManagement from './pages/RoomManagement/RoomManagement';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/room-detail/:id" element={<RoomDetailPage />} />
            <Route path="/admin" element={<Test />} />
          </Route>

          <Route element={<UnLoginRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/checkout" element={<AdminPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/room-management" element={<RoomManagement />} />
            <Route path="/booking-management" element={<BookingManagement />} />
          </Route>
          <Route element={<UnLoginRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
