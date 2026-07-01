require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const authRoute = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 8001;
const MONGO_URI =
  // process.env.MONGO_URI || "mongodb://localhost:27017/linkforge";
  process.env.MONGO_URI;
if (!process.env.JWT_SECRET) {
  console.warn(
    "WARNING: JWT_SECRET is not set ; set one before using login/signup."
  );
}

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];

app.use(
  cors({
    origin(origin, callback) {
      console.log("Origin:", origin);

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => res.json({ status: "LinkForge API is running" }));

app.use("/api/auth", authRoute);
app.use("/api/url", urlRoute);

connectToMongoDB(MONGO_URI)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.error("Mongodb connection error:", err.message));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
