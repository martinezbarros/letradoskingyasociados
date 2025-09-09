/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        
        protocol: "https",
        hostname: "construccioneshitech.com",
        port: "", // o el puerto que estés usando, por ejemplo "8888"
        pathname: "/wp-content/uploads/**",
      },
      {
        
        protocol: "https",
        hostname: "secure.gravatar.com",
        port: "", // o el puerto que estés usando, por ejemplo "8888"
      },
      {
        
        protocol: "https",
        hostname: "bakerandalvarez.site/letradoskingyasociados",
        port: "", // o el puerto que estés usando, por ejemplo "8888"
        pathname: "/wp-content/uploads/**",
      },
      {
        
        protocol: "https",
        hostname: "bakerandalvarez.site",
        port: "", // o el puerto que estés usando, por ejemplo "8888"
      },
    ],
  },
};

module.exports = nextConfig;
