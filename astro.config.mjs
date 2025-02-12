import { defineConfig, passthroughImageService } from 'astro/config';
import vue from "@astrojs/vue";
import partytown from '@astrojs/partytown'

export default defineConfig({
  site: 'https://klukva.xyz',
  trailingSlash: 'never',
  integrations: [
    vue(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      }
    })
  ],
  devToolbar: {
    enabled: false
  },
  image: {
    service: passthroughImageService(),
    domains: ["leonardo.osnova.io", "cdn.modrinth.com"]
  }
})