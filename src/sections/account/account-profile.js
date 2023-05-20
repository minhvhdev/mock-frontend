import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
  } from '@mui/material';
  
  const user = {
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjWVvw0DUF2C-dcl080kglWbH6HhIyk3Vcg&usqp=CAU',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Anika Visser',
    timezone: 'GTM-7'
  };
  
  export const AccountProfile = () => (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 140,
              mb: 2,
              width: 140
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {user.name}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.city} {user.country}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Button
          fullWidth
          variant="contained"
          type='file'
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );