/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MYSQL_HOST: "127.0.0.1",
    MYSQL_PORT: "3306",
    MYSQL_DATABASE: "book-appointment",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "shivam",

    SECRET_KEY: "hellomynameisshivamkumariamasoftwaredevleoper",

    NEXT_ENV: "development",
  },
};

export default nextConfig;
