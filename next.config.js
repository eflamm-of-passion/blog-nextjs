/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  i18n,
  env: {
    BROWSER_PATH: process.env.BROWSER_PATH,
    MY_MAIL_ADDRESS: process.env.MY_MAIL_ADDRESS,
    MY_PHONE_NUMBER: process.env.MY_PHONE_NUMBER,
    STRAPI_URL: process.env.STRAPI_URL,
  }
}

module.exports = nextConfig
