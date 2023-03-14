import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  ConfigService,
  createSimpleLogger,
  DefaultAppConfiguration,
  LoggerModuleConfiguration,
} from "@flowcore/microservice";
import { AppConfiguration } from "./config/app.configuration";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const config = (await app.resolve(ConfigService)) as ConfigService<
    LoggerModuleConfiguration & DefaultAppConfiguration & AppConfiguration
  >;
  const logger = createSimpleLogger(config.schema);

  app.useLogger(logger);
  app.setGlobalPrefix(config.schema.healthEndpoint);

  const port = config.schema.port;

  await app.listen(port, () => {
    logger.log(`Listening on port ${port}`);
  });
}

bootstrap();
