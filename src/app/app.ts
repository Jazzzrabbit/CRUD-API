import http from 'http';
import * as dotenv from 'dotenv';
import { getAllUsers, getUserById, createUser } from '../controller/userController.js';
import { validate } from 'uuid';

dotenv.config();

const port = process.env.PORT || 3000;

export const startServer = () => {
  http
    .createServer((req, res) => {
      if (req.method === 'GET' && req.url === '/api/users') {
        getAllUsers(req, res);
      } else if (req.method === 'GET' && req.url?.match(/\/api\/users\/([0-9]+)/)) {
        const id: string = req.url.split('/')[3];
        if (validate(id)) {
          getUserById(req, res, id);
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'User id is invalid' }));
        }   
      } else if (req.method === 'POST' && req.url === '/api/users') {
        createUser(req, res)
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
      }
    })
    .listen(port, () => {
      console.log(`Server is up and running on port ${port}`);
    })
};