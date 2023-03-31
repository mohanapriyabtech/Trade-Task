
import chalk from 'chalk';
import mongoose from 'mongoose';
import { env } from '../configs/env';

const { applicationMessages } = require('../lang/lang')('en');

if(env.MONGODB_PASSWORD == '' || env.MONGODB_PASSWORD == undefined){
    console.log(chalk.blueBright.bold('Mongodb Connecting without password'));
    console.log(chalk.magenta.bold(`mongodb://${env.MONGODB_HOST}:${env.MONGODB_PORT}/${env.MONGODB_DB_NAME}`))
    mongoose.set('strictQuery', true);
    mongoose.connect(`mongodb://${env.MONGODB_HOST}:${env.MONGODB_PORT}/${env.MONGODB_DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });
}
else{
    console.log('Mongodb Connecting with password');
    const URI = `mongodb://${env.MONGODB_USERNAME}:${env.MONGODB_PASSWORD}@${env.MONGODB_HOST}:${env.MONGODB_PORT}/${env.MONGODB_DB_NAME}?authMechanism=DEFAULT&authSource=admin`
    mongoose.set('strictQuery', true);
    console.log("connecting...")
    mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
}

// when successfully connected
mongoose.connection.on('connected', () => {
    console.log(chalk.yellowBright.bold.italic(applicationMessages.MONGODB_CONNECTION_SUCCESS));
});

// if the connection throws an error
mongoose.connection.on('error', (err) => {
    //   if you get error for the first time when this gets started make sure to run mongodb
    console.log('Mongodb connection failed', err);
});

// when the connection is disconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongodb disconnected');
});