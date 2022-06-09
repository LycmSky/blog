import { navbar } from "vuepress-theme-hope";

export default navbar(
  [
  "/",
  "/projects/",
  {
    text: "文章",
    icon: "edit",
    link: "/articles/",
  },
  {
    text: "时间轴",
    icon: "rcd-clock",
    link: "/timeline",
  },
  {
    text: "友链",
    icon: "rcd-heart",
    children: [
      {
        text: "vuepress",
        icon: "project2",
        link: "https://vuepress.vuejs.org/zh/",
      },
      {
        text: "vuepress-theme-hope",
        icon: "project2",
        link: "https://vuepress-theme-hope.github.io/v2/zh/",
      },
    ],
  },
  "/about",
]);
