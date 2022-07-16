---
title: ESP8266 SDK 点灯 # 文章标题
description: 8266SDK GPIO，定时器中断实例
category: # 分类
  - 文章
  - IOT
tag: # 标签
  - ESP8266
---
## 说明
一个简单的项目，使ESP12F上的LED闪烁  
此程序涉及 GPIO 及 ESP8266 硬件定时器中断的配置使用  
因为程序很简单，所以不做过多解释，直接看注释就行（写的应该够明白了）  
更多配置选项请参考对应[API文档](#参考资料)

## 代码
```c
/*
作者：Lycm
日期：2022/7/16
chip：ESP8266EX
ESP8266_RTOS_SDK：v3.4
toolchain：v8.4.0
esptool.py：v2.4.0 
*/

#include <stdio.h>
#include <stdbool.h> // 为了支持 hw_timer 中使用的 bool 类型

#include "driver/gpio.h" // GPIO 头文件
#include "driver/hw_timer.h" // 硬件定时器头文件

#define LED_PIN    2 // 定义 GPIO2 为 LED_PIN。 ESP12系列上的LED就是接的GPIO2 
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
    io_conf.intr_type = GPIO_INTR_DISABLE; // 设置中断模式
    io_conf.mode = GPIO_MODE_OUTPUT; // 设置输入/输出模式
    io_conf.pin_bit_mask = GPIO_OUTPUT_PIN_SEL; // 选择GPIO引脚
    io_conf.pull_down_en = 0; // 是否启用内部下拉
    io_conf.pull_up_en = 0; // 是否启用内部上拉

    /* 用给定的设置配置GPIO */
    gpio_config(&io_conf); 
}

/* 定时器中断回调函数 */
void HW_Timer_INT(void *arg) // 配置定时器要传一个参数，暂时不知道如何不传参。 void * 为通用指针
{
    F_LED = !F_LED; // 翻转状态
    gpio_set_level(LED_PIN, F_LED); // 设置引脚输出电平 (引脚编号, 引脚状态)
}

/* 主函数 */
void app_main(void)
{
    /* GPIO初始化 */
    gpio_init();

    /* 初始化硬件定时器 */
    hw_timer_init(HW_Timer_INT, NULL); // (回调函数, 传给函数的参数)

    /* 配置硬件定时器 */
    hw_timer_alarm_us(500*1000, 1); // (定时时间 单位微秒, 定时器是否重新加载)
    // hw_timer_set_reload(1); // 启用定时器重新加载，hw_timer_alarm_us 函数也可以配置

    /* 启用硬件定时器 */
    hw_timer_enable(1); // 启用硬件定时器
}
```

## 参考资料
- [API参考-Hardware Timer](https://docs.espressif.com/projects/esp8266-rtos-sdk/en/latest/api-reference/peripherals/hw_timer.html)
- [API参考-GPIO](https://docs.espressif.com/projects/esp8266-rtos-sdk/en/latest/api-reference/peripherals/gpio.html)
- [百度百科-stdbool.h](https://baike.baidu.com/item/stdbool.h/8438118)