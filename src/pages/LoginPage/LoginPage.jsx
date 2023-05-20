import { Button, Checkbox, Col, Form, Input, Row, Spin } from 'antd';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import useValidateForm from '../../hooks/useValidateForm';
import styles from './login-page.module.scss';
import { MESSAGE_TYPE, WEBSITE_NAME } from '../../constants';
import userApi from '../../apis/user';
import useUser from '../../hooks/useUser';
import { useMessageContext } from '../../contexts/WithMessage';
import BackToHomeButton from '../../components/BackToHomeButton/BackToHomeButton';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const { pushMessage } = useMessageContext();
  const [isRemember, setIsRemember] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (values) => {
      try {
        setIsLogging(true);
        const res = await userApi.login(values);
        if (res.status === 200) {
          pushMessage(MESSAGE_TYPE.SUCCESS, 'Login Successfull!');
          login(res.data);
        }
      } catch (error) {
        console.log(error);
        pushMessage(MESSAGE_TYPE.ERROR, error.response.data.message);
      } finally {
        setIsLogging(false);
      }
    }
  });

  const { validate } = useValidateForm(formik);

  const onChangeRememberCheckbox = (e) => setIsRemember(e.target.checked);

  const onClickBack = () => navigate('/');

  return (
    <Row className={styles.container} align="middle">
      <Col span={14} className={styles.left}>
        <h1 className={styles.title}>{WEBSITE_NAME}</h1>
      </Col>
      <Col span={10} className={styles.right}>
        <BackToHomeButton className={styles.backButton} />
        <h1 className={styles.title}>Sign-In</h1>
        <Spin spinning={isLogging}>
          <Form onFinish={formik.handleSubmit} className={styles.form}>
            <Form.Item {...validate('username')}>
              <Input
                placeholder="Input your username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                size="large"
              />
            </Form.Item>
            <Form.Item {...validate('password')}>
              <Input.Password
                placeholder="Input your password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Checkbox size="large" checked={isRemember} onChange={onChangeRememberCheckbox}>
                Remember me
              </Checkbox>
              <Link to="/register" className={styles.registerLink}>
                Register if you are not a member yet
              </Link>
            </Form.Item>
            <Button htmlType="submit" block size="large">
              Login
            </Button>
          </Form>
        </Spin>
      </Col>
    </Row>
  );
};

export default LoginPage;
