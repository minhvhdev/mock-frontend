import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import useValidateForm from '../../hooks/useValidateForm';
import styles from './register-page.module.scss';
import { WEBSITE_NAME } from '../../constants';

const RegisterPage = () => {
  const navigate = useNavigate();

  const onClickBack = () => navigate('/');

  const formik = useFormik({
    initialValues: { username: '', password: '', rePassword: '' },
    validationSchema: Yup.object({
      username: Yup.string().required('username is required'),
      password: Yup.string().required('Password is required'),
      rePassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required')
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const { validate } = useValidateForm(formik);

  return (
    <Row className={styles.container} align="middle">
      <Col span={14} className={styles.left}>
        <h1 className={styles.title}>{WEBSITE_NAME}</h1>
      </Col>
      <Col span={10} className={styles.right}>
        <Button className={styles.backButton} shape="circle" size="large" onClick={onClickBack}>
          <ArrowLeftOutlined />
        </Button>
        <h1 className={styles.title}>Login Account</h1>
        <Form onFinish={formik.handleSubmit} className={styles.form}>
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

          <Button type="primary" htmlType="submit" block size="large">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default RegisterPage;
