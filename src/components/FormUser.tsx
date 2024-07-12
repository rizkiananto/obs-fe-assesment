import { Button, TextField, Stack } from '@mui/material';
import { IUser } from '../@types/user';

interface InputData {
  user: IUser;
  setUser: (user: IUser) => void;
  submitAction: () => void;
  handleClose: () => void;
}

const FormInputUser = (props: InputData) => {
  const { user, setUser, submitAction, handleClose } = props;
  const handleChange = (event: any) => {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    if (id === 'input-name') setUser({ ...user, firstName: value });
    else setUser({ ...user, email: value });
  };

  return (
    <>
      <TextField
        required
        id="input-name"
        label="Name"
        variant="standard"
        defaultValue={user.firstName}
        onChange={handleChange}
        sx={{ width: '100%' }}
      />
      <TextField
        required
        id="input-email"
        label="Email"
        variant="standard"
        defaultValue={user.email}
        onChange={handleChange}
        sx={{ width: '100%' }}
      />
      <Stack direction={'row'} spacing={2}>
        <Button
          sx={{ flexGrow: 1 }}
          variant="text"
          color="error"
          onClick={handleClose}>
          Cancel
        </Button>
        <Button sx={{ flexGrow: 1 }} variant="contained" onClick={submitAction}>
          Submit
        </Button>
      </Stack>
    </>
  );
};

export default FormInputUser;
