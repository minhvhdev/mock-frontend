import React from 'react';
import styles from './breadcrumb.module.scss';
import PropTypes from 'prop-types';
import { Breadcrumb as AiBreadcrumb } from 'antd';
import BackToHomeButton from '../BackToHomeButton/BackToHomeButton';

const breadcrumbItem = [
  {
    title: 'Home'
  }
];

const Breadcrumb = ({ currentPage }) => {
  return (
    <div className={styles.container}>
      <BackToHomeButton />
      <AiBreadcrumb items={[...breadcrumbItem, { title: currentPage }]} />
    </div>
  );
};

Breadcrumb.propTypes = {
  currentPage: PropTypes.string.isRequired
};

export default Breadcrumb;
