import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from '@apollo/server';
import { AppDataSource } from './typeorm/config/data-source.ts';
import { typeDefs, resolvers } from './graphql/schema.ts';
import { context } from './graphql/context.ts';
import express from 'express';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';

export async function waitForDatabaseConnection(
  connectFn: () => Promise<any>,
  retries = 10,
  delay = 2000
) {
  for (let i = 1; i <= retries; i++) {
    try {
      console.log(`🔄 Tentando conectar ao banco de dados (tentativa ${i})...`);
      await connectFn();
      console.log('✅ Conectado ao banco de dados!');
      return;
    } catch (err) {
      console.log(`⚠️ Falha na conexão. Tentando novamente em ${delay}ms...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error(
    '❌ Falha ao conectar ao banco de dados após várias tentativas.'
  );
}

async function startServer() {
  try {
    await waitForDatabaseConnection(() => AppDataSource.initialize());
    console.log('TypeORM conectado ao MySQL com sucesso!');

    const app = express();

    app.use(
      cors({
        origin: 'http://localhost:5173',
        credentials: true,
      })
    );

    app.use(express.json());

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();

    app.use('/graphql', expressMiddleware(server, { context }));

    app.listen(4000, () => {
      console.log('🚀 Server running on http://localhost:4000/graphql');
    });
  } catch (err) {
    console.log('Erro ao iniciar o servidor', err);
  }
}

startServer();
