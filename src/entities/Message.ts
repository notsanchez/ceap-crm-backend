import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    contact_id: string;

    @Column()
    message: string;

    @Column()
    sended: boolean;

    @Column()
    approved: boolean;

    @Column()
    approved_by: string;

    @Column({ type: 'datetime' })
    sended_at: Date;

    @Column({ type: 'datetime' })
    created_at: Date;


    constructor(contact_id: string, message: string, sended: boolean, approved: boolean, approved_by: string, sended_at: Date) {
        this.contact_id = contact_id;
        this.message = message;
        this.sended = sended;
        this.approved = approved;
        this.approved_by = approved_by;
        this.sended_at = sended_at;
        
        this.created_at = new Date();
        
    }
}
