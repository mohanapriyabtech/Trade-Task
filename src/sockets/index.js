import { createServer } from 'http';
import { Server } from 'socket.io';

import { env } from '../configs/env';

const httpServer = createServer();

const io = new Server(httpServer, {
  // options
});

io.on('connection', (socket) => {
  // ...
  console.log('A new client connected');
});

httpServer.listen(env.SOCKET_PORT || 8001);