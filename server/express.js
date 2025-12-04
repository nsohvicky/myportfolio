import express from "express";
import bodyParser from "body-parser";
import compress from "compression";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// route imports
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import ProjectRoutes from "./routes/project.routes.js";
import EducationRoutes from "./routes/education.routes.js";
import ContactRoutes from "./routes/contact.routes.js";

// emulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration - must be before routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// performance + security
app.use(compress());
app.use(helmet());

// API routes
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/api/projects", ProjectRoutes);
app.use("/api/education", EducationRoutes);
app.use("/api/contacts", ContactRoutes);


app.use(express.static(path.join(__dirname, "../client/dist")));

// error handler
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
