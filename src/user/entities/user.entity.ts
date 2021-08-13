import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { UserSession } from "../../user-session/entities/user-session.entity";

@Entity('users')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:string;
    
    @Column()
    name:string;
    
    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @Column('bool')
    is_buyer: boolean;

    @Column('bool')
    is_seller: boolean;

    @BeforeInsert()
    hashPassword() {
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
        this.password = bcrypt.hashSync(this.password, salt);
    }

    //Relation with user-session
    @OneToMany(
        () => UserSession,
        session => session.user,
        )
        sessions: UserSession[];
}
