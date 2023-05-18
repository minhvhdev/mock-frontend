import React from 'react';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const BackToHomeButton = ({ className }) => {
  const navigate = useNavigate();
  const onClickBack = () => navigate('/');
  return (
    <Button className={className} shape="circle" size="large" onClick={onClickBack}>
      <ArrowLeftOutlined />
    </Button>
  );
};

export default BackToHomeButton;
