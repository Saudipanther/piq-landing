import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Self-contained build: JS + CSS + images inlined into one index.html.
// Relative base so it works from any host path or opened directly via file://.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 100000000, // inline all assets (logos) as base64
    cssCodeSplit: false,
  },
})
