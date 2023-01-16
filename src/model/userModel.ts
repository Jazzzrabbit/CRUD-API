import { IUser } from '../interface/IUser.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

const addToJson = async (pathToFile: string, file: IUser[]): Promise<void> => {
  await fs.writeFile(pathToFile, JSON.stringify(file), 'utf8');
}

export const findAllUsers = async (): Promise<IUser[]> => {
  const users: string = await fs.readFile(path.resolve('./src/data/users.json'), 'utf8');
  return new Promise((res) => {
    res(JSON.parse(users));
  });
};

export const findUser = async (id: string): Promise<IUser | undefined> => {
  const users: string = await fs.readFile(path.resolve('./src/data/users.json'), 'utf8');
  return new Promise((res) => {
    const allUsers: IUser[] = JSON.parse(users);
    const user: IUser | undefined = allUsers.find((user: IUser) => user.id === id);
    res(user);
  });
};

export const addUser = async (user: IUser): Promise<IUser> => {
  const users: string = await fs.readFile(path.resolve('./src/data/users.json'), 'utf8');
  return new Promise((res) => {
    const allUsers: IUser[] = JSON.parse(users);
    const newUser: IUser = { ...user, id: uuidv4() };
    allUsers.push(newUser);
    addToJson(path.resolve('./src/data/users.json'), allUsers);
    res(newUser);
  });
};

export const update = async (user: IUser, id: string): Promise<IUser> => {
  const users: string = await fs.readFile(path.resolve('./src/data/users.json'), 'utf8');
  return new Promise((res) => {
    const allUsers: IUser[] = JSON.parse(users);
    const index = allUsers.findIndex(user => user.id === id);
    allUsers[index] = { ...user };
    addToJson(path.resolve('./src/data/users.json'), allUsers);
    res(allUsers[index]);
  });
};

export const remove = async (id: string) => {
  const users: string = await fs.readFile(path.resolve('./src/data/users.json'), 'utf8');
  return new Promise((res) => {
    const allUsers: IUser[] = JSON.parse(users).filter((user: IUser) => user.id !== id);
    addToJson(path.resolve('./src/data/users.json'), allUsers);
    res(allUsers);
  });
};