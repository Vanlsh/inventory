/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    app_url: process.env.APP_URL,
    my_sql_host: process.env.MYSQL_HOST,
    my_sql_port: process.env.MYSQL_PORT,
    my_sql_user: process.env.MYSQL_USER,
    my_sql_password: process.env.MYSQL_PASSWORD,
    my_sql_database: process.env.MYSQL_DATABASE,
  },
};

export default nextConfig;
