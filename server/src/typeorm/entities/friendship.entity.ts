import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity.ts';

export type FriendshipStatus = 'pending' | 'accepted' | 'rejected';

@Entity()
export class Friendship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.sentFriendRequests, { eager: true })
  requester: User;

  @ManyToOne(() => User, (user) => user.receivedFriendRequests, { eager: true })
  recipient: User;

  @Column({
    type: 'enum',
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  })
  status: FriendshipStatus;

  @Column({ default: false })
  isSeen: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
