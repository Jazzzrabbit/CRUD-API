import { IUser } from '../interface/IUser.js';
import { v4 as uuidv4 } from 'uuid';

let users: IUser[] = [];

export const findAllUsers = async (): Promise<IUser[]> => {
  return new Promise((res) => {
    res(JSON.parse(JSON.stringify(users)));
  });
};

export const findUser = async (id: string): Promise<IUser | undefined> => {
  return new Promise((res) => {
    const allUsers: IUser[] = JSON.parse(JSON.stringify(users));
    const user: IUser | undefined = allUsers.find((user: IUser) => user.id === id);
    res(user);
  });
};

export const addUser = async (user: IUser): Promise<IUser> => {
  return new Promise((res) => {
    const newUser: IUser = { ...user, id: uuidv4() };
    users.push(newUser);
    res(newUser);
  });
};

export const update = async (user: IUser, id: string): Promise<IUser> => {
  return new Promise((res) => {
    const index = users.findIndex(user => user.id === id);
    users[index] = { ...user };
    res(users[index]);
  });
};

export const remove = async (id: string) => {
  return new Promise((res) => {
    users = JSON.parse(JSON.stringify(users)).filter((user: IUser) => user.id !== id);
    res(users);
  });
};