import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity.ts';
import { Friendship } from '../friendship/friendship.entity.ts';

export type NotificationType = 'friend_request' | 'tag' | 'like' | 'comment';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ['friend_request', 'tag', 'like', 'comment'],
  })
  type: NotificationType;

  @ManyToOne(() => User, { eager: true })
  recipient: User;

  @ManyToOne(() => User, { eager: true })
  actor: User;

  @ManyToOne(() => Friendship, { nullable: true })
  friendship: Friendship;

  @Column({ default: false })
  isSeen: boolean;

  @Column({ nullable: true })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
