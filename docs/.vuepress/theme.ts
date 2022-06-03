/* 
博主信息
*/

import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default hopeTheme({
  themeColor: {
    WANSHOUJUHUANG: "#fb8b05",
    CHUNMEIHONG: "#f1939c",
    SHANGENGZI: "#61649f",
    QUNQING: "#1772b4",
  },
  hostname: "https://vuepress-theme-hope-v2-demo.mrhope.site",

  author: {
    name: "Lycm",
    url: "https://mrhope.site",
  },

  iconAssets: "//at.alicdn.com/t/font_3443434_gl5e8ycvkb.css",

  logo: "/Icon/logo.svg",

  repo: "LycmSky/blog", //GitHub仓库

  docsDir: "demo/src",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: {
    "/projects/": "structure",

    "/articles/": "structure",
  },

  footer: "没有了，真的没有了",

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    avatar: "/Image/1.png",
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
    blog: {
      autoExcerpt: true,
    },

    // 如果你不需要评论，可以直接删除 comment 配置，
    // 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
    // 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
    // comment: {
    //   /**
    //    * Using giscus
    //    */
    //   type: "giscus",
    //   repo: "vuepress-theme-hope/giscus-discussions",
    //   repoId: "R_kgDOG_Pt2A",
    //   category: "Announcements",
    //   categoryId: "DIC_kwDOG_Pt2M4COD69",

    //   /**
    //    * Using twikoo
    //    */
    //   // type: "twikoo",
    //   // envId: "https://twikoo.ccknbc.vercel.app",

    //   /**
    //    * Using Waline
    //    */
    //   // type: "waline",
    //   // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    // },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});
