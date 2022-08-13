---
title: OTA
category: # 分类
  - 项目
  - 单片机
tag: # 标签
  - ESP8266
  - SDK
  - 示例程序
---

## 前言
本章为 ESP8266 OTA示例程序，由官方示例开始，并进行修改。

## 1. 官方示例
在乐鑫官方的 SDK 中，有 OTA 示例程序，本节为成功运行该示例的步骤。

### 1.1 复制项目
在 SDK 中找到并复制示例项目  
项目路径：**ESP8266_RTOS_SDK -> examples -> system -> ota -> simple_ota_example**  

### 1.2 配置项目
首先，我们需要对项目进行一些相关配置  
使用 `make menuconfig` 命令进入配置面板
- `Serial flasher config ---> Default serial port`  
	配置通信端口，即开发板与电脑连接的端口
- `Example Configuration ---> firmware upgrade url endpoint`  
	配置固件下载地址，将会使用此处配置的地址下载OTA固件
	```sh
	http://xxx.xxx.xxx.xxx:8070/xxx.bin
	# xxx.xxx.xxx.xxx ---> 本机在当前网络中的IP地址
	# xxx.bin ---> 要升级的固件名
	```
- `Example Connection Configuration ---> WiFi SSID`  
	配置 WiFi SSID
- `Example Connection Configuration ---> WiFi Password`  
	配置 WiFi 密码
- `Component config ---> ESP HTTPS OTA ---> Allow HTTP for OTA`  
	设置 OTA 连接总是使用 HTTP

### 1.3 烧录固件
在配置完成后，使用 `make flash` 即可将固件烧录到开发板中
:::tip
由于我们的网络和下载地址都在项目配置中设置好了，所以不需要在代码里进行相关的配置。
:::
烧录完成后，使用 `make monitor` 查看日志
:::details LOG
```sh
# make monitor
Toolchain path: /opt/xtensa-lx106-elf/bin/xtensa-lx106-elf-gcc
Toolchain version: esp-2020r3-49-gd5524c1
Compiler version: 8.4.0
Python requirements from C:/Users/lycm/esp/ESP8266_RTOS_SDK/requirements.txt are satisfied.
MONITOR
--- idf_monitor on COM5 74880 ---
--- Quit: Ctrl+] | Menu: Ctrl+T | Help: Ctrl+T followed by Ctrl+H ---

 ets Jan  8 2013,rst cause:2, boot mode:(3,6)

load 0x40100000, len 7044, room 16
tail 4
chksum 0x3c
load 0x3ffe8408, len 24, room 4
tail 4
chksum 0xd5
load 0x3ffe8420, len 3328, room 4
tail 12
chksum 0xa7
csum 0xa7
I (45) boot: ESP-IDF v3.4-63-ga192988b-dirty 2nd stage bootloader
I (45) boot: compile time 16:28:12
I (46) qio_mode: Enabling default flash chip QIO
I (54) boot: SPI Speed      : 40MHz
I (61) boot: SPI Mode       : QIO
I (67) boot: SPI Flash Size : 4MB
I (73) boot: Partition Table:
I (79) boot: ## Label            Usage          Type ST Offset   Length
I (90) boot:  0 nvs              WiFi data        01 02 00009000 00004000
I (101) boot:  1 otadata          OTA data         01 00 0000d000 00002000
I (113) boot:  2 phy_init         RF data          01 01 0000f000 00001000
I (124) boot:  3 ota_0            OTA app          00 10 00010000 000f0000
I (136) boot:  4 ota_1            OTA app          00 11 00110000 000f0000
I (148) boot: End of partition table
I (154) boot: No factory image, trying OTA 0
I (162) esp_image: segment 0: paddr=0x00010010 vaddr=0x40210010 size=0x7605c (483420) map
0x40210010: _stext at ??:?

I (340) esp_image: segment 1: paddr=0x00086074 vaddr=0x4028606c size=0x15ef8 ( 89848) map
I (371) esp_image: segment 2: paddr=0x0009bf74 vaddr=0x3ffe8000 size=0x00688 (  1672) load
I (372) esp_image: segment 3: paddr=0x0009c604 vaddr=0x40100000 size=0x00080 (   128) load
I (383) esp_image: segment 4: paddr=0x0009c68c vaddr=0x40100080 size=0x05608 ( 22024) load
I (403) boot: Loaded app from partition at offset 0x10000
I (426) system_api: Base MAC address is not set, read default base MAC address from EFUSE
I (428) system_api: Base MAC address is not set, read default base MAC address from EFUSE
phy_version: 1167.0, 14a6402, Feb 17 2022, 11:32:25, RTOS new
I (495) phy_init: phy ver: 1167_0
I (505) example_connect: Connecting to lycm...
I (1574) wifi:state: 0 -> 2 (b0)
I (1634) wifi:state: 2 -> 3 (0)
I (1658) wifi:state: 3 -> 5 (10)
I (1797) wifi:connected with lycm, aid = 2, channel 11, HT20, bssid = 9c:9d:7e:50:52:c8
I (3068) tcpip_adapter: sta ip: 192.168.0.173, mask: 255.255.255.0, gw: 192.168.0.1
I (3070) example_connect: Connected to lycm
I (3073) example_connect: IPv4 address: 192.168.0.173
I (3082) simple_ota_example: Starting OTA example...
I (3115) esp_https_ota: Starting OTA...
I (3116) esp_https_ota: Writing to partition subtype 17 at offset 0x110000
I (10889) esp_https_ota: esp_ota_begin succeeded
I (10890) esp_https_ota: Please Wait. This may take time
D (10892) HTTP_CLIENT: esp_transport_read returned:-1 and errno:128
E (21350) HTTP_CLIENT: Connection failed, sock < 0
E (21351) esp_https_ota: Failed to open HTTP connection: 28674
E (21352) simple_ota_example: Firmware Upgrades Failed
```
:::
可以发现，出现了错误，原因是连接失败  
因为我们下载固件需要从网络下载才行

