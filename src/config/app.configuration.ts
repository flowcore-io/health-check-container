import { z } from "zod";
import { ConfigurationSchema } from "@flowcore/microservice";

export const AppConfigurationShape = z.object({
  healthEndpoint: z.string(),
  shouldPassHealthCheck: z.coerce.boolean().default(true),
  shouldThrowErrorOnHealthCheck: z.coerce.boolean(),
  healthCheckDelay: z.coerce.number().optional(),
});
export type AppConfiguration = z.infer<typeof AppConfigurationShape>;

export class AppConfigurationSchema extends ConfigurationSchema {
  context = "app";
  linking = {
    healthEndpoint: {
      env: "HEALTH_ENDPOINT",
      default: "health",
    },
    shouldPassHealthCheck: {
      env: "SHOULD_PASS_HEALTH_CHECK",
      default: true,
    },
    shouldThrowErrorOnHealthCheck: {
      env: "SHOULD_THROW_ERROR_ON_HEALTH_CHECK",
      default: false,
    },
    healthCheckDelay: {
      env: "HEALTH_CHECK_DELAY",
    },
  };
  shape = AppConfigurationShape;

  constructor(overrideDefaults?: { [key: string]: any }) {
    super();
    ConfigurationSchema.override(this.linking, overrideDefaults);
  }
}
