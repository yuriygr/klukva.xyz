import { defineConfig, squooshImageService } from 'astro/config';
import vue from "@astrojs/vue";
import partytown from '@astrojs/partytown'

export default defineConfig({
  site: 'https://klukva.xyz',
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
    service: squooshImageService()
  }
})