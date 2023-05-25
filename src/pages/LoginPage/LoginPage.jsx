import { Button, Checkbox, Col, Form, Input, Row, Spin, message } from 'antd';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import userApi from '../../apis/user';
import BackToHomeButton from '../../components/BackToHomeButton/BackToHomeButton';
import { WEBSITE_NAME } from '../../constants';
import useUser from '../../hooks/useUser';
import useValidateForm from '../../hooks/useValidateForm';
import styles from './login-page.module.scss';

const LoginPage = () => {
  const { login } = useUser();
  const location = useLocation();
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
          message.success('Login Successful!');
          login(res.data, location.state);
        }
      } catch (error) {
        console.log(error);
        message.error(error.response.data.message);
      } finally {
        setIsLogging(false);
      }
    }
  });

  const { validate } = useValidateForm(formik);

  const onChangeRememberCheckbox = (e) => setIsRemember(e.target.checked);

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
