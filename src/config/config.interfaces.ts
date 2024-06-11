export interface ConfigInterface {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  supabase_url: string;
  supabase_key: string;
  cloud_name: string;
  cloudinary_key: string;
  cloudinary_secret: string;
  jwtSecret: string;
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  redisHost: string;
  redisPort: number;
}
