import { CheckHealth, HealthCheckIndicator } from "@flowcore/microservice";
import { Injectable } from "@nestjs/common";
import { HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";

@Injectable()
@HealthCheckIndicator()
export class HealthyService extends HealthIndicator implements CheckHealth {
  async isHealthy(): Promise<HealthIndicatorResult> {
    const delay = process.env.HEALTH_CHECK_DELAY
      ? parseInt(process.env.HEALTH_CHECK_DELAY)
      : 0;
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    const pass = process.env.SHOULD_PASS_HEALTH_CHECK
      ? process.env.SHOULD_PASS_HEALTH_CHECK === "true"
      : true;
    const throwError = process.env.SHOULD_THROW_ERROR_ON_HEALTH_CHECK
      ? process.env.SHOULD_THROW_ERROR_ON_HEALTH_CHECK === "true"
      : false;
    // do some health check logic
    if (throwError) {
      console.log("I am not healthy, thus I throw an error");
      throw new Error("I am not healthy, thus I throw an error");
    }

    if (!pass) {
      return this.getStatus("service", false, { message: "I am not healthy" });
    }

    return this.getStatus("service", true, { message: "I am healthy" });
  }
}
