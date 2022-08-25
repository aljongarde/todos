import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: "users"})
export class UserEntity {
    @PrimaryGeneratedColumn()
    user_id: number

    @Column()
    fname: string

    @Column()
    mname: string

    @Column()
    lname: string

    @Column()
    bday: string

    @Column()
    gender: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    password: string

    @Column()
    profile_pic: string

    @Column()
    datetime_added: string

}