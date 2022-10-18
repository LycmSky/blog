---
title: Stable Diffusion Web UI # 文章标题
description: 基于 Gradio 库的浏览器接口，用于 Stable Diffusion
category: # 分类
  - 开源
tag: # 标签
  - AI
  - 绘画
  - 图像处理
---

## 基本信息
**项目地址：** https://github.com/LycmSky/stable-diffusion-webui  
**项目简介：** 潜在的文本到图像扩散模型  

## 部署流程
:::info
*该项目对GPU性能有一定要求，且对A卡支持较差，如硬件条件较差建议使用他人部署的在线服务。*
:::
### 在 Windows 上安装
1. 安装 [Python 3.10.6](https://www.python.org/)
2. 安装 [git](https://git-scm.com/)
3. 克隆项目到本地 `git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git` 
4. 下载训练好的模型 `.ckpt` 文件（下载地址参阅[依赖项](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/Dependencies)），放置于 `models/Stable-diffusion` 目录
5. 以非管理员用户运行 `webui-user.bat` 脚本启动项目（首次启动可能需要较长时间）