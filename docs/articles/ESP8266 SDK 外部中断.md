---
title: ESP8266 SDK 外部中断 # 文章标题
description: 8266SDK GPIO，外部中断示例
category: # 分类
  - 文章
  - IOT
tag: # 标签
  - ESP8266
---

## 说明
由 [ESP8266 SDK 点灯](./ESP8266%20SDK%20点灯.md) 改的项目，将硬件定时器中断改成由外部中断控制。

## 代码
```c
/*
作者：Lycm
日期：2022/7/17
chip：ESP8266EX
ESP8266_RTOS_SDK：v3.4
toolchain：v8.4.0
esptool.py：v2.4.0 
*/

#include <stdio.h>

#include "driver/gpio.h" // GPIO 头文件

#define LED_PIN    2 // 定义 GPIO2 为 LED_PIN。 ESP12系列上的LED就是接的GPIO2 
#define INTR_PIN    4 // 外部中断引脚
#define GPIO_OUTPUT_PIN_SEL  ((1ULL<<LED_PIN)) // 定义一个对象用以配置GPIO

/* 
多个引脚想要进行相同的配置可以写在一起
#define GPIO_OUTPUT_PIN_SEL  ((1ULL<<LED_PIN) | (1ULL<<OTHER_PIN) | ...)
*/

int F_LED = 0; // 用来存储LED状态

/* 配置GPIO */
void gpio_init(void)
{
    /* 定义GPIO配置结构体 */
    gpio_config_t io_conf;

    /* 配置结构体 */
    io_conf.intr_type = GPIO_INTR_DISABLE; // 设置中断模式，禁用
    io_conf.mode = GPIO_MODE_OUTPUT; // 设置输入/输出模式
    io_conf.pin_bit_mask = GPIO_OUTPUT_PIN_SEL; // 选择GPIO引脚
    io_conf.pull_down_en = 0; // 是否启用内部下拉
    io_conf.pull_up_en = 0; // 是否启用内部上拉

    /* 用给定的设置配置GPIO */
    gpio_config(&io_conf); 

    /* 配置结构体 */
    io_conf.intr_type = GPIO_INTR_POSEDGE; // 设置中断模式，上升沿
    io_conf.mode = GPIO_MODE_INPUT; // 设置输入/输出模式
    io_conf.pin_bit_mask = (1ULL<<INTR_PIN); // 选择GPIO引脚
    io_conf.pull_down_en = 1; // 是否启用内部下拉

    /* 用给定的设置配置GPIO */
    gpio_config(&io_conf);
}


/* 外部中断回调函数 */
void blink(void *arg)
{
    F_LED = !F_LED; // 翻转状态
    gpio_set_level(LED_PIN, F_LED); // 设置引脚输出电平 (引脚编号, 引脚状态)
}

/* 主函数 */
void app_main(void)
{
    /* GPIO初始化 */
    gpio_init();

    gpio_install_isr_service(0); // 设置中断优先级，此项是为了与ESP32兼容，没有实际意义，可用0填充
    gpio_isr_handler_add(INTR_PIN, blink, NULL); // 注册中断函数 (引脚编号, 回调函数, 参数)
}
```

## 参考资料
- [API参考-GPIO](https://docs.espressif.com/projects/esp8266-rtos-sdk/en/latest/api-reference/peripherals/gpio.html)
- [ESP32S2开发学习之路--GPIO与中断](https://so.csdn.net/so/search?q=GPIO&spm=1001.2101.3001.7020)