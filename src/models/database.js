import { Pool } from "pg";

const pool = new Pool({
	host: process.env.DB_HOST || "localhost",
	port: process.env.DB_PORT || 5432,
	database: process.env.DB_NAME || "cicd_practice",
	user: process.env.DB_USER || "postgres",
	password: process.env.DB_PASSWORD || "password",
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

async function getStatus() {
	try {
		const client = await pool.connect();
		const result = await client.query("SELECT NOW() AS current_time");
		client.release();

		return {
			status: "connected",
			current_time: result.rows[0].current_time
		};

	} catch (err) {
		return {
			status: "disconnected",
			error: err.message
		};
	}
}

async function initDatabase() {
	try {
		const client = await pool.connect();
		await client.query(`
				CREATE TABLE IF NOT EXISTS health_logs(
					id SERIAL PRIMARY KEY,
					timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
					status VARCHAR(20),
					message TEXT
				)
			`);
		client.release();
		console.log("Database initialized successfully");
	} catch (err) {
		console.error("Database initialization failed:", err);
		throw err;
	}
}

export default { pool, getStatus, initDatabase };