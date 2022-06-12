---
title: moonraker与香橙派gpio # 文章标题
description: 记一次异常处理
category: # 分类
  - 文章
  - 3D打印
tag: # 标签
  - Klipper
  - 3D打印
  - moonraker
  - 香橙派
---

## 前言
本文记录自己添加 GPIO 控制的过程以及遇到的问题，供自己和其他有需要的人参考。  
如果遇到 `[power]` 启用设备电源控制失败，或许可以参考本篇，只想看解决方案可以跳转到[解决方法](#五、解决方法)
### 相关信息
- 硬件：香橙派 Zero 2
- Klipper：v0.10.0-461-gc30e5f84
- moonraker：v0.7.1-586-ga8b9fc0
::: info
事实上出的问题主要是硬件上的问题，软件版本对其应该不会有什么影响。
:::

## 配置目的
首先还是最关键的，为什么要这么搞？   

因为我希望通过上位机来控制打印机的开关，通过GPIO控制固态继电器，从而控制24V开关电源以及后面的电路。  
### 为什么选择用 moonraker 配置
上面说了，其实本质上是控制上位机的GPIO开关，那么控制GPIO的方式那么多，可以配置klipper、也可以写脚本、等等等等。为什么要配置 moonraker？  

- 方便
说方便其实是两种意义上的方便，配置方便和使用方便  

配置上，moonraker 给出了设备电源控制的方案，十分契合我们的需求。当然不仅于此，正如其名字`电源控制方案`，像什么灯光啥的我们手动开关的设备其实都适合通过这种方法配置。  

使用上，配置完成后moonraker会在侧边栏添加一个开关，我们在fluidd页面可以很轻松的操作。
- 美观  
![](https://img.lycm.xyz/img/20220612192556.png)


## 配置
总算是进入正文了
### 一、硬件连接
这个我就不细讲了，根据自己的实际情况连接就好。
### 二、找到自己使用针脚的编号
这个方法有很多，随便讲几种 （以香橙派zero2为例，使用的26号引脚）
::: danger 引脚编号
GPIO引脚的编号方式有很多种，这里moonraker配置用到的是GPIO序号。  
为避免混乱  
引脚号指物理引脚编号，便于寻找。  
序号指要使用的GPIO序号
:::
####  查询文档  
![](https://img.lycm.xyz/img/20220612193914.png)
根据文档可知，26号引脚的序号是74
#### 使用wiringOP
:::info
wiringOP是香橙派的GPIO库，树莓派相应的库叫`wiringpi`
:::

查询命令
```shell
gpio readall
```
返回结果
```shell
 +------+-----+----------+------+---+  Zero 2  +---+------+----------+-----+------+
 | GPIO | wPi |   Name   | Mode | V | Physical | V | Mode | Name     | wPi | GPIO |
 +------+-----+----------+------+---+----++----+---+------+----------+-----+------+
 |      |     |     3.3V |      |   |  1 || 2  |   |      | 5V       |     |      |
 |  229 |   0 |    SDA.3 |  OFF | 0 |  3 || 4  |   |      | 5V       |     |      |
 |  228 |   1 |    SCL.3 |  OFF | 0 |  5 || 6  |   |      | GND      |     |      |
 |   73 |   2 |      PC9 |  OFF | 0 |  7 || 8  | 0 | ALT2 | TXD.5    | 3   | 226  |
 |      |     |      GND |      |   |  9 || 10 | 0 | ALT2 | RXD.5    | 4   | 227  |
 |   70 |   5 |      PC6 | ALT5 | 0 | 11 || 12 | 0 | OFF  | PC11     | 6   | 75   |
 |   69 |   7 |      PC5 | ALT5 | 0 | 13 || 14 |   |      | GND      |     |      |
 |   72 |   8 |      PC8 |  OFF | 0 | 15 || 16 | 0 | OFF  | PC15     | 9   | 79   |
 |      |     |     3.3V |      |   | 17 || 18 | 0 | OFF  | PC14     | 10  | 78   |
 |  231 |  11 |   MOSI.1 |  OFF | 0 | 19 || 20 |   |      | GND      |     |      |
 |  232 |  12 |   MISO.1 |  OFF | 0 | 21 || 22 | 0 | OFF  | PC7      | 13  | 71   |
 |  230 |  14 |   SCLK.1 |  OFF | 0 | 23 || 24 | 0 | OFF  | CE.1     | 15  | 233  |
 |      |     |      GND |      |   | 25 || 26 | 1 | OUT  | PC10     | 16  | 74   |
 |   65 |  17 |      PC1 |  OFF | 0 | 27 || 28 |   |      |          |     |      |
 |  272 |  18 |     PI16 | ALT2 | 0 | 29 || 30 |   |      |          |     |      |
 |  262 |  19 |      PI6 |  OFF | 0 | 31 || 32 |   |      |          |     |      |
 |  234 |  20 |     PH10 | ALT3 | 0 | 33 || 34 |   |      |          |     |      |
 +------+-----+----------+------+---+----++----+---+------+----------+-----+------+
 | GPIO | wPi |   Name   | Mode | V | Physical | V | Mode | Name     | wPi | GPIO |
 +------+-----+----------+------+---+  Zero 2  +---+------+----------+-----+------+
```

#### 使用 gpiod
安装库
```shell
sudo apt install gpiod
```
查询命令
```shell
sudo gpioinfo
```
返回
```
gpiochip0 - 288 lines:
        line   0:      unnamed       unused   input  active-high
        line   1:      unnamed       unused   input  active-high
        line   2:      unnamed       unused   input  active-high
        line   3:      unnamed       unused   input  active-high
        line   4:      unnamed       unused   input  active-high
        ........................................................
        line  74:      unnamed       unused   input  active-high
        ........................................................
        line 285:      unnamed       unused   input  active-high
        line 286:      unnamed       unused   input  active-high
        line 287:      unnamed       unused   input  active-high
gpiochip1 - 32 lines:
        line   0:      unnamed       unused   input  active-high
        line   1:      unnamed       unused   input  active-high
        line   2:      unnamed       unused   input  active-high
        line   3:      unnamed       unused   input  active-high
        ........................................................
        line  28:      unnamed       unused   input  active-high
        line  29:      unnamed       unused   input  active-high
        line  30:      unnamed       unused   input  active-high
        line  31:      unnamed       unused   input  active-high
```
:::info
这个主要是用来查询 `gpiochip`，来看使用的引脚是在那个设备下。  
这里序号74就属于`gpiochip0`
:::
### 三、修改配置文件
得到我们引脚序号后接下来就是来配置了。  

打开 `moonraker.conf` 文件，在其中添加以下配置
```conf
[power printer] # printer: 名称，可自定义
type: gpio
pin: gpiochip0/gpio74 # gpiochip0: 设备名 / gpio74: GPIO序号
restart_klipper_when_powered: True # 上电后重新启动
off_when_shutdown: False
initial_state: on # 初始状态
```
保存并重启moonraker，应该就可以在侧边栏中找到电源栏了。

## 遇到的问题
### 现象
添加配置后没有开关  
![](https://img.lycm.xyz/img/20220612213834.png)

错误提示：
-   Failed to load power device [power printer] Error parsing option (pin) from section [power printer]
-   Unparsed config option 'pin: gpiochip0/gpio74' detected in section [power printer]. This may be an option no longer available or could be the result of a module that failed to load. In the future this will result in a startup error.  
![](https://img.lycm.xyz/img/20220612214025.png)
### 排查过程
:::info
这部分主要是记录排查错误的过程，感兴趣可以看看，跳过问题也不大。
:::
起初我以为是自己的序号填错了，但是在我尝试了各种引脚编号都无果后，我才想起去看看日志。  

查看 `moonraker.log` 文件，找到如下错误
```log
Traceback (most recent call last):
  File "/home/lycm/moonraker/moonraker/components/gpio.py", line 84, in _request_gpio
    chip = self._get_gpio_chip(pin_params['chip_id'])
  File "/home/lycm/moonraker/moonraker/components/gpio.py", line 40, in _get_gpio_chip
    chip = self.gpiod.Chip(chip_name, self.gpiod.Chip.OPEN_BY_NAME)
PermissionError: [Errno 13] Permission denied
2022-06-12 13:36:52,513 [moonraker.py:add_warning()] - Failed to load power device [power printer]
Error parsing option (pin) from section [power printer]
```

可以发现出错的地方在 `gpio.py` 文件中，错误的原因是 `Permission denied` 权限不足。但不知道具体原因，所以还是要进一步去查看一下这个部分。  

打开` gpio.py` 文件，找到第40行错误的地方。发现是一个类函数。
::: details gpio.py
关键部分已经高亮标出
```python {37-42,79-103} 
# GPIO Factory helper
#
# Copyright (C) 2021 Eric Callahan <arksine.code@gmail.com>
#
# This file may be distributed under the terms of the GNU GPLv3 license.
from __future__ import annotations
import logging
from utils import load_system_module

# Annotation imports
from typing import (
    TYPE_CHECKING,
    Any,
    Awaitable,
    Callable,
    Dict,
    Optional
)

if TYPE_CHECKING:
    from confighelper import ConfigHelper
    from eventloop import EventLoop
    GPIO_CALLBACK = Callable[[float, float, int], Optional[Awaitable[None]]]

class GpioFactory:
    def __init__(self, config: ConfigHelper) -> None:
        self.server = config.get_server()
        self.gpiod: Any = load_system_module("gpiod")
        GpioEvent.init_constants(self.gpiod)
        self.chips: Dict[str, Any] = {}
        self.reserved_gpios: Dict[str, GpioBase] = {}
        version: str = self.gpiod.version_string()
        self.gpiod_version = tuple(int(v) for v in version.split('.'))
        self.server.add_log_rollover_item(
            "gpiod_version", f"libgpiod version: {version}")

    def _get_gpio_chip(self, chip_name) -> Any:
        if chip_name in self.chips:
            return self.chips[chip_name]
        chip = self.gpiod.Chip(chip_name, self.gpiod.Chip.OPEN_BY_NAME)
        self.chips[chip_name] = chip
        return chip

    def setup_gpio_out(self,
                       pin_name: str,
                       initial_value: int = 0
                       ) -> GpioOutputPin:
        initial_value = int(not not initial_value)
        pparams = self._parse_pin(pin_name)
        pparams['initial_value'] = initial_value
        line = self._request_gpio(pparams)
        try:
            gpio_out = GpioOutputPin(line, pparams)
        except Exception:
            logging.exception("Error Instantiating GpioOutputPin")
            line.release()
            raise
        full_name = pparams['full_name']
        self.reserved_gpios[full_name] = gpio_out
        return gpio_out

    def register_gpio_event(self,
                            pin_name: str,
                            callback: GPIO_CALLBACK
                            ) -> GpioEvent:
        pin_params = self._parse_pin(pin_name, type="event")
        line = self._request_gpio(pin_params)
        event_loop = self.server.get_event_loop()
        try:
            gpio_event = GpioEvent(event_loop, line, pin_params, callback)
        except Exception:
            logging.exception("Error Instantiating GpioEvent")
            line.release()
            raise
        full_name = pin_params['full_name']
        self.reserved_gpios[full_name] = gpio_event
        return gpio_event

    def _request_gpio(self, pin_params: Dict[str, Any]) -> Any:
        full_name = pin_params['full_name']
        if full_name in self.reserved_gpios:
            raise self.server.error(f"GPIO {full_name} already reserved")
        try:
            chip = self._get_gpio_chip(pin_params['chip_id'])
            line = chip.get_line(pin_params['pin_id'])
            args: Dict[str, Any] = {
                'consumer': "moonraker",
                'type': pin_params['request_type']
            }
            if 'flags' in pin_params:
                args['flags'] = pin_params['flags']
            if 'initial_value' in pin_params:
                if self.gpiod_version < (1, 3):
                    args['default_vals'] = [pin_params['initial_value']]
                else:
                    args['default_val'] = pin_params['initial_value']
            line.request(**args)
        except Exception:
            logging.exception(
                f"Unable to init {full_name}.  Make sure the gpio is not in "
                "use by another program or exported by sysfs.")
            raise
        return line

    def _parse_pin(self,
                   pin_name: str,
                   type: str = "out"
                   ) -> Dict[str, Any]:
        params: Dict[str, Any] = {
            'orig': pin_name,
            'invert': False,
        }
        pin = pin_name
        if type == "event":
            params['request_type'] = self.gpiod.LINE_REQ_EV_BOTH_EDGES
            flag: str = "disable"
            if pin[0] == "^":
                pin = pin[1:]
                flag = "pullup"
            elif pin[0] == "~":
                pin = pin[1:]
                flag = "pulldown"
            if self.gpiod_version >= (1, 5):
                flag_to_enum = {
                    "disable": self.gpiod.LINE_REQ_FLAG_BIAS_DISABLE,
                    "pullup": self.gpiod.LINE_REQ_FLAG_BIAS_PULL_UP,
                    "pulldown": self.gpiod.LINE_REQ_FLAG_BIAS_PULL_DOWN
                }
                params['flags'] = flag_to_enum[flag]
            elif flag != "disable":
                raise self.server.error(
                    f"Flag {flag} configured for event GPIO '{pin_name}'"
                    " requires libgpiod version 1.5 or later.  "
                    f"Current Version: {self.gpiod.version_string()}")
        elif type == "out":
            params['request_type'] = self.gpiod.LINE_REQ_DIR_OUT
        if pin[0] == "!":
            pin = pin[1:]
            params['invert'] = True
            if 'flags' in params:
                params['flags'] |= self.gpiod.LINE_REQ_FLAG_ACTIVE_LOW
            else:
                params['flags'] = self.gpiod.LINE_REQ_FLAG_ACTIVE_LOW
        chip_id: str = "gpiochip0"
        pin_parts = pin.split("/")
        if len(pin_parts) == 2:
            chip_id, pin = pin_parts
        elif len(pin_parts) == 1:
            pin = pin_parts[0]
        # Verify pin
        if not chip_id.startswith("gpiochip") or \
                not chip_id[-1].isdigit() or \
                not pin.startswith("gpio") or \
                not pin[4:].isdigit():
            raise self.server.error(
                f"Invalid Gpio Pin: {pin_name}")
        pin_id = int(pin[4:])
        params['pin_id'] = pin_id
        params['chip_id'] = chip_id
        params['full_name'] = f"{chip_id}:{pin}"
        return params

    def close(self) -> None:
        for line in self.reserved_gpios.values():
            line.release()
        for chip in self.chips.values():
            chip.close()

class GpioBase:
    def __init__(self,
                 line: Any,
                 pin_params: Dict[str, Any]
                 ) -> None:
        self.orig: str = pin_params['orig']
        self.name: str = pin_params['full_name']
        self.inverted: bool = pin_params['invert']
        self.line: Any = line
        self.value: int = pin_params.get('initial_value', 0)

    def release(self) -> None:
        self.line.release()

    def is_inverted(self) -> bool:
        return self.inverted

    def get_value(self) -> int:
        return self.value

    def get_name(self) -> str:
        return self.name

    def __str__(self) -> str:
        return self.orig

class GpioOutputPin(GpioBase):
    def write(self, value: int) -> None:
        self.value = int(not not value)
        self.line.set_value(self.value)


MAX_ERRORS = 20

class GpioEvent(GpioBase):
    EVENT_FALLING_EDGE = 0
    EVENT_RISING_EDGE = 1
    def __init__(self,
                 event_loop: EventLoop,
                 line: Any,
                 pin_params: Dict[str, Any],
                 callback: GPIO_CALLBACK
                 ) -> None:
        super().__init__(line, pin_params)
        self.event_loop = event_loop
        self.fd = line.event_get_fd()
        self.callback = callback
        self.on_error: Optional[Callable[[str], None]] = None
        self.min_evt_time = 0.
        self.last_event_time = 0.
        self.error_count = 0
        self.started = False

    @classmethod
    def init_constants(cls, gpiod: Any) -> None:
        cls.EVENT_RISING_EDGE = gpiod.LineEvent.RISING_EDGE
        cls.EVENT_FALLING_EDGE = gpiod.LineEvent.FALLING_EDGE

    def setup_debounce(self,
                       min_evt_time: float,
                       err_callback: Optional[Callable[[str], None]]
                       ) -> None:
        self.min_evt_time = max(min_evt_time, 0.)
        self.on_error = err_callback

    def start(self) -> None:
        if not self.started:
            self.value = self.line.get_value()
            self.last_event_time = self.event_loop.get_loop_time()
            self.event_loop.add_reader(self.fd, self._on_event_trigger)
            self.started = True
            logging.debug(f"GPIO {self.name}: Listening for events, "
                          f"current state: {self.value}")

    def stop(self) -> None:
        if self.started:
            self.event_loop.remove_reader(self.fd)
            self.started = False

    def release(self) -> None:
        self.stop()
        self.line.release()

    def _on_event_trigger(self) -> None:
        evt = self.line.event_read()
        last_val = self.value
        if evt.type == self.EVENT_RISING_EDGE:
            self.value = 1
        elif evt.type == self.EVENT_FALLING_EDGE:
            self.value = 0
        eventtime = self.event_loop.get_loop_time()
        evt_duration = eventtime - self.last_event_time
        if last_val == self.value or evt_duration < self.min_evt_time:
            self._increment_error()
            return
        self.last_event_time = eventtime
        self.error_count = 0
        ret = self.callback(eventtime, evt_duration, self.value)
        if ret is not None:
            self.event_loop.create_task(ret)

    def _increment_error(self) -> None:
        self.error_count += 1
        if self.error_count >= MAX_ERRORS:
            self.stop()
            if self.on_error is not None:
                self.on_error("Too Many Consecutive Errors, "
                              f"GPIO Event Disabled on {self.name}")


def load_component(config: ConfigHelper) -> GpioFactory:
    return GpioFactory(config)

```
:::

分析后可得错误的地方其实就是下面这样子
```python
import gpiod

gpiod.Chip("gpiochip0", gpiod.Chip.OPEN_BY_NAME)
```
运行 `gpiod.Chip.OPEN_BY_NAME` ，他的返回值为2。所以以上代码还可以简化
```python
import gpiod

gpiod.Chip("gpiochip0", 2)
```
单独执行这段代码，会发现出现了和日志中相同的错误
```python
Python 3.9.2 (default, Feb 28 2021, 17:03:44)
[GCC 10.2.1 20210110] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import gpiod
>>> gpiod.Chip("gpiochip0", 2)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
PermissionError: [Errno 13] Permission denied
>>>
```
由此可以确定，问题就在这段命令。
::: tip
哦我的老天爷！这作者的思维跳跃得简直就像那奔向月球得火箭。我真想用靴子狠狠的踢他的屁股！  

好吧其实中间最重要的部分让我摸了，其实那部分倒也不难，不过要码字码出来工作量还是很大。理解万岁好吧。
:::
### 五、解决方法
根据分析，可以确定问题实在执行gpiod这个库的Chip函数时权限不足。但我还是不知道怎么解决，不过到了这种程度可以尝试在网上查询一下。  

在浏览器中搜索 `gpiod.Chip` `Permission denied` ,很幸运第一条就是一个GitHub的issues。<https://github.com/warthog618/gpiod/issues/10>  

其中提到 `gpiochip0` 的权限问题，于是尝试修改权限。  
```shell
sudo chmod 777 /dev/gpiochip0
```

重启 `moonraker` ，错误消失，侧边栏选项正常显示并可以正常工作

## 相关链接
- [moonraker 配置文档](https://moonraker.readthedocs.io/en/stable/configuration/#power)