import { findAllUsers, findUser, addUser } from "../model/userModel.js";
import http, { ServerResponse } from 'http';
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

export const getUserById = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>, id: string): Promise<void> => {
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

export const createUser = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>): Promise<void> => {
  try {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    })

    req.on('end', async (): Promise<http.ServerResponse<http.IncomingMessage>> => {
      const { username, age, hobbies } = JSON.parse(body);

      if (!username || typeof username !== 'string') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Username is required and must be a string' }));
      } else if (!age || typeof age !== 'number') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Age is required and must be a number' }));
      } else if (!hobbies || !Array.isArray(hobbies)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hobbies are required and must be an array' }));
      }

      const user: IUser = {
        username,
        age, 
        hobbies
      }

      const newUser = await addUser(user);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newUser));
    })
    
  } catch (error) {
    console.error(error);
  }
}