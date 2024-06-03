import { ConfigInterface } from './config.interfaces';

export const EnvConfig = (): ConfigInterface => ({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  supabase_url: process.env.SUPABASE_URL,
  supabase_key: process.env.SUPABASE_KEY,
  cloud_name: process.env.CLOUD_NAME,
  cloudinary_key: process.env.CLOUDINARY_KEY,
  cloudinary_secret: process.env.CLOUDINARY_SECRET,
});
