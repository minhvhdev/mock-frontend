import { useCallback, useMemo, useState } from 'react';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { BookingsTable } from '../../sections/booking/booking-table';
import { BookingsSearch } from '../../sections/booking/booking-search';
import { applyPagination } from '../../sections/apply-pagination';


const data = [
    {
        id: '5e887ac47eed2530f91be10c2b',
        email: 'carson.darrin@devias.io',
        name: 'Carson Darrin1',
        phone_number: '304-428-3097',
        username: 'anh'
    },
    {
        id: '5e887ac47eed2h53091be10cb',
        email: 'carson.darrin@devias.io',
        name: 'Carson Darrin2',
        phone_number: '304-428-3097',
        username: 'anh'
    },
    {
        id: '5e887ac47eed2d53091be10cb2',
        email: 'carson.darrin@devias.io',
        name: 'Carson Darrin3',
        phone_number: '304-428-3097',
        username: 'anh'
    },
    {
        id: '5e887ac47eed2a533091be10cb',
        email: 'carson.darrin@devias.io',
        name: 'Carson Darrin4',
        phone_number: '304-428-3097',
        username: 'anh'
    },
    {
        id: '5e887ac47e4ed25g3091be10cb',
        email: 'carson.darrin@devias.io',
        name: 'Carson Darrin5',
        phone_number: '304-428-3097',
        username: 'anh'
    },
    {
        id: '5e887ac457eed253d091be10cb',
        email: 'carson.darrin@devias.io',
        name: 'Carson Darrin7',
        phone_number: '304-428-3097',
        username: 'anh'
    },
    {
        id: '5e887ac476eed253t091be10cb',
        email: 'carson.darrin@devias.io',
        name: 'Carson Darrin6',
        phone_number: '304-428-3097',
        username: 'anh'
    },
    {
        id: '5e887ac47e23ed253091bre10cb',
        email: 'carson.darrin@devias.io',
        name: 'Carson Darrin8',
        phone_number: '304-428-3097',
        username: 'anh'
    },
    {
        id: '5e887ac47e65ed253091be1f0cb',
        email: 'carson.darrin@devias.io',
        name: 'Carson Darrin9',
        phone_number: '304-428-3097',
        username: 'anh'
    },
    {
        id: '5e887ac47eed25233091be103cb',
        email: 'carson.darrin@devias.io',
        name: 'Carson Darrin11s',
        phone_number: '304-428-3097',
        username: 'anh'
    }
];

const useBookings = (page, rowsPerPage) => {
    return useMemo(
        () => {
            return applyPagination(data, page, rowsPerPage);
        },
        [page, rowsPerPage]
    );
};



const Booking = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const bookings = useBookings(page, rowsPerPage);

    const [id, setId] = useState();
    const [isAdd, setIsAdd] = useState(false);
    const [openForm, setOpenForm] = useState(false);


    const handleClickOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };

    const handleOpenAdd = () => {
        setIsAdd(true)
        handleClickOpenForm()
    }

    const handleOpenEdit = (id) => {
        setId(id)
        setIsAdd(false)
        console.log(id)
        handleClickOpenForm()
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
                                    Bookings
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
                        </Stack>
                        <BookingsSearch />
                        <BookingsTable
                            count={data.length}
                            items={bookings}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            openForm={openForm}
                            handleOpenEdit={handleOpenEdit}
                            handleAdd={handleAdd}
                            handleEdit={handleEdit}
                            id={id}
                            setId={setId}
                        />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default Booking;