import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
      preprocessorOptions: {
          less: {
              // modifyVars: {
              //     hack: `true; @import (reference) "${path.resolve("src/assets/css/base.less")}";`,
              // },
              javascriptEnabled: false,
          },
      },
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8686,
    open: false,
    // hmr: {
    //   overlay: false
    // },
    proxy: {
      '/api': {
        target: 'http://42.51.41.129:1337',
        // target: 'http://127.0.0.1:1337',
        changeOrigin: true, // 允许跨域
        rewrite: path => path.replace('/api/', '/api/'),
      },
      '/pay': {
        target: 'http://42.51.41.129:8888',
        rewrite: path => path.replace('/pay/', '/pay/'),
      },
    },
   
  },
  build: {
    rollupOptions: {
      output: {
        sourcemap: false,
        reportCompressedSize: false,
        manualChunks(id) {  
            if (id.includes("node_modules")) {
                return id
                        .toString()
                        .split("node_modules/")[1]
                        .split("/")[0]
                        .toString();
            }
        }
    }
    }
  }
})
