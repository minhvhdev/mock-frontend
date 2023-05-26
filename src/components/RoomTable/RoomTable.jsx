import { useCallback, useEffect, useState } from "react";
import styles from './room-table.module.scss';
import {
    ROOM_TABLE_COLUMNS,
} from '../../constants';
import roomApi from "../../apis/room";
import { Table } from "antd";

const RoomTable = () => {
    const [rooms, setRoom] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);

    const columns = [...ROOM_TABLE_COLUMNS]

    const getRooms = useCallback(async () => {
        try {
            setLoading(true);
            const res = await roomApi.getAll();
            if (res.status === 200) {
                setRoom(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    });

    useEffect(() => {
        getRooms();
    }, []);

    return (
        <div>
            <Table
                loading={loading}
                bordered
                columns={columns}
                dataSource={rooms}
                pagination={{ pageSize: 10 }}
            />
        </div>
    )
}

export default RoomTable;