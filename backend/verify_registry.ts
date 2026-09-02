import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';

async function bootstrap() {
  console.log('Initializing application context...');
  const app = await NestFactory.createApplicationContext(AppModule);
  // ToolRegistry prints its registered tools on module init
  await app.close();
}

bootstrap().catch(err => {
  console.error('Error during startup:', err);
  process.exit(1);
});
