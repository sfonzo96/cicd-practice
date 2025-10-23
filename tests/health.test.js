import request from "supertest";
import app from "../src/app.js";

describe("Health Test", () => {
	test("GET /health-check should return check status", async () => {
		const response = await request(app).get("/health-check").expect(200);

		expect(response.body).toHaveProperty("status", "ok");
		expect(response.body).toHaveProperty("timestamp");
		expect(response.body).toHaveProperty("uptime");
		expect(response.body).toHaveProperty("environment");
		expect(response.body).toHaveProperty("database");
	});

	test("GET / should return app info", async () => {
		const response = await request(app).get("/").expect(200);

		expect(response.body).toHaveProperty("message", "CI/CD Practice App");
		expect(response.body).toHaveProperty("version");
		expect(response.body).toHaveProperty("environment");
	});
});