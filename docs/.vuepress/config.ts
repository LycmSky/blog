import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";
import { pwaPlugin } from "vuepress-plugin-pwa2";
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
    pwaPlugin({
      
    }),
    searchPlugin({
    }),
  ],
});
