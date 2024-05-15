/** @type {import('next').NextConfig} */
 
module.exports = {
    experimental: {
      serverActions: {
        bodySizeLimit: '100mb',
      },
    },images: {
      domains: ['utfs.io'], // Add the hostname of the image URL here
    },
  }