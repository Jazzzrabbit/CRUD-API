import users from '../data/users.json' assert { type: 'json' };
import { IUser } from '../interface/IUser.js';

export const findAllUsers = (): Promise<IUser[]> => {
  return new Promise((res, rej) => {
    res(JSON.parse(JSON.stringify(users)));
  });
};

export const findUser = (id: number): Promise<IUser | undefined> => {
  return new Promise((res, rej) => {
    const allUsers: IUser[] = JSON.parse(JSON.stringify(users));
    const user: IUser | undefined = allUsers.find((user: IUser) => user.id === id);

    res(user);
  });
}