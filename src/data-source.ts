require('dotenv').config()

import { DataSource } from 'typeorm';
import { Contact } from './entities/Contact';
import { Message } from './entities/Message';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Contact, Message],
    synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
    logging: true,
});
