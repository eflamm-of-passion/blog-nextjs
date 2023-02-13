/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BROWSER_PATH:"/usr/bin/chromium",
    MY_MAIL_ADDRESS: "some.example@mail.com",
    MY_PHONE_NUMBER: "06 00 00 00 00"
  }
}

module.exports = nextConfig
