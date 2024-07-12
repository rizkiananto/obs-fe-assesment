export interface IUser {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  age?: number;
  gender?: string;
  image?: string;
  phone?: string
}

export type UserContextType = {
  users: IUser[];
  setUserList: (users: IUser[]) => void;
  saveUser: (user: IUser) => void;
  deleteUser: (id: number) => void;
  updateUser: (id: number, newUser: IUser) => void;
};

export const newUser: IUser = {
  id: 0,
  firstName: '',
  email: '',
};
