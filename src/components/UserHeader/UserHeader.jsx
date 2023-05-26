import {
  CalendarOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserAddOutlined,
  WalletOutlined
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
    return currentUser ? '255px' : '155px';
  }, [currentUser]);

  const onClickUserIcon = () => setOpen(!open);
  const onClickHome = () => navigate('/')
  const onClickRoom = () => navigate('/room-management')
  const onClickBooking = () => navigate('/booking-management');
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
              <div className={styles.item} onClick={onClickHome}>
                <span>Home</span>
                <span className={styles.icon}>
                  <HomeOutlined />
                </span>
              </div>
              <div className={styles.item} onClick={onClickRoom}>
                <span>Room management</span>
                <span className={styles.icon}>
                  <WalletOutlined />
                </span>
              </div>
              <div className={styles.item} onClick={onClickBooking}>
                <span>Booking management</span>
                <span className={styles.icon}>
                  <CalendarOutlined />
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
