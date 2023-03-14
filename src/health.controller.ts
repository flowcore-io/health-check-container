import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckResult } from "@nestjs/terminus";
import { HealthService } from "@flowcore/microservice";

@Controller()
export class HealthController {
  constructor(private health: HealthService) {}

  @Get("/")
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check();
  }
}
