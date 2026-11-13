import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// viteSingleFile puts everything into one dist/index.html, so it can be hosted anywhere.
export default defineConfig({ base: './', plugins: [react(), tailwindcss(), viteSingleFile()] })
