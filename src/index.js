import http from 'http';
import chalk from "chalk";

import mongoose from './database/connection';
import { env } from './configs/env';
// import { bootLogs } from './logs';

const app = require('./routes/routes')();

// app.use('*', (req, res) => {
//   console.log(req.route);
//     return res.status(404).json({
//       status: 'false',
//       message: 'You reached a route that is not defined on this server',
//       status_code: 404,
//       data: { },
//     });
// });


const server = http.createServer(app);

// bootLogs();

/**
 * TODO node cluster module
 */
server.listen(5000, () => { console.log(chalk.greenBright.bold.italic(`app running on port ${env.PORT}`)); });


