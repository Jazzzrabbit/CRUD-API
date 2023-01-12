import { findAllUsers, findUser } from "../model/userModel.js";
import http from 'http';
import { IUser } from "../interface/IUser.js";

export const getAllUsers = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>): Promise<void> => {
  try {
    const users: IUser[] = await findAllUsers();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>, id: number): Promise<void> => {
  try {
    const user: IUser | undefined = await findUser(id);
    
    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
    
  } catch (error) {
    console.error(error);
  }
};