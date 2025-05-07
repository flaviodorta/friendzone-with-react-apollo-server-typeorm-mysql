import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Friendship } from '../entities/friendship.entity.ts';
import { User } from '../entities/user.entity.ts';
import { Notification } from '../entities/notification.entity.ts';
import { Post } from '../entities/post.entity.ts';
import { Session } from '../entities/session.entity.ts';

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Friendship, User, Notification, Post, Session],
});
