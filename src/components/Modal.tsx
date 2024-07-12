import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import { UserContextType, IUser } from '../@types/user';
import { UsersContext } from '../context/UserContext';
import FormInputUser from './FormUser';
import { Stack } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  open: boolean;
  user: IUser;
  handleClose: () => void;
}

const ModalDetailUser: React.FC<ModalProps> = ({ open, user, handleClose }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={open}>
          <Box sx={style}>
            <Stack direction={'row'} spacing={1}>
              <Avatar alt={user.firstName} src={user.image} />
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"></Typography>
              <Stack direction='column' spacing={0.2}>
                <Typography id="transition-modal-description" >
                  {user.firstName}
                </Typography>
                <Typography id="transition-modal-description" fontSize={12}>
                  {user.email}
                </Typography>
                <Typography id="transition-modal-description" fontSize={12}>
                  {user.phone}
                </Typography>
                {(user.gender && user.age) &&
                <Typography id="transition-modal-description" fontSize={12}>
                  {user.gender}, {user.age} years old.
                </Typography>}
              </Stack>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

const ModalActionUser: React.FC<ModalProps> = ({ user, open, handleClose }) => {
  const { users, saveUser, updateUser } = React.useContext(
    UsersContext,
  ) as UserContextType;
  const [newUser, setNewUser] = React.useState<IUser>(user);
  const [errorBox, setErrorBox] = React.useState<boolean>(false);

  React.useEffect(() => {
    setNewUser(user);
  }, [user]);

  const action: string = user.id === 0 ? 'add' : 'edit';

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={open}>
          <Stack sx={style} spacing={{ xs: 3 }}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{ marginBottom: '20px' }}>
              {`${action === 'add' ? 'Add' : 'Edit'} User`}
            </Typography>
            {errorBox && (
              <Stack
                direction={'row'}
                spacing={2}
                sx={{ p: 2, backgroundColor: '#facfd5', borderRadius: '10px' }}>
                <CloseRounded fontSize='small' />
                <Typography fontWeight={'bold'} fontSize={14}>
                  Please check all required field
                </Typography>
              </Stack>
            )}
            <FormInputUser
              user={newUser}
              setUser={setNewUser}
              handleClose={handleClose}
              submitAction={() => {
                if (!newUser.email && !newUser.firstName) {
                  setErrorBox(true);
                  return;
                }
                if (action === 'add')
                  saveUser({ ...newUser, id: users.length + 1 });
                else updateUser(user.id, newUser);
                setErrorBox(false);
                handleClose();
              }}
            />
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
};

export { ModalDetailUser, ModalActionUser };
