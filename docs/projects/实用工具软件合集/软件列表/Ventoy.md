---
title: Ventoy # 文章标题
description: 一个制作可启动U盘的开源工具
category: # 分类
  - 开源
tag: # 标签
  - 装机
  - U盘启动
---
## 平台支持
- Windows
- Linux

## Ventoy 官网
- https://ventoy.net/cn/index.html

## Ventoy 简介
- Ventoy是一个制作可启动U盘的开源工具。  
- 无需反复地格式化U盘，只需要把 ISO/WIM/IMG/VHD(x)/EFI 等类型的文件直接拷贝到U盘里面就可以启动，无需其他操作。  
- 你可以一次性拷贝很多个不同类型的镜像文件，Ventoy 会在启动时显示一个菜单来供你进行选择 (参见 [截图](https://ventoy.net/cn/screenshot.html))。  
- 你可以在 Ventoy 的界面中直接浏览并启动本地硬盘中的 ISO/WIM/IMG/VHD(x)/EFI 等类型的文件。  
- Ventoy 安装之后，同一个U盘可以同时支持 x86 Legacy BIOS、IA32 UEFI、x86_64 UEFI、ARM64 UEFI 和 MIPS64EL UEFI 模式，同时还不影响U盘的日常使用。  
- Ventoy 支持大部分常见类型的操作系统 （Windows/WinPE/Linux/ChromeOS/Unix/VMware/Xen ...）

## Ventoy 特点
-   100% 开源 [(许可证)](https://ventoy.net/cn/doc_license.html)
-   使用简单 [(使用说明)](https://ventoy.net/cn/doc_start.html)
-   快速 (拷贝文件有多快就有多快)
-   可以安装在 U盘/本地硬盘/SSD/NVMe/SD卡等设备上
-   直接从 ISO/WIM/IMG/VHD(x)/EFI 文件启动，无需解开
-   支持浏览并启动本地硬盘上的 ISO/WIM/IMG/VHD(x)/EFI 文件 [说明](https://ventoy.net/cn/doc_vlnk.html)
-   ISO/WIM/IMG/VHD(x)/EFI 文件在磁盘上无需连续
-   支持MBR和GPT分区格式
-   同时支持 x86 Legacy BIOS 以及 IA32/x86_64/ARM64/MIPS64 UEFI
-   UEFI 模式支持安全启动 (Secure Boot) [说明](https://ventoy.net/cn/doc_secure.html)
-   支持数据持久化 [说明](https://ventoy.net/cn/plugin_persistence.html)
-   支持 Windows 系统的自动安装部署 [说明](https://ventoy.net/cn/plugin_autoinstall.html)
-   支持 Linux 系统的自动安装部署 [说明](https://ventoy.net/cn/plugin_autoinstall.html)
-   Windows/Linux 自动安装脚本中支持变量扩展 [说明](https://ventoy.net/cn/plugin_autoinstall.html)
-   镜像分区支持 FAT32/exFAT/NTFS/UDF/XFS/Ext2(3)(4) 文件系统
-   支持超过4GB的 ISO 文件
-  支持菜单别名、菜单提示信息显示
-   支持启动密码保护
-   保留ISO原始的启动菜单风格(Legacy & UEFI)
-   支持大部分常见操作系统, 已测试 1000+ 个ISO文件
-   不仅仅是能启动ISO文件，而是支持启动后完整的安装过程
-   菜单可以在列表模式和目录树模式之间随时切换 [说明](https://ventoy.net/cn/doc_treeview.html)
-   提出 "Ventoy Compatible" 概念
-   支持插件扩展，提供图形化插件配置器
-   Linux vDisk(vhd/vdi/raw...) 启动解决方案 [说明](https://ventoy.net/cn/plugin_vtoyboot.html)
-   支持向运行环境中注入文件 [说明](https://ventoy.net/cn/plugin_injection.html)
-   支持动态替换ISO文件中的原始启动配置文件 [说明](https://ventoy.net/cn/plugin_bootconf_replace.html)
-   高度可定制化的主题风格和菜单 [说明](https://ventoy.net/cn/plugin_theme.html)
-   U盘硬件写保护开启时不影响基本功能
-   不影响U盘日常普通使用
-   版本升级时数据不会丢失
-   无需跟随操作系统升级而升级Ventoy

## Ventoy使用说明
官方文档：https://ventoy.net/cn/doc_start.html

## Ventoy下载
- 官网：https://ventoy.net/cn/download.html
- Github：https://github.com/ventoy/Ventoy/releases
- Gitee：https://gitee.com/longpanda/Ventoy/releases/
- 蓝奏云：https://www.lanzoui.com/b01bd54gb
- 百度网盘：https://pan.baidu.com/s/1UzHMzn6SToxHRYw7HR16_w 提取码: vtoy