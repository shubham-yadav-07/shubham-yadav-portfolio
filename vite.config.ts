import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

/** Replaces __SITE_URL__ in index.html with VITE_SITE_URL (or '' when not set). */
function siteUrlPlugin(siteUrl: string): Plugin {
  const clean = siteUrl.replace(/\/+$/, '')
  return {
    name: 'site-url-html',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', clean),
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_')
  return {
    plugins: [react(), siteUrlPlugin(env.VITE_SITE_URL ?? '')],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 600,
    },
  }
})
