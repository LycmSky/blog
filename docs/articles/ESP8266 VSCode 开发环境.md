---
title: ESP8266 VSCode 开发环境配置 # 文章标题
description: 配置ESP8266开发环境
category: # 分类
  - 文章
  - IOT
tag: # 标签
  - ESP8266
  - 环境配置
---

## 1. 设置工具链
[Windows工具链的标准设置](https://docs.espressif.com/projects/esp8266-rtos-sdk/en/latest/get-started/windows-setup.html)

### 1.1 快速设置

下载Windows多合一工具链和MSYS2 ZIP文件：  
><https://dl.espressif.com/dl/esp32_win32_msys2_environment_and_toolchain-20181001.zip>

将下载的ZIP压缩包解压到自己喜欢的位置，它将创建一个具有预先准备环境的目录

### 1.2 下载 ESP8266 的工具链
- 8.4.0 版：  
><https://dl.espressif.com/dl/xtensa-lx106-elf-gcc8_4_0-esp-2020r3-win32.zip>

- 如果您仍在使用旧版SDK（< 3.0），请使用工具链v4.8.5，如下所示：  
><https://dl.espressif.com/dl/xtensa-lx106-elf-win32-1.22.0-88-gde0bdc1-4.8.5.tar.gz>

### 1.3 测试
将下载下来的ZIP文件解压，并找到其中的 `mingw32.exe` 执行文件，尝试运行，如果没有错误即可进行下一步。
![](https://img.lycm.xyz/img/20220712173125.png)  


## 2. 获取ESP8266_RTOS_SDK
使用Git从仓库克隆：
```git
git clone --recursive https://github.com/espressif/ESP8266_RTOS_SDK.git
```
::: tip
注意加上 recursive 循环下载子模块，否则后面会在make的时候下载其他库
:::

## 3. 配置
### 3.1 配置环境变量
下载好文件之后，接下来就要配置环境变量，告诉 mingw SDK所在的目录  
工具链使用 IDF_PATH 访问 SDK 目录，在mingw所在目录中配置 `~/.bash_profile` 末尾添加  
```vim
export IDF_PATH="G:/IOT/ESP8266/ESP8266_RTOS_SDK"
```
::: info 关于目录
`~` 在Linux中指home目录，在文件夹中为 `msys32/home/username/.bash_profile`
:::

添加保存之后，使用source命令使其生效
```bash
source ~/.bash_profile
```
### 3.2 安装所需Python库
ESP8266编译和烧录基于Python实现，需要安装python的库。  
所需的库都被写在SDK中的 `requirements.txt` 文件中。  
我们可以读取这个文件一键安装
```pip
python -m pip install -r $IDF_PATH/requirements.txt
```
::: note 可能出现的问题
1. `$IDF_PATH/` 就是我们配置的SDK的[环境变量](#_3-1-配置环境变量)，如果路径错误，请检查是否是环境变量配置没有完成
2. 如果出现安装失败 `Cache entry deserialization failed, entry ignored` ，可能是pip版本过低，可以尝试更新pip之后重试 `python -m pip install --upgrade pip`
:::
### 3.3 配置 ESP8266 工具链
在mingw所在目录中配置 `~/.bash_profile` 末尾添加  
```vim
export PATH="$PATH:/G/IOT/ESP8266/xtensa-lx106-elf/bin"
```
::: tip
此项配置与[环境变量](#_3-1-配置环境变量)的配置方法基本一致，不过注意工具链要定位到 `bin` 目录
:::
::: danger
此处将工具链放在win系统中配置失败，编译时提示 `make：xtensa-lx106-elf-gcc：命令未找到` 于是我将整个工具链目录直接扔进msys目录了
:::
## 4. Hello World
现在我们的工具链已经配置完成了，先来测试一下是否可用。  
### 4.1 配置项目
复制SDK中的示例项目，使用 mingw32 进入该文件夹，运行：
```bash
make menuconfig
```
没问题会出现如下界面  
![](https://img.lycm.xyz/img/20220712222347.png)    

由于只是简单的测试一下，在此配置串口，波特率便可保存退出  
### 4.2 编译和烧录
配置完项目设置之后，使用命令编译文件并上传至开发板
```bash
make flash
```
接下来等待烧录完成即可
### 4.3 监视串口
如何判断程序是否成功烧录呢，可以使用以下指令连接开发板的串口查看开发板是否正常运作
```bash
make monitor
```