import { defineConfig, squooshImageService } from 'astro/config';
import vue from "@astrojs/vue";

export default defineConfig({
  site: 'https://shizo-land.ru',
  integrations: [vue()],
  devToolbar: {
    enabled: false
  },
  image: {
    service: squooshImageService()
  }
})