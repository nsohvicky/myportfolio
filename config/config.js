const config = {
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolioDB",
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key"
};

export default config;
