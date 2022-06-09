/* 
博主信息
*/

import { hopeTheme } from "vuepress-theme-hope";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default hopeTheme({
  themeColor: {
    WANSHOUJUHUANG: "#fb8b05",
    CHUNMEIHONG: "#f1939c",
    SHANGENGZI: "#61649f",
    QUNQING: "#1772b4",
  },
  hostname: "https://blog.lycm.xyz",

  author: {
    name: "Lycm",
    url: "https://blog.lycm.xyz",
  },

  iconAssets: "//at.alicdn.com/t/font_3443434_gl5e8ycvkb.css",

  logo: "/Icon/logo.svg",

  repo: "LycmSky/blog", //GitHub仓库

  docsDir: "docs",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: {
    "/projects/": "structure",

    "/articles/": "structure",
  },

  footer: '<a href="https://beian.miit.gov.cn/" target="_blank">鄂ICP备20003020号-1</a> | <a href="/about">关于本站</a>',

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "Word", "ReadingTime"],

  blog: {
    avatar: "/Image/headshot.png",
    roundAvatar: true,
    description: "人 菜 瘾 大",
    intro: "/about",
    medias: {
      Email: "mailto:lycmsky@qq.com",
      GitHub: "https://github.com/LycmSky",
      Gmail: "mailto:chongming2333@gmail.com",
      Instagram: "https://www.instagram.com/ark_lycm/",
      QQ: "http://wpa.qq.com/msgrd?v=3&uin=2417003944&site=qq&menu=yes",
      Twitter: "https://twitter.com/Ark_Lycm",
      Zhihu: "https://www.zhihu.com/people/ben-teng-de-sha-pao-yi",
    },
  },

  encrypt: { // 加密页面
    config: {
      // "/guide/encrypt.html": ["1234"],
    },
  },

  plugins: {
    blog: { autoExcerpt: true, },
    copyCode: {},
    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});
