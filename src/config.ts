import "dotenv/config";

const config = {
  adminer: {
    port: process.env.ADMINER_PORT,
  },
  db: {
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
  },
};

export default config;
