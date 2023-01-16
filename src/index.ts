import { startServer } from "./app/app";
import { startMultiServer } from "./app/cluster";

const port: string | number = process.env.PORT || 3000;
const mode: string = process.env.MODE || 'single';

mode === 'single' ? startServer(port) : startMultiServer(port);


