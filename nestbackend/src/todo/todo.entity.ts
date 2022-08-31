import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "todos"})
export class TodoEntity {
    @PrimaryGeneratedColumn()
    todo_id: number

    @Column()
    user_id: number

    @Column()
    description: string

    @Column()
    isDone: number

    @Column()
    datetime_scheduled: string

    @Column()
    datetime_added: string

}