import React, { useEffect, useState } from 'react';
import { bgHistory } from '../../assets/images';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import RoomTable from '../../components/RoomTable/RoomTable';
import styles from './room-management.module.scss';
const RoomManagement = () => {
    return (
        <div className={styles.container}>
            <div className={styles.headerImg}>
                <img src={bgHistory} alt="bgHistory" />
            </div>
            <div className={styles.content}>
                <Breadcrumb currentPage="Room management" />

                <RoomTable />

            </div>
        </div>
    )
}

export default RoomManagement;