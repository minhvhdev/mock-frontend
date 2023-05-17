import React, { useState, useEffect } from 'react';
import style from './test.module.scss'
import { Col, Row, Select, Button, Card } from 'antd';
import Input from 'antd/es/input/Input';
import { SearchOutlined } from '@ant-design/icons';

const { Meta } = Card;
const Test = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    'https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=70',
    'https://images.unsplash.com/photo-1533759413974-9e15f3b745ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=70',
    'https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=70'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % images.length
      );
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Row justify='center' className={style.header}>
        <img
          src={images[currentImageIndex]}
          alt="Slider Image"
          className={style.image}
        />
        <Row className={style.search} justify='space-around'>
          <Col span={6}>
            <Row align='middle' justify='space-between'>
              <Col span={9}>
                <label>Room Type</label>
              </Col>
              <Col span={15}>
                <Select
                  defaultValue="lucy"
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                  ]}
                />
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Row align='middle' justify='center'>
              <Col span={9}>
                <label>Adults Max</label>
              </Col>
              <Col span={7}>
                {/* <input type="number" max={5} min={0} defaultValue={0} className={style.numberInput} /> */}
                <Input type='number' max={5} min={0} defaultValue={0}></Input>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Row align='middle' justify='center'>
              <Col span={10}>
                <label>Children Max</label>
              </Col>
              <Col span={7}>
                {/* <input type="number" max={5} min={0} defaultValue={0} className={style.numberInput} /> */}
                <Input type='number' max={5} min={0} defaultValue={0}></Input>
              </Col>
            </Row>
          </Col>
          <Col span={4}>
            <Row>
              <Button icon={<SearchOutlined />} type="primary">Search</Button>
            </Row>
          </Col>
        </Row>
      </Row>
      <Row className={style.carts}>
        <Col span={8} className={style.roomCart}>
          <Card
            className={style.cart}
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Test;

