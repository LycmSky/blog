import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";
import { sitemapPlugin } from "vuepress-plugin-sitemap2";
import { commentPlugin } from "vuepress-plugin-comment2";
import { pwaPlugin } from "vuepress-plugin-pwa2";
import { seoPlugin } from "vuepress-plugin-seo2";
import theme from "./theme";

export default defineUserConfig({
  shouldPrefetch: false,
  lang: "zh-CN",
  title: "Lycm",
  description: "Lycm的博客",
  head: [['link', { rel: 'icon', href: '/Icon/logo.svg' }]],
  base: "/",

  theme,
  plugins: [
    pwaPlugin({}),
    commentPlugin({
      provider: "Giscus",
      repo: "LycmSky/giscus",
      repoId: "R_kgDOHeZGpg",
      category: "Announcements",
      categoryId: "DIC_kwDOHeZGps4CPjqg",
    }),
    seoPlugin({
      hostname: "https://blog.lycm.xyz"
    }),
    sitemapPlugin({
      hostname: "https://blog.lycm.xyz"
    }),
    searchPlugin({
    }),
  ],
});
