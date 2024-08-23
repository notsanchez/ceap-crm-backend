import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column()
    company_name: string;

    @Column({ type: 'datetime' })
    created_at: Date;

    @Column({ type: 'datetime' })
    last_message_date: Date;

    @Column({ type: 'datetime' })
    next_message_date: Date;

    @Column()
    message_stage: string;

    constructor(email: string, full_name: string, company_name: string, message_stage: string) {
        this.email = email;
        this.full_name = full_name;
        this.company_name = company_name;
        
        this.created_at = new Date();
        this.last_message_date = new Date();
        this.next_message_date = new Date();

        this.message_stage = message_stage;
        
    }
}
