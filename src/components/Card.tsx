import { useContext, FC } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { UserContextType, IUser } from '../@types/user';
import { UsersContext } from '../context/UserContext';
import { Delete, Edit } from '@mui/icons-material';

interface IUserCard {
  user: IUser;
  showEdit?: () => void;
  showDetail?: () => void;
}

const UserCard: FC<IUserCard> = ({ user, showDetail, showEdit }) => {
  const { deleteUser } = useContext(UsersContext) as UserContextType;

  return (
    <Grid item xs={6} md={3} key={user.id}>
      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          gridTemplateColumns: { md: '1fr 1fr' },
          gap: 2,
        }}>
          <Box 
            className='hover-pointer'
            onClick={showDetail}>
            <Typography
              sx={{ margin: 0, fontWeight: 'bold' }}
              noWrap>
              {user.firstName}
            </Typography>
            <Typography sx={{ fontSize: '.9em' }} noWrap>
              {user.email}
            </Typography>
          </Box>
          <Stack direction={{xs: 'column', md: 'row'}} spacing={1} sx={{ marginTop: '1em', flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              size="small"
              color="error"
              sx={{ textTransform: 'capitalize' }}
              startIcon={<Delete />}
              onClick={() => deleteUser(user.id)}>
              Delete
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              sx={{ textTransform: 'capitalize' }}
              startIcon={<Edit />}
              onClick={showEdit}>
              Edit
            </Button>
          </Stack>
      </Box>
    </Grid>
  );
};

export default UserCard;
