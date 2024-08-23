import { DataSource } from 'typeorm';
import { Contact } from './entities/Contact';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'your-username',
    password: 'your-password',
    database: 'your-database',
    entities: [User, Contact],
    //synchronize: true,
    logging: false,
});
