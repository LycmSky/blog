import { defineUserConfig } from "vuepress";
import { searchPlugin } from "@vuepress/plugin-search";
import theme from "./theme";

export default defineUserConfig({
  lang: "zh-CN",
  title: "Lycm",
  description: "Lycm的博客",
  head: [['link', { rel: 'icon', href: '/blog/Icon/logo.svg' }]],
  base: "/",

  theme,
  plugins: [
    searchPlugin({
    }),
  ],
});
