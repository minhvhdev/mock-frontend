import {
  HistoryOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import styles from './user-header.module.scss';

const UserHeader = () => {
  const { currentUser, logout } = useUser();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const maxHeight = useMemo(() => {
    return currentUser ? '205px' : '155px';
  }, [currentUser]);

  const onClickUserIcon = () => setOpen(!open);
  const onClickProfile = () => navigate('/profile');
  const onClickHistory = () => navigate('/booking-history');
  const onClickLogout = () => logout();
  const onClickSignIn = () => navigate('/login');
  const onClickSignOut = () => navigate('/register');

  return (
    <>
      <div className={open ? styles.overlay : ''} onClick={onClickUserIcon} />
      <div className={styles.container}>
        <div
          className={styles.content}
          onClick={onClickUserIcon}
          style={{ maxHeight: open ? maxHeight : '50px' }}>
          <div className={styles.menu}>
            <span className={styles.icon}>
              <MenuOutlined />
            </span>
          </div>
          {currentUser ? (
            <>
              <div className={styles.item} onClick={onClickProfile}>
                <span>Profile</span>
                <span className={styles.icon}>
                  <UserOutlined />
                </span>
              </div>
              <div className={styles.item} onClick={onClickHistory}>
                <span>Booking history</span>
                <span className={styles.icon}>
                  <HistoryOutlined />
                </span>
              </div>
              <div className={styles.item} onClick={onClickLogout}>
                <span>Logout</span>
                <span className={styles.icon}>
                  <LogoutOutlined />
                </span>
              </div>
            </>
          ) : (
            <>
              <div className={styles.item} onClick={onClickSignIn}>
                <span>Sign in</span>
                <span className={styles.icon}>
                  <UserAddOutlined />
                </span>
              </div>
              <div className={styles.item} onClick={onClickSignOut}>
                <span>Sign up</span>
                <span className={styles.icon}>
                  <UserAddOutlined />
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserHeader;
