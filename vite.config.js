import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isGitHubPages = mode === 'github';

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    // Specify entry point for development
    root: '.',
    base: isGitHubPages ? '/image-sequence-animator/' : './',
    build: {
      ...(isGitHubPages ? {
        outDir: 'dist',
      } : {
        lib: {
          entry: path.resolve(__dirname, 'src/ImageSequenceAnimator.tsx'), // Assuming this will be the main component export
          name: 'ImageSequenceAnimator', // Global variable name for UMD build
          formats: ['es', 'cjs'], // Output formats: ES Module and CommonJS
          fileName: (format) => `image-sequence-animator.${format}.js`,
        },
        rollupOptions: {
          // Make sure to externalize deps that shouldn't be bundled
          // into your library
          external: ['react', 'react-dom'],
          output: {
            // Provide global variables to use in the UMD build
            // for externalized deps
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
      }),
      sourcemap: true, // Generate source maps for debugging
      emptyOutDir: true, // Clean the output directory before building
    },
    // Development server configuration
    server: {
      open: true, // Automatically open the browser
    },
    // Configure the entry point for development
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    optimizeDeps: {
      include: ['react', 'react-dom']
    },
    // Explicitly define entry point for development
    define: {
      '__DEV_ENTRY__': JSON.stringify(isGitHubPages ? 'src/main.jsx' : 'src/main.jsx')
    }
  }
})
