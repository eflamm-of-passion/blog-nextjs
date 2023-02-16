/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    BROWSER_PATH: process.env.BROWSER_PATH,
    MY_MAIL_ADDRESS: process.env.MY_MAIL_ADDRESS,
    MY_PHONE_NUMBER: process.env.MY_PHONE_NUMBER
  }
}

module.exports = nextConfig
