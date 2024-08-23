import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    full_name: string;

    constructor(email: string, password: string, full_name: string) {
        this.email = email;
        this.password = password;
        this.full_name = full_name;
    }
}
