import { useCallback, useEffect, useMemo, useState } from 'react';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { RoomsTable } from '../../sections/room/room-table';
import { RoomsSearch } from '../../sections/room/room-search';
import { applyPagination } from '../../sections/apply-pagination';
import FormDialog from '../../sections/form'
import uuid from 'react-uuid';
const dataRoom = [
  {
    id: '5e887ac47eed253091be10cb1',
    name: 'Room 1',
    image: '',
    discription: '/assets/avatars/avatar-carson-darrin.png',
    adults_max: 1,
    children_max: 3,
    price: 1000,
    type: 1,
    status: 1
  },
  {
    id: '5e887ac47eed253091be10cb2',
    name: 'Room 2',
    image: '',
    discription: '/assets/avatars/avatar-carson-darrin.png',
    adults_max: 1,
    children_max: 3,
    price: 1000,
    type: 1,
    status: 1
  },
  {
    id: '5e887ac47eed253091be10cb3',
    name: 'Room 3',
    image: '',
    discription: '/assets/avatars/avatar-carson-darrin.png',
    adults_max: 1,
    children_max: 3,
    price: 1000,
    type: 1,
    status: 1
  },
  {
    id: '5e887ac47eed253091be10cb4',
    name: 'Room 4',
    image: '',
    discription: '/assets/avatars/avatar-carson-darrin.png',
    adults_max: 1,
    children_max: 3,
    price: 1000,
    type: 1,
    status: 1
  }, {
    id: '5e887ac47eed253091be10cb5',
    name: 'Room 5',
    image: '',
    discription: '/assets/avatars/avatar-carson-darrin.png',
    adults_max: 1,
    children_max: 3,
    price: 1000,
    type: 1,
    status: 1
  }, {
    id: '5e887ac47eed253091be10cb6',
    name: 'Room 6',
    image: '',
    discription: '/assets/avatars/avatar-carson-darrin.png',
    adults_max: 1,
    children_max: 3,
    price: 1000,
    type: 1,
    status: 1
  }, {
    id: '5e887ac47eed253091be10cb7',
    name: 'Room 7',
    image: '',
    discription: '/assets/avatars/avatar-carson-darrin.png',
    adults_max: 1,
    children_max: 3,
    price: 1000,
    type: 1,
    status: 1
  }, {
    id: '5e887ac47eed253091be10cb8',
    name: 'Room 8',
    image: '',
    discription: '/assets/avatars/avatar-carson-darrin.png',
    adults_max: 1,
    children_max: 3,
    price: 1000,
    type: 0,
    status: 1
  }, {
    id: '5e887ac47eed253091be10cb9',
    name: 'Room 9',
    image: '',
    discription: '/assets/avatars/avatar-carson-darrin.png',
    adults_max: 1,
    children_max: 3,
    price: 1000,
    type: 1,
    status: 1
  }, {
    id: '1e887ac47eed253091be10cb',
    name: 'Room 10',
    image: '',
    discription: '/assets/avatars/avatar-carson-darrin.png',
    adults_max: 1,
    children_max: 3,
    price: 1000,
    type: 1,
    status: 1
  }
];

const useRooms = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(dataRoom, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};


const Room = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rooms = useRooms(page, rowsPerPage);
  const [isAdd, setIsAdd] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState(dataRoom)
  const [room, setRoom] = useState({
    id: '0',
    name: '',
    image: '',
    discription: '',
    adults_max: 0,
    children_max: 0,
    price: 0,
    type: 1,
    status: 0
  })

  const handleOnChange = useCallback(
    (event) => {
      setRoom((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  console.log(room)
  const handleClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setId(null)
    setRoom({
      id: '0',
      name: '',
      image: '',
      discription: '',
      adults_max: 0,
      children_max: 0,
      price: 0,
      type: 1,
      status: 0
    });
  };

  const handleOpenAdd = () => {
    setIsAdd(true)

    handleClickOpenForm()
  }

  useEffect(() => {
    if (!isAdd) {

    }

  }, [isAdd])

  const handleOpenEdit = (idRoom) => {
    setIsAdd(false)
    let dataEdit = data.filter(x => x.id == idRoom)
    setRoom({
      id: dataEdit[0].id,
      name: dataEdit[0].name,
      image: dataEdit[0].image,
      discription: dataEdit[0].discription,
      adults_max: dataEdit[0].adults_max,
      children_max: dataEdit[0].children_max,
      price: dataEdit[0].price,
      type: dataEdit[0].type,
      status: dataEdit[0].status,
    });

    handleClickOpenForm()
  }

  const handleDeleteRoom = (idRoom) => {

  }
  const handleAdd = () => {
    handleCloseForm()
  }

  const handleEdit = () => {
    handleCloseForm()
  }

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          marginTop: 5
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Rooms
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleOpenAdd}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <RoomsSearch />
            <RoomsTable
              count={data.length}
              items={rooms}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              openForm={openForm}
              handleOpenEdit={handleOpenEdit}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDeleteRoom={handleDeleteRoom}
              id={id}
              setId={setId}
            />
          </Stack>
        </Container>
        <FormDialog
          open={openForm}
          handleClose={handleCloseForm}
          title={isAdd ? 'Add' : 'Edit'}
          handleAddOrEdit={isAdd ? handleAdd : handleEdit}
        >
          <Box
            sx={{
              '& .MuiTextField-root': { mb: 2, width: '100%' },
            }}
          >
            <TextField
              fullWidth
              id="name"
              label="Name"
              name='name'
              onChange={handleOnChange}
              defaultValue={room.name}
              required
              variant="outlined" />
            <TextField
              fullWidth
              id="image"
              label="Image"
              name='image'
              onChange={handleOnChange}
              defaultValue={room.image}
              variant="outlined" />
            <TextField
              multiline
              fullWidth
              id="description"
              label="Description"
              name='description'
              onChange={handleOnChange}
              defaultValue={room.discription}
              variant="outlined" />
            <TextField
              fullWidth
              id="adult"
              label="Adult Max"
              name='adults_max'
              onChange={handleOnChange}
              defaultValue={room.adults_max}
              variant="outlined" />
            <TextField
              fullWidth
              id="child"
              label="Children Max"
              name='children_max'
              onChange={handleOnChange}
              defaultValue={room.children_max}
              variant="outlined" />
            <TextField
              fullWidth
              id="price"
              label="Price"
              type="number"
              
              name='price'
              onChange={handleOnChange}
              defaultValue={room.price}
              variant="outlined" />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="type">Type</InputLabel>
              <Select
                labelId="type"
                id="type"
                value={room.type}
                name='type'
                onChange={handleOnChange}
                label="Type"
              >
                <MenuItem value={0}>Single</MenuItem>
                <MenuItem value={1}>Double</MenuItem>
                <MenuItem value={2}>Triple</MenuItem>
                <MenuItem value={3}>Quad</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="status">Status</InputLabel>
              <Select
                labelId="status"
                id="status"
                name='status'
                onChange={handleOnChange}
                value={room.status}
                label="Status"
              >
                <MenuItem value={0}>In Use</MenuItem>
                <MenuItem value={1}>Not In Use</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </FormDialog>
      </Box>
    </>
  );
};

export default Room;