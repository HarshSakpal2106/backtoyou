const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const petRoutes = require("./routes/pets");

const app = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────
// Allow your GitHub Pages frontend (and localhost for dev)
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
  })
);

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.use("/api", authRoutes);
app.use("/api", petRoutes);

// Health check (Railway uses this to confirm app is running)
app.get("/", (req, res) => {
  res.json({ status: "Back2You API is running 🐾" });
});

// ─── START ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
