import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useUser = () => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();

  const login = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setCurrentUser(data);
    navigate(-1);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/', { replace: true });
  };

  return { currentUser, login, logout };
};

export default useUser;
