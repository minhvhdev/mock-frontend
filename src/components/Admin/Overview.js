import * as React from 'react';

import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { OverviewTotalBookings } from '../../sections/overview/overview-bookings';
import { OverviewTotalUsers } from '../../sections/overview/overview-users';
import { OverviewTotalRooms } from '../../sections/overview/overview-rooms';
import { OverviewTotalProfits } from '../../sections/overview/overview-profit';
import { OverviewBookings } from '../../sections/overview/overview-sale';
import { OverviewTraffic } from '../../sections/overview/overview-traffic';

function preventDefault(event) {
  event.preventDefault();
}

export default function Overview() {
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
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalBookings
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="24k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalUsers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalRooms
              sx={{ height: '100%' }}
              value="10k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfits
              sx={{ height: '100%' }}
              value="$15k"
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewBookings
              chartSeries={[
                {
                  name: 'This year',
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                },
                {
                  name: 'Last year',
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={['Desktop', 'Tablet', 'Phone']}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  );
}
