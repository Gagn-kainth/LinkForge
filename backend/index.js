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

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
].filter(Boolean);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get("/", (req, res) => res.json({ status: "LinkForge API is running" }));

app.use("/auth", authRoute);
app.use("/url", urlRoute);

connectToMongoDB(MONGO_URI)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.error("Mongodb connection error:", err.message));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
