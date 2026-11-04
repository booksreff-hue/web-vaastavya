import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import imagemin from 'vite-plugin-imagemin'

export default defineConfig({
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
