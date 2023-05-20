import { Route, Routes } from 'react-router-dom';
import './App.scss';
import AdminRoute from './components/CustomRoute/AdminRoute';
import PrivateRoute from './components/CustomRoute/PrivateRoute';
import UnLoginRoute from './components/CustomRoute/UnLoginRouter';
import Test from './components/test/Test';
import { MessageContextProvider } from './contexts/message-context';
import AdminPage from './pages/AdminPage/AdminPage';
import CheckOutPage from './pages/CheckOutPage/CheckOutPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import RoomDetailPage from './pages/RoomDetailPage/RoomDetailPage';
import PublicRoute from './components/CustomRoute/PublicRoute';
import BookingHistory from './pages/BookingHistory/BookingHistory';

function App() {
  return (
    <div className="App">
      <MessageContextProvider>
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
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/booking-history" element={<BookingHistory />} />
          </Route>
          <Route element={<UnLoginRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </MessageContextProvider>
    </div>
  );
}

export default App;
