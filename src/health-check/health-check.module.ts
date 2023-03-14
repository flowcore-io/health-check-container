import { Module } from "@nestjs/common";
import { HealthyService } from "./health-check.service";

@Module({
  providers: [HealthyService],
})
export class HealthCheckModule {}
