import http from 'http';
import * as dotenv from 'dotenv';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controller/userController';
import { validate } from 'uuid';

dotenv.config();

export const startServer = (port: string | number) => {
  http
    .createServer((req, res) => {
      const url: string[] = req.url?.split('/') || [];
      const id: string = req.url?.split('/')[3] || '';

      if (url && url.length < 5) {
        switch (req.method) {
          case ('GET'): {
            if (req.url === '/api/users') getAllUsers(req, res);
            else if (url.length === 4 && id !== '') {       
              if (validate(id)) {
                getUserById(req, res, id);
              } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User id is invalid' }));
              }
            } else {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'Route not found' }));
            }
            break;
          }
          case ('POST'): {
            if (req.url === '/api/users') createUser(req, res);
            break;
          }
          case ('PUT'): {
            if (validate(id)) {
              updateUser(req, res, id);
            } else {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'User id is invalid' }));
            }
            break;
          }
          case ('DELETE'): {
            if (validate(id)) {
              deleteUser(req, res, id);
            } else {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'User id is invalid' }));
            }
            break;
          }
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
      }
    })
    .listen(port, () => {
      console.log(`Server is up and running on port ${port}`);
    })
};