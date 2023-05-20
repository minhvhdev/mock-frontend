import React from 'react';
import { Link } from 'react-router-dom';
import { commaMoneyAmount } from '../../helpers';
import styles from './room-card.module.scss';

const RoomCard = ({ room }) => {
  return (
    <Link to={`/room-detail/${room.id}`}>
      {console.log(room)}
      <div className={styles.container}>
        <img src={room.images[0].imageUrl} alt={room.name} />
        <div className={styles.info}>
          <div className={styles.name}>{room.name}</div>
          <div className={styles.price}>Price per night: ${commaMoneyAmount(room.price)}</div>
          <div className={styles.status}>{room.status}</div>
        </div>
      </div>
    </Link>
  );
};

RoomCard.propTypes = {};

export default RoomCard;
