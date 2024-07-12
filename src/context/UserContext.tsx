import React from 'react';
import { UserContextType, IUser } from '../@types/user';
import { Snackbar, Alert } from '@mui/material';

export const UsersContext = React.createContext<UserContextType | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [openNotif, setOpenNotif] = React.useState<boolean>(false);
  const [notifMsg, setNotifMsg] = React.useState<string>('');

  const setUserList = (users: IUser[]) => setUsers(users);

  const saveUser = (user: IUser) => {
    const newUser: IUser = {
      id: user.id,
      firstName: user.firstName,
      email: user.email,
      image:
        'https://fastly.picsum.photos/id/435/200/300.jpg?hmac=gSfIK7r5rB4f3aJq0RTylep967d4sBRbIUuAOuq433o',
    };
    setUsers([newUser, ...users]);
    showNotif(`Success adding new user!`);
  };

  const updateUser = (id: number, newUser: IUser) => {
    const newList = users.map((user: IUser) => {
      if (user.id === id) return newUser;
      else return user;
    });
    showNotif('User list updated!');
    setUsers(newList);
  };

  const deleteUser = (id: number) => {
    const newList = users.filter((user: IUser) => user.id !== id);
    setUsers(newList);
    showNotif(`User deleted!`);
  };

  const showNotif = (msg: string) => {
    setOpenNotif(true);
    setNotifMsg(msg);
  };

  const NotificationSet = ({ msg }: { msg: string }) => {
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openNotif}
        onClose={() => setOpenNotif(false)}
        autoHideDuration={1500}>
        <Alert severity="success" variant="filled">
          {msg}
        </Alert>
      </Snackbar>
    );
  };

  return (
    <UsersContext.Provider
      value={{ users, setUserList, saveUser, updateUser, deleteUser }}>
      <>
        {children}
        <NotificationSet msg={notifMsg} />
      </>
    </UsersContext.Provider>
  );
};

export default UserProvider;
