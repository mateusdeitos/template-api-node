/* eslint-disable camelcase */
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '@modules/user/entities/typeorm/User';

@Entity('user_tokens')
class UserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  token: string;

  @Column()
  id_user: number;

  @ManyToOne(() => User, user => user.id, { eager: false })
  @JoinColumn({ name: 'id_user' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
