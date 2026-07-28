require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.error(err.message);
  process.exit(1);
});
process.on("unhandledRejection", (reason) => {
  console.error(reason);
});

const express = require("express");
const cors = require("cors");
const path = require("path");
const { rateLimit } = require("express-rate-limit");
const contactRoutes = require("./src/routes/contact");
const chatRoutes = require("./src/routes/chat");

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === "production";

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
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

app.listen(PORT, () => console.log("Backend corriendo en puerto " + PORT));
