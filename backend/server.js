require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT:", err.message, err.stack);
  process.exit(1);
});
process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED:", reason);
});

console.log("Starting server with NODE_ENV=" + process.env.NODE_ENV + " PORT=" + process.env.PORT);

const express = require("express");
const cors = require("cors");
const path = require("path");
const { rateLimit } = require("express-rate-limit");
const contactRoutes = require("./src/routes/contact");
const chatRoutes = require("./src/routes/chat");

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === "production";

console.log("PORT resolved to:", PORT);
console.log("isProduction:", isProduction);

if (!isProduction) {
  app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
}

app.use(express.json());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50 });
app.use("/api", limiter);

app.use("/api/contact", contactRoutes);
app.use("/api/chat", chatRoutes);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

if (isProduction) {
  const frontendDist = path.join(__dirname, "../frontend/dist");
  console.log("Serving static files from", frontendDist);
  app.use(express.static(frontendDist));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

app.listen(PORT, () => console.log("Server listening on port " + PORT));
