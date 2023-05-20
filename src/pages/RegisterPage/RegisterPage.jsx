import { Button, Col, Form, Input, Row } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import userApi from '../../apis/user';
import BackToHomeButton from '../../components/BackToHomeButton/BackToHomeButton';
import { MESSAGE_TYPE, WEBSITE_NAME } from '../../constants';
import { useMessageContext } from '../../contexts/message-context';
import useValidateForm from '../../hooks/useValidateForm';
import styles from './register-page.module.scss';

const RegisterPage = () => {
  const { pushMessage } = useMessageContext();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      username: '',
      password: '',
      rePassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('Email is required'),
      phoneNumber: Yup.string().required('Phone Number is required'),
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
      rePassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Required')
    }),
    onSubmit: async (values) => {
      delete values.rePassword;
      try {
        const res = await userApi.register(values);
        if (res.status === 200) {
          pushMessage(MESSAGE_TYPE.SUCCESS, 'This is a success message!');
        }
      } catch (error) {
        if (Array.isArray(error.response.data)) {
          error.response.data.forEach((e) => {
            pushMessage(MESSAGE_TYPE.ERROR, e);
          });
        } else {
          pushMessage(MESSAGE_TYPE.ERROR, error.response.data.message);
        }
      }
    }
  });

  const { validate } = useValidateForm(formik);

  return (
    <Row className={styles.container} align="middle">
      <Col span={14} className={styles.left}>
        <h1 className={styles.title}>{WEBSITE_NAME}</h1>
      </Col>
      <Col span={10} className={styles.right}>
        <BackToHomeButton className={styles.backButton} />
        <h1 className={styles.title}>Sign-Up</h1>
        <Form onFinish={formik.handleSubmit} className={styles.form}>
          <Form.Item {...validate('name')}>
            <Input
              placeholder="Input name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              size="large"
            />
          </Form.Item>
          <Form.Item {...validate('email')}>
            <Input
              placeholder="Input email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              size="large"
            />
          </Form.Item>
          <Form.Item {...validate('phoneNumber')}>
            <Input
              placeholder="Input phone number"
              name="phoneNumber"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              size="large"
            />
          </Form.Item>
          <Form.Item {...validate('username')}>
            <Input
              placeholder="Input username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              size="large"
            />
          </Form.Item>
          <Form.Item {...validate('password')}>
            <Input.Password
              placeholder="Input password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              size="large"
            />
          </Form.Item>
          <Form.Item {...validate('rePassword')}>
            <Input.Password
              placeholder="Re-input password"
              name="rePassword"
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Link to="/login" className={styles.registerLink}>
              Login if you are already a member
            </Link>
          </Form.Item>

          <Button htmlType="submit" block size="large">
            Register
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default RegisterPage;
