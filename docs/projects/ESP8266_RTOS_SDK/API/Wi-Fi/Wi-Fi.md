---
title: Wi-Fi
order: 1 # 排序
category: # 分类
  - 项目
  - 单片机
tag: # 标签
  - ESP8266
  - SDK
---
## 介绍
WiFi库为配置和监视ESP8266 WiFi网络功能提供了支持。这包括：
- 站模式（又称STA模式或WiFi客户端模式）。ESP8266连接到接入点。
- AP模式（又称软安装模式或访问点模式）。电台连接到ESP8266。
- 组合的AP-STA模式（ESP8266同时是一个接入点，并且连接到另一个接入点）。
- 上述各种安全模式（WPA，WPA2，WEP等）
- 扫描访问点（主动和被动扫描）。
- IEEE802.11 WiFi数据包的混杂模式监视。

## 应用示例

## API参考
### 头文件
-   [esp8266/include/esp_wifi.h](https://github.com/espressif/ESP8266_RTOS_SDK/blob/a192988b/components/esp8266/include/esp_wifi.h)

### 函数
#### esp_err_t `esp_wifi_init`(const wifi_init_config_t \*config) 
---
wifi驱动程序的INIT WIFI ALLOC资源，例如WiFi控制结构，RX/TX缓冲区，WiFi NVS结构等，此WiFi还启动WiFi任务。

**注意：**
1. 必须先调用此API，然后才能调用所有其他WiFi API
2. 始终使用 WIFI _ INIT _ CONFIG _ DEFAULT 宏将配置初始化为默认值，这可以保证在未来版本中将更多字段添加到 WIFI _ init _ config _ t 时，所有字段都获得正确的值。如果你想设置你所有者的初始值，覆盖由 WIFI _ INIT _ CONFIG _ DEFAULT 设置的默认值，请注意 WIFI _ init _ config _ t 的‘ magic’字段应该始终是 WIFI _ INIT _ CONFIG _ MAGIC！

**返回值：**
-   `ESP_OK`: 成功
-   `ESP_ERR_NO_MEM`: 内存不足
-   `others`: 请参阅esp_err.h中的错误代码

**参数：**
- `config`: 指向WiFi初始化配置结构的指针，可以指向临时变量。

#### esp_err_t `esp_wifi_deinit`(void)
---
此函数释放 [esp_wifi_init](#esp-err-t-esp-wifi-init-const-wifi-init-config-t-config) 中分配的所有资源并停止 WiFi 任务。

**注意：**
1. 如果要从系统中删除WiFi驱动程序，应调用此API

**返回值：**
- `ESP_OK`: 成功

#### esp_err_t `esp_wifi_set_mode`(wifi_mode_t mode)
---
设置Wi-Fi工作模式  
设置Wi-Fi工作模式为station、soft AP或station+soft AP，默认为soft AP模式。

**返回值：**
-   `ESP_OK`: 成功
-   `ESP_ERR_WIFI_NOT_INIT`: WiFi未初始化
-   `ESP_ERR_INVALID_ARG`: 无效参数
-   `others`: 请参阅esp_err.h中的错误代码

**参数：**
-   `mode`: Wi-Fi工作模式

#### esp_err_t `esp_wifi_get_mode`(wifi_mode_t \*mode)
---
获取当前WiFi的工作模式

**返回值：**
-   `ESP_OK`: 成功
-   `ESP_ERR_WIFI_NOT_INIT`: WiFi未初始化
-   `ESP_ERR_INVALID_ARG`: 无效参数

**参数：**
-   `mode`: 存储当前WiFi模式

#### esp_err_t `esp_wifi_start`(void)
---
根据当前配置启动WiFi，如果模式为 WIFI_MODE_STA ，它会创建 station 控制块并启动 station，如果模式为WIFI_MODE_AP，它会创建 soft-AP 控制块，如果模式为 WIFI_MODE_APSTA，则创建 soft-AP 和 station 控制块，并启动 soft-AP 和 station。

**返回值：**
-   `ESP_OK`: 成功
-   `ESP_ERR_WIFI_NOT_INIT`: WiFi未初始化
-   `ESP_ERR_INVALID_ARG`: 无效参数
-   `ESP_ERR_NO_MEM`: 内存不足
-   `ESP_ERR_WIFI_CONN`: WIFI内部错误，station 或 soft-AP 控制块错误
-   `ESP_FAIL`: 其他WIFI内部错误

#### esp_err_t `esp_wifi_stop`(void)
---
此函数用于停止WiFi

如果当前工作模式为 WIFI_MODE_STA 则停止 station 并释放 station 控制块  
如果当前工作模式为 WIFI_MODE_AP 则停止 soft-AP 并释放 soft-AP 控制块  
如果当前工作模式为 WIFI_MODE_APSTA 则停止 station/soft-AP 并释放 station/soft-AP 控制块
**返回值：**
-   `ESP_OK`: 成功
-   `ESP_ERR_WIFI_NOT_INIT`: WiFi未初始化

#### esp_err_t `esp_wifi_restore`(void)
---
WiFi堆栈持久设置恢复到默认值

此函数将重置使用以下API进行的设置：
-   esp_wifi_get_auto_connect
-   esp_wifi_set_protocol
-   esp_wifi_set_config related
-   [esp_wifi_set_mode](#esp-err-t-esp-wifi-set-mode-wifi-mode-t-mode)

**返回值：**
-   `ESP_OK`: 成功
-   `ESP_ERR_WIFI_NOT_INIT`: WiFi未初始化

#### esp_err_t `esp_wifi_connect`(void)
---
将ESP8266 连接到WiFi。

**注意：**
1. 此 API 仅 [esp_wifi_set_mode](#esp-err-t-esp-wifi-set-mode-wifi-mode-t-mode) 为 WIFI_MODE_STA 或 WIFI_MODE_APSTA 时生效
2. 如果ESP8266已连接到AP，请先调用 [esp_wifi_disconnect](#esp-err-t-esp-wifi-disconnect-void) 断开连接。

**返回值：**
-   `ESP_OK`: 成功
-   `ESP_ERR_WIFI_NOT_INIT`: WiFi未初始化
-   `ESP_ERR_WIFI_NOT_START`: WiFi未启动
-   `ESP_ERR_WIFI_CONN`: WIFI内部错误，station 或 soft-AP 控制块错误
-   `ESP_ERR_WIFI_SSID`: 连接的AP的SSID无效

#### esp_err_t `esp_wifi_disconnect`(void)
---
断开ESP8266 WiFi站与AP的连接

**返回值：**
-   `ESP_OK`: 成功
-   `ESP_ERR_WIFI_NOT_INIT`: WiFi未初始化
-   `ESP_ERR_WIFI_NOT_STARTED`: 未启动WiFi
-   `ESP_FAIL`: 其他WiFi内部错误

#### esp_err_t `esp_wifi_clear_fast_connect`(void)
---
目前，该API只是一个存根API

**返回值：**
-   `ESP_OK`: 成功
-   `others`: 失败

#### esp_err_t `esp_wifi_deauth_sta`(uint16_t aid) 
---
取消对站点的身份验证

**返回值：**
-   `ESP_OK`: 成功
-   `ESP_ERR_WIFI_NOT_INIT`: WiFi未初始化
-   `ESP_ERR_WIFI_NOT_STARTED`: 未启动WiFi
-   `ESP_ERR_INVALID_ARG`: 无效参数
-   `ESP_ERR_WIFI_MODE`: WiFi 模式错误

**参数：**
-   `aid`: 当值为0时，取消所有站点的认证, 否则，取消对关联id为aid的站点的身份验证

#### esp_err_t `esp_wifi_scan_start`(constwifi_scan_config_t \*config, bool block)
---
扫描所有可用AP

**注意：**
1. 如果调用此API，则发现的网络将存储在WiFi驱动程序动态分配的内存中，并且将在 esp_wifi_scan_get_ap_records 中释放，因此通常在扫描完成后调用 esp_wifi_scan_get_ap_records 释放内存
2. 每个通道的最大主动扫描时间和被动扫描时间的值限制为1500毫秒。高于1500ms的值可能会导致站与AP断开连接，因此不建议使用超过1500ms的值。

**返回值：**
-   `ESP_OK`: 成功
-   `ESP_ERR_WIFI_NOT_INIT`: WiFi未初始化
-   `ESP_ERR_WIFI_NOT_STARTED`: 未启动WiFi
-   `ESP_ERR_WIFI_TIMEOUT`: 扫描超时
-   `others`: 请参阅esp_err.h中的错误代码

**参数：**
-   `config`: 扫描的配置
-   `block`: 如果为true，则此API将阻塞程序直到扫描完成，否则将立即返回

#### esp_err_t `esp_wifi_scan_stop`(void)
---
停止正在进行的扫描

**返回值：**
-   `ESP_OK`: 成功
-   `ESP_ERR_WIFI_NOT_INIT`: WiFi未初始化
-   `ESP_ERR_WIFI_NOT_STARTED`: 未启动WiFi

#### esp_err_t `esp_wifi_scan_get_ap_num`(uint16_t \*number)
---
获取上次扫描中找到的网络数量

**注意：**
1. 只有在扫描完成时才能调用此API，否则可能会获得错误的值

**返回值：**
-   `ESP_OK`: 成功
-   `ESP_ERR_WIFI_NOT_INIT`: WiFi未初始化
-   `ESP_ERR_WIFI_NOT_STARTED`: 未启动WiFi
-   `ESP_ERR_INVALID_ARG`: 无效参数

**参数：**
-   `number`: 存储上次扫描中找到的网络数量

