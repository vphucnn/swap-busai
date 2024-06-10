/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

module.exports = {
  async redirects() {
    return [
      {
        source: '/', // Matches the home route
        destination: '/generate-character-panda', // Redirect to the about page
        permanent: true, // Set to true for permanent redirect (308 status code)
      },
    ];
  },
  trailingSlash: true,
  reactStrictMode: false,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
