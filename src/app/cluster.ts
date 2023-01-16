import * as dotenv from 'dotenv';
import os from 'os';
import cluster from 'cluster';
import { startServer } from './app.js';

dotenv.config();

const pid: number = process.pid;

export const startMultiServer = (port: string | number): void => {
  if (cluster.isPrimary) {
    const cpus: number = os.cpus().length;
    console.log(`Master pid: ${pid}`);
    console.log(`Starting ${cpus} forks`);
    for (let i = 0; i < cpus; i++) cluster.fork();
  } else {
    const workerId: number = cluster.worker?.id || 0;
    const currentPort: number = +port + workerId - 1;
    console.log(`Worker id: ${workerId}, pid: ${pid}, port: ${currentPort}`);

    startServer(port);
  }
};