import express from "express";
import database from "../models/database.js";

const router = express.Router();

router.get("/health-check", async (req, res) => {
	try {
		const dbStatus = await database.getStatus();

		const health = {
			status: "ok",
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
			environment: process.env.NODE_ENV || "development",
			version: process.env.APP_VERSION || "1.0.0",
			database: dbStatus,
			memory: {
				used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
				total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
			}
		};

		res.status(200).json(health);
	} catch (err) {
		console.error("Health check failed:", err);
		res.status(503).json({
			status: "error",
			timestamp: new Date().toISOString(),
			error: err.message
		});
	}
});

export default router;