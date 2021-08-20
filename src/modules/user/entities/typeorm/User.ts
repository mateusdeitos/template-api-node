import { UserStatus, UserStatusType } from '@modules/user/dto/ICreateUserDTO';
import { Exclude } from 'class-transformer';
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export default class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar')
	nome: string;

	@Column({ type: 'varchar', unique: true })
	email: string;

	@Exclude()
	@Column('varchar')
	password: string;

	@Column({ type: 'varchar', default: 'inactive' })
	status: UserStatusType;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
