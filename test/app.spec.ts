import { NestApplicationBuilder } from "@jbiskur/nestjs-test-utilities";
import { AppModule } from "../src/app.module";
import supertest from "supertest";
import * as dotenv from "dotenv";
import * as path from "path";

describe("Health Check Service (e2e)", () => {
  it("should return a healthy status", async () => {
    const app = await new NestApplicationBuilder()
      .withTestModule((builder) => builder.withModule(AppModule))
      .build();

    const response = await supertest(app.getHttpServer()).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: "ok",
      }),
    );

    await app.close();
  });

  it("should return unhealthy status", async () => {
    dotenv.config({
      path: path.join(__dirname, ".env.fail"),
      override: true,
    });
    const app = await new NestApplicationBuilder()
      .withTestModule((builder) => builder.withModule(AppModule))
      .build();

    const response = await supertest(app.getHttpServer()).get("/");

    expect(response.status).toBe(200);
    expect(response.body.info).toEqual(
      expect.objectContaining({
        service: expect.objectContaining({
          status: "down",
        }),
      }),
    );

    await app.close();
  });

  it("should return unhealthy status when an error is thrown", async () => {
    dotenv.config({
      path: path.join(__dirname, ".env.throw"),
      override: true,
    });
    const app = await new NestApplicationBuilder()
      .withTestModule((builder) => builder.withModule(AppModule))
      .build();

    const response = await supertest(app.getHttpServer()).get("/");

    expect(response.status).toBe(500);
    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: 500,
        message: "Internal server error",
      }),
    );

    await app.close();
  });

  it("should return unhealthy status when a timeout occurs", async () => {
    dotenv.config({
      path: path.join(__dirname, ".env.timeout"),
      override: true,
    });
    const app = await new NestApplicationBuilder()
      .withTestModule((builder) => builder.withModule(AppModule))
      .build();

    try {
      await supertest(app.getHttpServer()).get("/").timeout(2000);
    } catch (e: any) {
      expect(e.message).toBe("Timeout of 2000ms exceeded");
    }
  });
});