### 1.4 配置 SimpleHTTPServer
想要通过无线更新固件，就需要有一个 HTTP 服务器来提供固件的下载服务。  
在乐鑫的 SDK 中提供了一个简易的服务器可以很方便的使用
```sh
cd build
python -m SimpleHTTPServer 8070
```
使用此命令将会创建一个简单的 HTTP 服务，当服务成功启动后，我们可以在当前设备的浏览器中输入 <http://127.0.0.1:8070> 来查看。

启动服务后，重启开发板，会发现仍然出现了错误
```sh
E (10377) esp_ota_ops: OTA image has invalid magic byte (expected 0xE9, saw 0x3c
E (10392) esp_https_ota: Error: esp_ota_write failed! err=0x0
E (10399) simple_ota_example: Firmware Upgrades Failed
```
查看 SimpleHTTPServer 的日志
```sh
# python -m SimpleHTTPServer 8070
Serving HTTP on 0.0.0.0 port 8070 ...
192.168.0.173 - - [11/Aug/2022 16:57:38] code 404, message File not found
192.168.0.173 - - [11/Aug/2022 16:57:38] "GET /simple_ota.ota.bin HTTP/1.1" 404 -
```
可以发现请求的状态为 404 not found ，也就是说没有这个地址。如日志中所示，我们的目录中并没有 `simple_ota.ota.bin` 这个文件，所以下一步就是生成这个文件
:::tip
此处的 `simple_ota.ota.bin` 是根据 [项目配置](#_1-2-配置项目) 中的 固件下载地址
:::
### 1.5 生成 OTA 固件
SDK 提供了 `make ota` 命令来生成 OTA 固件  
:::tip
生成的固件存在于 `build` 目录中，文件名为 `xxx.ota.bin` xxx为当前项目名
:::

### 1.6 Tips
测试前应当注意各项服务是否已经准备完成
- HTTP 服务器是否运行
- OTA 固件是否生成
- OTA 固件能否通过服务器正常访问（可在浏览器中尝试下载该文件）
- 当前固件中设置的下载连接是否与文件实际的链接一致
- 生成 OTA 固件时，可对程序进行一些修改，便于我们通过日志对比来判断固件是否成功更新


## 2. 示例拓展
&ensp;&ensp;&ensp;&ensp;前面了解了如何执行官方的示例项目，但实际运用中会更加复杂。前面的示例中大部分配置都是通过项目配置来完成的，那样做虽然很方便，但却不够灵活。在实际开发中，会需要更灵活的使用。比如需要更换 WiFi ，手动检查更新等，这时就需要通过代码来实现。  
&ensp;&ensp;&ensp;&ensp;实例项目中，有些东西是已经配置好的，但如果需要早一个普通项目中配置 OTA 则还是要自己进行相关配置。本章则的目的是在一个普通的项目中配置 OTA 升级固件。

### 2.1 复制项目
在 SDK 中找到并复制示例项目，这次使用 HelloWorld 项目
项目路径：**ESP8266_RTOS_SDK ---> examples ---> get-started ---> hello_world**  

### 2.2 配置项目
首先，我们需要对项目进行一些相关配置  
使用 `make menuconfig` 命令进入配置面板
- `Serial flasher config ---> Default serial port`  
	配置通信端口，即开发板与电脑连接的端口
- `Component config ---> ESP HTTPS OTA ---> Allow HTTP for OTA`  
	设置 OTA 连接总是使用 HTTP
- `Partition Table ---> Partition Table ---> Factory app, two OTA definitions`  
	配置分区
相比示例上一节的配置，这次要修改的内容少了一些，这些配置将会在代码中进行。

### 2.3 编辑代码
#### Ⅰ. 清空代码  
首先将示例文件中的代码全部删掉，从头开始编辑一个新的项目

#### II. 连接 Wi-Fi
添加链接 WiFi 的代码  
可以直接参考官方示例：`ESP8266_RTOS_SDK ---> examples ---> wifi ---> getting_started ---> station`

#### III. 添加 OTA 代码
直接将前面示例中的代码直接复制过来即可

#### IV. 修改代码
删除两个示例程序中重复的头文件和函数  

由于链接网络是由代码实现的，所以 OTA 示例中连网的部分要删掉
```c
#include "protocol_examples_common.h"
ESP_ERROR_CHECK(example_connect());
```

修改固件下载地址，将 `ONFIG_FIRMWARE_UPGRADE_URL` 替换为自己的网址  

删除证书相关的内容，因为用的 HTTP 协议，不需要证书
```c
extern const uint8_t server_cert_pem_start[] asm("_binary_ca_cert_pem_start");
extern const uint8_t server_cert_pem_end[] asm("_binary_ca_cert_pem_end");

.cert_pem = (char *)server_cert_pem_start,
```

### 2.4 烧录固件
剩下的和上一节中的内容一致  
- [启动 HTTP 服务](#_1-4-配置-simplehttpserver)
- [生成 OTA 固件](#_1-5-生成-ota-固件)
- [烧录固件](#_1-3-烧录固件)
- 查看是否正常运行