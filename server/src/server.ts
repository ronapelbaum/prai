import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import { registerRoutes } from './router';


dotenv.config();

const buildServer = async () => {
  const app = Fastify({ logger: true });
  await app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS']
  });

  await registerRoutes(app);

  return app;
};

const start = async () => {
  const app = await buildServer();
  const port = Number(process.env.PORT || 3000);
  const host = process.env.HOST || '0.0.0.0';
  try {
    await app.listen({ port, host });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
