import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Friendship } from './friendship.entity.ts';
import { Session } from './session.entity.ts';
import { Post } from './post.entity.ts';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  profilePhotoUrl: string;

  @Column({ nullable: true })
  backgroundPhotoUrl: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'date' })
  birthday: Date;

  @OneToMany(() => Friendship, (friendship) => friendship.requester)
  sentFriendRequests: Friendship[];

  @OneToMany(() => Friendship, (friendship) => friendship.recipient)
  receivedFriendRequests: Friendship[];

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  // @OneToMany(() => Post, (post) => post.author)
  // posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
