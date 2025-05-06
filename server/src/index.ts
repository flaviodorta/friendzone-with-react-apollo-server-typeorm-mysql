import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { AppDataSource } from './typeorm/config/data-source.ts';
import { typeDefs, resolvers } from './graphql/schema.ts';
import { context } from './graphql/context.ts';

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

const users = [
  {
    id: '1',
    name: 'Joe',
    email: 'joe@gmail.com',
    password: '1234',
    avatar_url: 'asd',
    bio: 'asd',
    created_at: 'asdd',
  },
];

async function startServer() {
  try {
    // await AppDataSource.initialize();
    await waitForDatabaseConnection(() => AppDataSource.initialize());
    console.log('TypeORM conectado ao MySQL com sucesso!');

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context,
    });

    console.log(`🚀 Server ready at: ${url}`);
  } catch (err) {
    console.log('Erro ao iniciar o servidor', err);
  }
}

startServer();
