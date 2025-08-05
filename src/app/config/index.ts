import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(process.cwd(),".env")})
export default{
  port:process.env.PORT,
  mongo_url:process.env.MONGO_URL,
  salt_round:process.env.SATL_ROUND,
  jwt_access_secret:process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret:process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in:process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in:process.env.JWT_REFRESH_EXPIRES_IN,
  node_env:process.env.NODE_ENV,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  smtp_auth_pass:process.env.SMTP_AUTH_PASS,
  smtp_auth_user:process.env.SMTP_AUTH_USER,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudanary_api_secret: process.env.CLOUDINARY_API_SECRET
}