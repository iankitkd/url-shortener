import { createServer } from './app.js';

async function bootstrap() {
  try {
    const app = await createServer();

    const port = Number(process.env.PORT ?? 3000);
    const host = process.env.HOST ?? '0.0.0.0';

    await app.listen({ port, host });

    app.log.info(`API running on http://${host}:${port}`);
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

bootstrap();
