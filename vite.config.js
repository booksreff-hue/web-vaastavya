import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import imagemin from 'vite-plugin-imagemin'

const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif|svg|ico)$/i

function sourceRelativePath(assetInfo) {
  const candidates = [
    ...(assetInfo.originalFileNames || []),
    ...(assetInfo.names || []),
    assetInfo.name || '',
  ].filter(Boolean)

  for (const candidate of candidates) {
    const normalized = candidate.replace(/\\/g, '/')
    const marker = 'src/assets/'
    const index = normalized.indexOf(marker)
    if (index !== -1) return normalized.slice(index + marker.length)
  }

  const fallback = assetInfo.names?.[0] || assetInfo.name || candidates[0] || ''
  return fallback.replace(/\\/g, '/').split('/').pop()
}

function assetFileNames(assetInfo) {
  const relativePath = sourceRelativePath(assetInfo)
  const fileName = relativePath.replace(/[^/]+$/, '[name]-[hash][extname]')

  if (/\.css$/i.test(relativePath)) {
    return 'assets/css/[name]-[hash][extname]'
  }
  if (IMAGE_RE.test(relativePath)) {
    return `assets/images/${fileName}`
  }
  return `assets/media/${fileName}`
}

export default defineConfig({
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames,
      },
    },
  },
  plugins: [
    react(),
    imagemin({
      verbose: true,
      plugins: {
        jpegmin: {
          quality: 80,
        },
        pngquant: {
          quality: [0.7, 0.85],
        },
        gifsicle: {
          optimizationLevel: 3,
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox',
              active: false,
            },
          ],
        },
      },
    }),
  ],
})
