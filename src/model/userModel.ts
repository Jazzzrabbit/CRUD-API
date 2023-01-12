import { IUser } from '../interface/IUser.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

const addToJson = async (pathToFile: string, file: IUser[]): Promise<void> => {
  await fs.writeFile(pathToFile, JSON.stringify(file), 'utf8');
}

export const findAllUsers = async (): Promise<IUser[]> => {
  const users: string = await fs.readFile(path.resolve('./src/data/users.json'), 'utf8');
  return new Promise((res, rej) => {
    res(JSON.parse(users));
  });
};

export const findUser = async (id: string): Promise<IUser | undefined> => {
  const users: string = await fs.readFile(path.resolve('./src/data/users.json'), 'utf8');
  return new Promise((res, rej) => {
    const allUsers: IUser[] = JSON.parse(users);
    const user: IUser | undefined = allUsers.find((user: IUser) => user.id === id);

    res(user);
  });
};

export const addUser = async (user: IUser): Promise<IUser> => {
  const users: string = await fs.readFile(path.resolve('./src/data/users.json'), 'utf8');
  return new Promise((res, rej) => {
    const allUsers: IUser[] = JSON.parse(users);
    const newUser: IUser = { ...user, id: uuidv4() };
    allUsers.push(newUser);
    addToJson(path.resolve('./src/data/users.json'), allUsers);
    res(newUser);
  });
};