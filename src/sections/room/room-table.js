import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialog from '../dialog-confirm'

export const RoomsTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => { },
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    handleOpenEdit,
    handleDeleteRoom,
    id,
    setId
  } = props;

  const [open, setOpen] = useState(false);

  const handleClickEdit = (id) => {
    handleOpenEdit(id);
  };

  const handleClickDelete = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    handleDeleteRoom(id)
    handleClose()
  }
  return (
    <Card>
      <Box >
        <Table>
          <TableHead>
            <TableRow >
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Image
              </TableCell>
              <TableCell>
                Discription
              </TableCell>
              <TableCell>
                Adults Max
              </TableCell>
              <TableCell>
                Children Max
              </TableCell>
              <TableCell>
                Price
              </TableCell>
              <TableCell>
                Type
              </TableCell>
              <TableCell>
                Status
              </TableCell>
              <TableCell>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {items.map((room) => {
              return (
                <TableRow
                  hover
                  key={room.id}
                >
                  <TableCell>
                    {room.name}
                  </TableCell>
                  <TableCell>
                    {room.image}
                  </TableCell>
                  <TableCell>
                    {room.discription}
                  </TableCell>
                  <TableCell>
                    {room.adults_max}
                  </TableCell>
                  <TableCell>
                    {room.children_max}
                  </TableCell>
                  <TableCell>
                    {room.price}
                  </TableCell>
                  <TableCell>
                    {room.type}
                  </TableCell>
                  <TableCell>
                    {room.status}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit" color='red'>
                      <IconButton color='primary' onClick = {()=>handleClickEdit(room.id)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" >
                      <IconButton color='error' onClick={()=>handleClickDelete(room.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <AlertDialog
        title='Delete Confirmation'
        handleClose={handleClose}
        handleDelete={handleDelete}
        content='Are you sure you want to delete this room?'
        open={open}
        setOpen={setOpen} />
    </Card>
  );
};
