---
title: iconfont 本地使用配置 # 文章标题
description: 阿里云矢量图库项目本地配置方法
category: # 分类
  - 文章
tag: # 标签
  - Icon
  - Web
---

## 前言
这段时间阿里矢量图库的在线链接没了，虽然以前配置的都还能用，但没法更新链接。不知道是暂时的还是以后都没有了，所以改变方案，进行本地配置。

## 一、图标项目设置
与之前不同，本地使用项目需要对项目的默认设置进行一些修改
1. 在项目管理页面选择 `项目设置`   
![](https://img.lycm.xyz/img/20220716223128.png)
2. 修改 `FontClass/Symbol 前缀` 和 `Font Family` 
	- FontClass/Symbol 前缀：留空
	- Font Family：icon

![](https://img.lycm.xyz/img/20220716223418.png)
:::info 配置原理
此举的目的是为了使其和网站的配置相匹配  
iconfont会被解析为 
```html
<span class="icon xxx"></span>
```
此处设置错误会导致 `class` 不匹配从而无法正常显示
:::
:::tip 配置无效
此处的示例设置为 `vuepress` 的 `vuepress-theme-hope` 主题的配置  
其他建站方案可能需要根据自身情况修改
:::
## 二、下载图标项目
1. 在项目管理页面选择 `下载至本地`   
![](https://img.lycm.xyz/img/20220716213705.png)  

2. 解压下载的压缩包可以得到所需的文件  
![](https://img.lycm.xyz/img/20220716214417.png)  
::: tip 示例文件
`demo.css`  ， `demo_index.html` 为示例文件，正式部署时可以删掉。  
打开 `demo_index.html` 可查看示例。
:::

3. 将解压后的目录放到网站的 **pubic** 目录下  

## 三、配置网站
在项目的 `config.ts` 文件的 `hand` 中添加一条 `link` 标签，注意将地址换成自己 `iconfont.css` 的地址
```ts {6}
import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  head: [
    ['link', { rel: "stylesheet", href: "/iconfont/iconfont.css" }]
  ],
});
```
这样就算是配置完成了，接下来使用都是一样的。

## 四、更新图标
要更新图标的话，将更新后的项目下载下来覆盖掉当前的文件即可