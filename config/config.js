 const config = {
  mongoUri: process.env.MONGODB_URI || "mongodb+srv://venjowen_db_user:Amary05%23@cluster0.xqwxb1l.mongodb.net/portfolioDB?appName=Cluster0",
  env: process.env.NODE_ENV || 'development', 
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key"
}
export default config
