import React from 'react';
import { Alert } from 'antd';
import styles from './global-message.module.scss';

const GlobalMessage = ({ messages }) => {
  return (
    <div className={styles.container}>
      {messages.map((message) => (
        <Alert key={message.id} message={message.content} type={message.status} showIcon closable />
      ))}
    </div>
  );
};

export default GlobalMessage;
