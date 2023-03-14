import { Module } from "@nestjs/common";
import { AppConfigurationSchema } from "./config/app.configuration";
import {
  ConfigFactory,
  ConfigModule,
  HealthModuleBuilder,
  LoggerModuleBuilder,
  LoggerModuleConfigurationSchema,
} from "@flowcore/microservice";
import { HealthController } from "./health.controller";
import { HealthCheckModule } from "./health-check/health-check.module";

const config = ConfigModule.forRoot(
  new ConfigFactory()
    .withSchema(AppConfigurationSchema)
    .withSchema(LoggerModuleConfigurationSchema),
);

@Module({
  imports: [
    config,
    new LoggerModuleBuilder().withConfig(config).build(),
    new HealthModuleBuilder().usingController(HealthController).build(),
    HealthCheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
