import { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ModalDetailUser, ModalActionUser } from '../components/Modal';
import { UserContextType, IUser } from '../@types/user';
import UserProvider from '../context/UserContext';
import { UsersContext } from '../context/UserContext';
import UserCard from '../components/Card';

const defaultUser: IUser = {
  id: 0,
  firstName: '',
  email: '',
};

export const Users = () => {
  const [user, setUser] = useState<IUser>({ id: 0, firstName: '', email: '' });
  const [open, setOpen] = useState<boolean>(false);
  const [openAction, setOpenAction] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
    setOpenAction(false);
  };

  const renderNewUserModal = () => {
    setUser(defaultUser);
    setOpenAction(true);
  };

  return (
    <UserProvider>
      <Stack sx={{width: '100%', height: '100%'}} spacing={{ xs: 3 }}>
        <UserListHeader openModal={renderNewUserModal} />
        <UserList
          setOpen={setOpen}
          setUser={setUser}
          setOpenAction={setOpenAction}
        />
      </Stack>
      {open && (
        <ModalDetailUser open={open} user={user} handleClose={handleClose} />
      )}
      {openAction && (
        <ModalActionUser
          open={openAction}
          user={user}
          handleClose={handleClose}
        />
      )}
    </UserProvider>
  );
};

const UserListHeader = ({ openModal }: { openModal: () => void }) => {
  return (
    <Stack spacing={{ xs: 1 }} sx={{ alignItems: 'center', width: 1 }} direction="row">
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        User List
      </Typography>
      <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
        <Button
          variant="contained"
          sx={{ textTransform: 'capitalize' }}
          onClick={openModal}>
          + Add User
        </Button>
      </Box>
    </Stack>
  );
};

const UserList = ({
  setUser,setOpen,setOpenAction,
}: {
  setUser: (user: IUser) => void;
  setOpen: (status: boolean) => void;
  setOpenAction: (status: boolean) => void;
}) => {
  const { users, setUserList } = useContext(UsersContext) as UserContextType;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = () => {
    fetch('https://dummyjson.com/users?sortBy=id&order=desc')
      .then((response) => response.json())
      .then((res) => {
        const { users } = res;
        // setUserList([]);
        setUserList(users);
        setIsLoading(false)
      });
  };

  const showModalDetail = (user: IUser) => {
    setUser(user);
    setOpen(true);
  };

  const showModalEdit = (user: IUser) => {
    setUser(user);
    setOpenAction(true);
  };

  return (
    <>
      {isLoading ? 
      <Box sx={{flexGrow: 1, width: '100%', height: '100%'}}>
        <Typography textAlign={'center'} sx={{marginTop: 15}}>Loading...</Typography>
      </Box> :
      <>
        {users && users.length < 1 && (
          <Box sx={{flexGrow: 1, width: '100%', height: '100%'}}>
            <Typography textAlign={'center'} sx={{marginTop: 15, color: '#ababab'}}>No Data Available..</Typography>
          </Box>
        )}
        <Grid container spacing={2}>
          {users
            ? users.map((user: any) => {
                return (
                  <UserCard
                    key={user.id}
                    user={user}
                    showDetail={() => showModalDetail(user)}
                    showEdit={() => showModalEdit(user)}
                  />
                );
              })
            : null}
        </Grid>
      </>}
    </>
  );
};
