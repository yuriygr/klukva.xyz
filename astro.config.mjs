import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://shizo-land.ru',
  devToolbar: {
    enabled: false
  },
  build: {
    assets: 'assets'
  }
})
