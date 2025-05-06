import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Friendship } from '../friendship/friendship.entity.ts';
import { User } from '../user/user.entity.ts';
import { Notification } from '../notification/notification.entity.ts';
import { Post } from '../post/post.entity.ts';

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Friendship, User, Notification, Post],
});
