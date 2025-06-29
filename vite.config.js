import { defineConfig } from 'vite'

export default defineConfig({
  // Set the base path for GitHub Pages deployment
  // Replace 'your-repo-name' with your actual GitHub repository name
  base: '/your-repo-name/',
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  },
  
  // Server configuration for development
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  // Preview configuration
  preview: {
    port: 4173,
    open: true,
    host: true
  },
  
  // Asset handling
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg']
})