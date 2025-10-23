import express from "express";

import healthRouter from "./routes/healthRouter.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/health-check", healthRouter);

app.get("/", (req, res) => {
	return res.status(200).json({
		message: "CI/CD Practice App",
		version: process.env.APP_VERSION || "1.0.0",
		environment: process.env.NODE_ENV || "development",
		timestamp: new Date().toISOString()
	});
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		error: "Something went wrong..."
	});
});

app.listen(PORT, (error) => {
	if (!error) {
		console.log(`Server running on port ${PORT}`);
		console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
	}
});

export default app;