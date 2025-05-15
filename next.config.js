/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
  // Optimisations pour la production
  reactStrictMode: true,
  poweredByHeader: false,
  // Configuration des images
  images: {
    domains: ['localhost'],
    // Désactiver le redimensionnement d'image côté serveur si non utilisé
    unoptimized: true,
  },
}

module.exports = nextConfig
