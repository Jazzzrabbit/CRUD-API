import { findAllUsers, findUser, addUser, update, remove } from "../model/userModel.js";
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
      };

      const newUser = await addUser(user);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newUser));
    });   
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>, id: string): Promise<void> => {
  try {
    const user: IUser | undefined = await findUser(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
    
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    })

    req.on('end', async (): Promise<http.ServerResponse<http.IncomingMessage>> => {
      const { username, age, hobbies } = JSON.parse(body);

      const updatedUser = {
        username: username || user?.username,
        age: age || user?.age,
        hobbies: hobbies || user?.hobbies,
        id: user?.id
      };

      await update(updatedUser, id);
      return res.end(JSON.stringify(updatedUser));
    })

  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>, id: string): Promise<void> => {
  try {
    const user: IUser | undefined = await findUser(id);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      await remove(id);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User with id ${id} deleted` }));
    }
  } catch (error) {
    console.error(error);
  }
};