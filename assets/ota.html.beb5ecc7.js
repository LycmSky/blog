import{_ as t}from"./plugin-vue_export-helper.21dcd24c.js";import{r as p,o,c as i,a as s,b as c,e as a,d as n}from"./app.343f9fe9.js";const l={},r=a(`<h2 id="\u524D\u8A00" tabindex="-1"><a class="header-anchor" href="#\u524D\u8A00" aria-hidden="true">#</a> \u524D\u8A00</h2><p>\u672C\u7AE0\u4E3A ESP8266 OTA\u793A\u4F8B\u7A0B\u5E8F\uFF0C\u7531\u5B98\u65B9\u793A\u4F8B\u5F00\u59CB\uFF0C\u5E76\u8FDB\u884C\u4FEE\u6539\u3002</p><h2 id="_1-\u5B98\u65B9\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#_1-\u5B98\u65B9\u793A\u4F8B" aria-hidden="true">#</a> 1. \u5B98\u65B9\u793A\u4F8B</h2><p>\u5728\u4E50\u946B\u5B98\u65B9\u7684 SDK \u4E2D\uFF0C\u6709 OTA \u793A\u4F8B\u7A0B\u5E8F\uFF0C\u672C\u8282\u4E3A\u6210\u529F\u8FD0\u884C\u8BE5\u793A\u4F8B\u7684\u6B65\u9AA4\u3002</p><h3 id="_1-1-\u590D\u5236\u9879\u76EE" tabindex="-1"><a class="header-anchor" href="#_1-1-\u590D\u5236\u9879\u76EE" aria-hidden="true">#</a> 1.1 \u590D\u5236\u9879\u76EE</h3><p>\u5728 SDK \u4E2D\u627E\u5230\u5E76\u590D\u5236\u793A\u4F8B\u9879\u76EE<br> \u9879\u76EE\u8DEF\u5F84\uFF1A<strong>ESP8266_RTOS_SDK -&gt; examples -&gt; system -&gt; ota -&gt; simple_ota_example</strong></p><h3 id="_1-2-\u914D\u7F6E\u9879\u76EE" tabindex="-1"><a class="header-anchor" href="#_1-2-\u914D\u7F6E\u9879\u76EE" aria-hidden="true">#</a> 1.2 \u914D\u7F6E\u9879\u76EE</h3><p>\u9996\u5148\uFF0C\u6211\u4EEC\u9700\u8981\u5BF9\u9879\u76EE\u8FDB\u884C\u4E00\u4E9B\u76F8\u5173\u914D\u7F6E<br> \u4F7F\u7528 <code>make menuconfig</code> \u547D\u4EE4\u8FDB\u5165\u914D\u7F6E\u9762\u677F</p><ul><li><code>Serial flasher config ---&gt; Default serial port</code><br> \u914D\u7F6E\u901A\u4FE1\u7AEF\u53E3\uFF0C\u5373\u5F00\u53D1\u677F\u4E0E\u7535\u8111\u8FDE\u63A5\u7684\u7AEF\u53E3</li><li><code>Example Configuration ---&gt; firmware upgrade url endpoint</code><br> \u914D\u7F6E\u56FA\u4EF6\u4E0B\u8F7D\u5730\u5740\uFF0C\u5C06\u4F1A\u4F7F\u7528\u6B64\u5904\u914D\u7F6E\u7684\u5730\u5740\u4E0B\u8F7DOTA\u56FA\u4EF6<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>http://xxx.xxx.xxx.xxx:8070/xxx.bin
<span class="token comment"># xxx.xxx.xxx.xxx ---&gt; \u672C\u673A\u5728\u5F53\u524D\u7F51\u7EDC\u4E2D\u7684IP\u5730\u5740</span>
<span class="token comment"># xxx.bin ---&gt; \u8981\u5347\u7EA7\u7684\u56FA\u4EF6\u540D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><code>Example Connection Configuration ---&gt; WiFi SSID</code><br> \u914D\u7F6E WiFi SSID</li><li><code>Example Connection Configuration ---&gt; WiFi Password</code><br> \u914D\u7F6E WiFi \u5BC6\u7801</li><li><code>Component config ---&gt; ESP HTTPS OTA ---&gt; Allow HTTP for OTA</code><br> \u8BBE\u7F6E OTA \u8FDE\u63A5\u603B\u662F\u4F7F\u7528 HTTP</li></ul><h3 id="_1-3-\u70E7\u5F55\u56FA\u4EF6" tabindex="-1"><a class="header-anchor" href="#_1-3-\u70E7\u5F55\u56FA\u4EF6" aria-hidden="true">#</a> 1.3 \u70E7\u5F55\u56FA\u4EF6</h3><p>\u5728\u914D\u7F6E\u5B8C\u6210\u540E\uFF0C\u4F7F\u7528 <code>make flash</code> \u5373\u53EF\u5C06\u56FA\u4EF6\u70E7\u5F55\u5230\u5F00\u53D1\u677F\u4E2D</p><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u7531\u4E8E\u6211\u4EEC\u7684\u7F51\u7EDC\u548C\u4E0B\u8F7D\u5730\u5740\u90FD\u5728\u9879\u76EE\u914D\u7F6E\u4E2D\u8BBE\u7F6E\u597D\u4E86\uFF0C\u6240\u4EE5\u4E0D\u9700\u8981\u5728\u4EE3\u7801\u91CC\u8FDB\u884C\u76F8\u5173\u7684\u914D\u7F6E\u3002</p></div><p>\u70E7\u5F55\u5B8C\u6210\u540E\uFF0C\u4F7F\u7528 <code>make monitor</code> \u67E5\u770B\u65E5\u5FD7</p><details class="custom-block details"><summary>LOG</summary><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># make monitor</span>
Toolchain path: /opt/xtensa-lx106-elf/bin/xtensa-lx106-elf-gcc
Toolchain version: esp-2020r3-49-gd5524c1
Compiler version: <span class="token number">8.4</span>.0
Python requirements from C:/Users/lycm/esp/ESP8266_RTOS_SDK/requirements.txt are satisfied.
MONITOR
--- idf_monitor on COM5 <span class="token number">74880</span> ---
--- Quit: Ctrl+<span class="token punctuation">]</span> <span class="token operator">|</span> Menu: Ctrl+T <span class="token operator">|</span> Help: Ctrl+T followed by Ctrl+H ---

 ets Jan  <span class="token number">8</span> <span class="token number">2013</span>,rst cause:2, boot mode:<span class="token punctuation">(</span><span class="token number">3,6</span><span class="token punctuation">)</span>

load 0x40100000, len <span class="token number">7044</span>, room <span class="token number">16</span>
<span class="token function">tail</span> <span class="token number">4</span>
chksum 0x3c
load 0x3ffe8408, len <span class="token number">24</span>, room <span class="token number">4</span>
<span class="token function">tail</span> <span class="token number">4</span>
chksum 0xd5
load 0x3ffe8420, len <span class="token number">3328</span>, room <span class="token number">4</span>
<span class="token function">tail</span> <span class="token number">12</span>
chksum 0xa7
csum 0xa7
I <span class="token punctuation">(</span><span class="token number">45</span><span class="token punctuation">)</span> boot: ESP-IDF v3.4-63-ga192988b-dirty 2nd stage bootloader
I <span class="token punctuation">(</span><span class="token number">45</span><span class="token punctuation">)</span> boot: compile <span class="token function">time</span> <span class="token number">16</span>:28:12
I <span class="token punctuation">(</span><span class="token number">46</span><span class="token punctuation">)</span> qio_mode: Enabling default flash chip QIO
I <span class="token punctuation">(</span><span class="token number">54</span><span class="token punctuation">)</span> boot: SPI Speed      <span class="token builtin class-name">:</span> 40MHz
I <span class="token punctuation">(</span><span class="token number">61</span><span class="token punctuation">)</span> boot: SPI Mode       <span class="token builtin class-name">:</span> QIO
I <span class="token punctuation">(</span><span class="token number">67</span><span class="token punctuation">)</span> boot: SPI Flash Size <span class="token builtin class-name">:</span> 4MB
I <span class="token punctuation">(</span><span class="token number">73</span><span class="token punctuation">)</span> boot: Partition Table:
I <span class="token punctuation">(</span><span class="token number">79</span><span class="token punctuation">)</span> boot: <span class="token comment">## Label            Usage          Type ST Offset   Length</span>
I <span class="token punctuation">(</span><span class="token number">90</span><span class="token punctuation">)</span> boot:  <span class="token number">0</span> nvs              WiFi data        01 02 00009000 00004000
I <span class="token punctuation">(</span><span class="token number">101</span><span class="token punctuation">)</span> boot:  <span class="token number">1</span> otadata          OTA data         01 00 0000d000 00002000
I <span class="token punctuation">(</span><span class="token number">113</span><span class="token punctuation">)</span> boot:  <span class="token number">2</span> phy_init         RF data          01 01 0000f000 00001000
I <span class="token punctuation">(</span><span class="token number">124</span><span class="token punctuation">)</span> boot:  <span class="token number">3</span> ota_0            OTA app          00 <span class="token number">10</span> 00010000 000f0000
I <span class="token punctuation">(</span><span class="token number">136</span><span class="token punctuation">)</span> boot:  <span class="token number">4</span> ota_1            OTA app          00 <span class="token number">11</span> 00110000 000f0000
I <span class="token punctuation">(</span><span class="token number">148</span><span class="token punctuation">)</span> boot: End of partition table
I <span class="token punctuation">(</span><span class="token number">154</span><span class="token punctuation">)</span> boot: No factory image, trying OTA <span class="token number">0</span>
I <span class="token punctuation">(</span><span class="token number">162</span><span class="token punctuation">)</span> esp_image: segment <span class="token number">0</span>: <span class="token assign-left variable">paddr</span><span class="token operator">=</span>0x00010010 <span class="token assign-left variable">vaddr</span><span class="token operator">=</span>0x40210010 <span class="token assign-left variable">size</span><span class="token operator">=</span>0x7605c <span class="token punctuation">(</span><span class="token number">483420</span><span class="token punctuation">)</span> map
0x40210010: _stext at ??:?

I <span class="token punctuation">(</span><span class="token number">340</span><span class="token punctuation">)</span> esp_image: segment <span class="token number">1</span>: <span class="token assign-left variable">paddr</span><span class="token operator">=</span>0x00086074 <span class="token assign-left variable">vaddr</span><span class="token operator">=</span>0x4028606c <span class="token assign-left variable">size</span><span class="token operator">=</span>0x15ef8 <span class="token punctuation">(</span> <span class="token number">89848</span><span class="token punctuation">)</span> map
I <span class="token punctuation">(</span><span class="token number">371</span><span class="token punctuation">)</span> esp_image: segment <span class="token number">2</span>: <span class="token assign-left variable">paddr</span><span class="token operator">=</span>0x0009bf74 <span class="token assign-left variable">vaddr</span><span class="token operator">=</span>0x3ffe8000 <span class="token assign-left variable">size</span><span class="token operator">=</span>0x00688 <span class="token punctuation">(</span>  <span class="token number">1672</span><span class="token punctuation">)</span> load
I <span class="token punctuation">(</span><span class="token number">372</span><span class="token punctuation">)</span> esp_image: segment <span class="token number">3</span>: <span class="token assign-left variable">paddr</span><span class="token operator">=</span>0x0009c604 <span class="token assign-left variable">vaddr</span><span class="token operator">=</span>0x40100000 <span class="token assign-left variable">size</span><span class="token operator">=</span>0x00080 <span class="token punctuation">(</span>   <span class="token number">128</span><span class="token punctuation">)</span> load
I <span class="token punctuation">(</span><span class="token number">383</span><span class="token punctuation">)</span> esp_image: segment <span class="token number">4</span>: <span class="token assign-left variable">paddr</span><span class="token operator">=</span>0x0009c68c <span class="token assign-left variable">vaddr</span><span class="token operator">=</span>0x40100080 <span class="token assign-left variable">size</span><span class="token operator">=</span>0x05608 <span class="token punctuation">(</span> <span class="token number">22024</span><span class="token punctuation">)</span> load
I <span class="token punctuation">(</span><span class="token number">403</span><span class="token punctuation">)</span> boot: Loaded app from partition at offset 0x10000
I <span class="token punctuation">(</span><span class="token number">426</span><span class="token punctuation">)</span> system_api: Base MAC address is not set, <span class="token builtin class-name">read</span> default base MAC address from EFUSE
I <span class="token punctuation">(</span><span class="token number">428</span><span class="token punctuation">)</span> system_api: Base MAC address is not set, <span class="token builtin class-name">read</span> default base MAC address from EFUSE
phy_version: <span class="token number">1167.0</span>, 14a6402, Feb <span class="token number">17</span> <span class="token number">2022</span>, <span class="token number">11</span>:32:25, RTOS new
I <span class="token punctuation">(</span><span class="token number">495</span><span class="token punctuation">)</span> phy_init: phy ver: 1167_0
I <span class="token punctuation">(</span><span class="token number">505</span><span class="token punctuation">)</span> example_connect: Connecting to lycm<span class="token punctuation">..</span>.
I <span class="token punctuation">(</span><span class="token number">1574</span><span class="token punctuation">)</span> wifi:state: <span class="token number">0</span> -<span class="token operator">&gt;</span> <span class="token number">2</span> <span class="token punctuation">(</span>b0<span class="token punctuation">)</span>
I <span class="token punctuation">(</span><span class="token number">1634</span><span class="token punctuation">)</span> wifi:state: <span class="token number">2</span> -<span class="token operator">&gt;</span> <span class="token number">3</span> <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
I <span class="token punctuation">(</span><span class="token number">1658</span><span class="token punctuation">)</span> wifi:state: <span class="token number">3</span> -<span class="token operator">&gt;</span> <span class="token number">5</span> <span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
I <span class="token punctuation">(</span><span class="token number">1797</span><span class="token punctuation">)</span> wifi:connected with lycm, aid <span class="token operator">=</span> <span class="token number">2</span>, channel <span class="token number">11</span>, HT20, bssid <span class="token operator">=</span> 9c:9d:7e:50:52:c8
I <span class="token punctuation">(</span><span class="token number">3068</span><span class="token punctuation">)</span> tcpip_adapter: sta ip: <span class="token number">192.168</span>.0.173, mask: <span class="token number">255.255</span>.255.0, gw: <span class="token number">192.168</span>.0.1
I <span class="token punctuation">(</span><span class="token number">3070</span><span class="token punctuation">)</span> example_connect: Connected to lycm
I <span class="token punctuation">(</span><span class="token number">3073</span><span class="token punctuation">)</span> example_connect: IPv4 address: <span class="token number">192.168</span>.0.173
I <span class="token punctuation">(</span><span class="token number">3082</span><span class="token punctuation">)</span> simple_ota_example: Starting OTA example<span class="token punctuation">..</span>.
I <span class="token punctuation">(</span><span class="token number">3115</span><span class="token punctuation">)</span> esp_https_ota: Starting OTA<span class="token punctuation">..</span>.
I <span class="token punctuation">(</span><span class="token number">3116</span><span class="token punctuation">)</span> esp_https_ota: Writing to partition subtype <span class="token number">17</span> at offset 0x110000
I <span class="token punctuation">(</span><span class="token number">10889</span><span class="token punctuation">)</span> esp_https_ota: esp_ota_begin succeeded
I <span class="token punctuation">(</span><span class="token number">10890</span><span class="token punctuation">)</span> esp_https_ota: Please Wait. This may take <span class="token function">time</span>
D <span class="token punctuation">(</span><span class="token number">10892</span><span class="token punctuation">)</span> HTTP_CLIENT: esp_transport_read returned:-1 and errno:128
E <span class="token punctuation">(</span><span class="token number">21350</span><span class="token punctuation">)</span> HTTP_CLIENT: Connection failed, sock <span class="token operator">&lt;</span> <span class="token number">0</span>
E <span class="token punctuation">(</span><span class="token number">21351</span><span class="token punctuation">)</span> esp_https_ota: Failed to <span class="token function">open</span> HTTP connection: <span class="token number">28674</span>
E <span class="token punctuation">(</span><span class="token number">21352</span><span class="token punctuation">)</span> simple_ota_example: Firmware Upgrades Failed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>\u53EF\u4EE5\u53D1\u73B0\uFF0C\u51FA\u73B0\u4E86\u9519\u8BEF\uFF0C\u539F\u56E0\u662F\u8FDE\u63A5\u5931\u8D25<br> \u56E0\u4E3A\u6211\u4EEC\u4E0B\u8F7D\u56FA\u4EF6\u9700\u8981\u4ECE\u7F51\u7EDC\u4E0B\u8F7D\u624D\u884C</p><h3 id="_1-4-\u914D\u7F6E-simplehttpserver" tabindex="-1"><a class="header-anchor" href="#_1-4-\u914D\u7F6E-simplehttpserver" aria-hidden="true">#</a> 1.4 \u914D\u7F6E SimpleHTTPServer</h3><p>\u60F3\u8981\u901A\u8FC7\u65E0\u7EBF\u66F4\u65B0\u56FA\u4EF6\uFF0C\u5C31\u9700\u8981\u6709\u4E00\u4E2A HTTP \u670D\u52A1\u5668\u6765\u63D0\u4F9B\u56FA\u4EF6\u7684\u4E0B\u8F7D\u670D\u52A1\u3002<br> \u5728\u4E50\u946B\u7684 SDK \u4E2D\u63D0\u4F9B\u4E86\u4E00\u4E2A\u7B80\u6613\u7684\u670D\u52A1\u5668\u53EF\u4EE5\u5F88\u65B9\u4FBF\u7684\u4F7F\u7528</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> build
python -m SimpleHTTPServer <span class="token number">8070</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,18),u=n("\u4F7F\u7528\u6B64\u547D\u4EE4\u5C06\u4F1A\u521B\u5EFA\u4E00\u4E2A\u7B80\u5355\u7684 HTTP \u670D\u52A1\uFF0C\u5F53\u670D\u52A1\u6210\u529F\u542F\u52A8\u540E\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5728\u5F53\u524D\u8BBE\u5907\u7684\u6D4F\u89C8\u5668\u4E2D\u8F93\u5165 "),d={href:"http://127.0.0.1:8070",target:"_blank",rel:"noopener noreferrer"},m=n("http://127.0.0.1:8070"),k=n(" \u6765\u67E5\u770B\u3002"),b=a(`<p>\u542F\u52A8\u670D\u52A1\u540E\uFF0C\u91CD\u542F\u5F00\u53D1\u677F\uFF0C\u4F1A\u53D1\u73B0\u4ECD\u7136\u51FA\u73B0\u4E86\u9519\u8BEF</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>E <span class="token punctuation">(</span><span class="token number">10377</span><span class="token punctuation">)</span> esp_ota_ops: OTA image has invalid magic byte <span class="token punctuation">(</span>expected 0xE9, saw 0x3c
E <span class="token punctuation">(</span><span class="token number">10392</span><span class="token punctuation">)</span> esp_https_ota: Error: esp_ota_write failed<span class="token operator">!</span> <span class="token assign-left variable">err</span><span class="token operator">=</span>0x0
E <span class="token punctuation">(</span><span class="token number">10399</span><span class="token punctuation">)</span> simple_ota_example: Firmware Upgrades Failed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770B SimpleHTTPServer \u7684\u65E5\u5FD7</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># python -m SimpleHTTPServer 8070</span>
Serving HTTP on <span class="token number">0.0</span>.0.0 port <span class="token number">8070</span> <span class="token punctuation">..</span>.
<span class="token number">192.168</span>.0.173 - - <span class="token punctuation">[</span><span class="token number">11</span>/Aug/2022 <span class="token number">16</span>:57:38<span class="token punctuation">]</span> code <span class="token number">404</span>, message File not found
<span class="token number">192.168</span>.0.173 - - <span class="token punctuation">[</span><span class="token number">11</span>/Aug/2022 <span class="token number">16</span>:57:38<span class="token punctuation">]</span> <span class="token string">&quot;GET /simple_ota.ota.bin HTTP/1.1&quot;</span> <span class="token number">404</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u53D1\u73B0\u8BF7\u6C42\u7684\u72B6\u6001\u4E3A 404 not found \uFF0C\u4E5F\u5C31\u662F\u8BF4\u6CA1\u6709\u8FD9\u4E2A\u5730\u5740\u3002\u5982\u65E5\u5FD7\u4E2D\u6240\u793A\uFF0C\u6211\u4EEC\u7684\u76EE\u5F55\u4E2D\u5E76\u6CA1\u6709 <code>simple_ota.ota.bin</code> \u8FD9\u4E2A\u6587\u4EF6\uFF0C\u6240\u4EE5\u4E0B\u4E00\u6B65\u5C31\u662F\u751F\u6210\u8FD9\u4E2A\u6587\u4EF6</p><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u6B64\u5904\u7684 <code>simple_ota.ota.bin</code> \u662F\u6839\u636E <a href="#_1-2-%E9%85%8D%E7%BD%AE%E9%A1%B9%E7%9B%AE">\u9879\u76EE\u914D\u7F6E</a> \u4E2D\u7684 \u56FA\u4EF6\u4E0B\u8F7D\u5730\u5740</p></div><h3 id="_1-5-\u751F\u6210-ota-\u56FA\u4EF6" tabindex="-1"><a class="header-anchor" href="#_1-5-\u751F\u6210-ota-\u56FA\u4EF6" aria-hidden="true">#</a> 1.5 \u751F\u6210 OTA \u56FA\u4EF6</h3><p>SDK \u63D0\u4F9B\u4E86 <code>make ota</code> \u547D\u4EE4\u6765\u751F\u6210 OTA \u56FA\u4EF6</p><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u751F\u6210\u7684\u56FA\u4EF6\u5B58\u5728\u4E8E <code>build</code> \u76EE\u5F55\u4E2D\uFF0C\u6587\u4EF6\u540D\u4E3A <code>xxx.ota.bin</code> xxx\u4E3A\u5F53\u524D\u9879\u76EE\u540D</p></div><h3 id="_1-6-tips" tabindex="-1"><a class="header-anchor" href="#_1-6-tips" aria-hidden="true">#</a> 1.6 Tips</h3><p>\u6D4B\u8BD5\u524D\u5E94\u5F53\u6CE8\u610F\u5404\u9879\u670D\u52A1\u662F\u5426\u5DF2\u7ECF\u51C6\u5907\u5B8C\u6210</p><ul><li>HTTP \u670D\u52A1\u5668\u662F\u5426\u8FD0\u884C</li><li>OTA \u56FA\u4EF6\u662F\u5426\u751F\u6210</li><li>OTA \u56FA\u4EF6\u80FD\u5426\u901A\u8FC7\u670D\u52A1\u5668\u6B63\u5E38\u8BBF\u95EE\uFF08\u53EF\u5728\u6D4F\u89C8\u5668\u4E2D\u5C1D\u8BD5\u4E0B\u8F7D\u8BE5\u6587\u4EF6\uFF09</li><li>\u5F53\u524D\u56FA\u4EF6\u4E2D\u8BBE\u7F6E\u7684\u4E0B\u8F7D\u8FDE\u63A5\u662F\u5426\u4E0E\u6587\u4EF6\u5B9E\u9645\u7684\u94FE\u63A5\u4E00\u81F4</li><li>\u751F\u6210 OTA \u56FA\u4EF6\u65F6\uFF0C\u53EF\u5BF9\u7A0B\u5E8F\u8FDB\u884C\u4E00\u4E9B\u4FEE\u6539\uFF0C\u4FBF\u4E8E\u6211\u4EEC\u901A\u8FC7\u65E5\u5FD7\u5BF9\u6BD4\u6765\u5224\u65AD\u56FA\u4EF6\u662F\u5426\u6210\u529F\u66F4\u65B0</li></ul><h2 id="_2-\u793A\u4F8B\u62D3\u5C55" tabindex="-1"><a class="header-anchor" href="#_2-\u793A\u4F8B\u62D3\u5C55" aria-hidden="true">#</a> 2. \u793A\u4F8B\u62D3\u5C55</h2><p>\u2002\u2002\u2002\u2002\u524D\u9762\u4E86\u89E3\u4E86\u5982\u4F55\u6267\u884C\u5B98\u65B9\u7684\u793A\u4F8B\u9879\u76EE\uFF0C\u4F46\u5B9E\u9645\u8FD0\u7528\u4E2D\u4F1A\u66F4\u52A0\u590D\u6742\u3002\u524D\u9762\u7684\u793A\u4F8B\u4E2D\u5927\u90E8\u5206\u914D\u7F6E\u90FD\u662F\u901A\u8FC7\u9879\u76EE\u914D\u7F6E\u6765\u5B8C\u6210\u7684\uFF0C\u90A3\u6837\u505A\u867D\u7136\u5F88\u65B9\u4FBF\uFF0C\u4F46\u5374\u4E0D\u591F\u7075\u6D3B\u3002\u5728\u5B9E\u9645\u5F00\u53D1\u4E2D\uFF0C\u4F1A\u9700\u8981\u66F4\u7075\u6D3B\u7684\u4F7F\u7528\u3002\u6BD4\u5982\u9700\u8981\u66F4\u6362 WiFi \uFF0C\u624B\u52A8\u68C0\u67E5\u66F4\u65B0\u7B49\uFF0C\u8FD9\u65F6\u5C31\u9700\u8981\u901A\u8FC7\u4EE3\u7801\u6765\u5B9E\u73B0\u3002<br> \u2002\u2002\u2002\u2002\u5B9E\u4F8B\u9879\u76EE\u4E2D\uFF0C\u6709\u4E9B\u4E1C\u897F\u662F\u5DF2\u7ECF\u914D\u7F6E\u597D\u7684\uFF0C\u4F46\u5982\u679C\u9700\u8981\u65E9\u4E00\u4E2A\u666E\u901A\u9879\u76EE\u4E2D\u914D\u7F6E OTA \u5219\u8FD8\u662F\u8981\u81EA\u5DF1\u8FDB\u884C\u76F8\u5173\u914D\u7F6E\u3002\u672C\u7AE0\u5219\u7684\u76EE\u7684\u662F\u5728\u4E00\u4E2A\u666E\u901A\u7684\u9879\u76EE\u4E2D\u914D\u7F6E OTA \u5347\u7EA7\u56FA\u4EF6\u3002</p><h3 id="_2-1-\u590D\u5236\u9879\u76EE" tabindex="-1"><a class="header-anchor" href="#_2-1-\u590D\u5236\u9879\u76EE" aria-hidden="true">#</a> 2.1 \u590D\u5236\u9879\u76EE</h3><p>\u5728 SDK \u4E2D\u627E\u5230\u5E76\u590D\u5236\u793A\u4F8B\u9879\u76EE\uFF0C\u8FD9\u6B21\u4F7F\u7528 HelloWorld \u9879\u76EE \u9879\u76EE\u8DEF\u5F84\uFF1A<strong>ESP8266_RTOS_SDK ---&gt; examples ---&gt; get-started ---&gt; hello_world</strong></p><h3 id="_2-2-\u914D\u7F6E\u9879\u76EE" tabindex="-1"><a class="header-anchor" href="#_2-2-\u914D\u7F6E\u9879\u76EE" aria-hidden="true">#</a> 2.2 \u914D\u7F6E\u9879\u76EE</h3><p>\u9996\u5148\uFF0C\u6211\u4EEC\u9700\u8981\u5BF9\u9879\u76EE\u8FDB\u884C\u4E00\u4E9B\u76F8\u5173\u914D\u7F6E<br> \u4F7F\u7528 <code>make menuconfig</code> \u547D\u4EE4\u8FDB\u5165\u914D\u7F6E\u9762\u677F</p><ul><li><code>Serial flasher config ---&gt; Default serial port</code><br> \u914D\u7F6E\u901A\u4FE1\u7AEF\u53E3\uFF0C\u5373\u5F00\u53D1\u677F\u4E0E\u7535\u8111\u8FDE\u63A5\u7684\u7AEF\u53E3</li><li><code>Component config ---&gt; ESP HTTPS OTA ---&gt; Allow HTTP for OTA</code><br> \u8BBE\u7F6E OTA \u8FDE\u63A5\u603B\u662F\u4F7F\u7528 HTTP</li><li><code>Partition Table ---&gt; Partition Table ---&gt; Factory app, two OTA definitions</code><br> \u914D\u7F6E\u5206\u533A \u76F8\u6BD4\u793A\u4F8B\u4E0A\u4E00\u8282\u7684\u914D\u7F6E\uFF0C\u8FD9\u6B21\u8981\u4FEE\u6539\u7684\u5185\u5BB9\u5C11\u4E86\u4E00\u4E9B\uFF0C\u8FD9\u4E9B\u914D\u7F6E\u5C06\u4F1A\u5728\u4EE3\u7801\u4E2D\u8FDB\u884C\u3002</li></ul><h3 id="_2-3-\u7F16\u8F91\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#_2-3-\u7F16\u8F91\u4EE3\u7801" aria-hidden="true">#</a> 2.3 \u7F16\u8F91\u4EE3\u7801</h3><h4 id="i-\u6E05\u7A7A\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#i-\u6E05\u7A7A\u4EE3\u7801" aria-hidden="true">#</a> \u2160. \u6E05\u7A7A\u4EE3\u7801</h4><p>\u9996\u5148\u5C06\u793A\u4F8B\u6587\u4EF6\u4E2D\u7684\u4EE3\u7801\u5168\u90E8\u5220\u6389\uFF0C\u4ECE\u5934\u5F00\u59CB\u7F16\u8F91\u4E00\u4E2A\u65B0\u7684\u9879\u76EE</p><h4 id="ii-\u8FDE\u63A5-wi-fi" tabindex="-1"><a class="header-anchor" href="#ii-\u8FDE\u63A5-wi-fi" aria-hidden="true">#</a> II. \u8FDE\u63A5 Wi-Fi</h4><p>\u6DFB\u52A0\u94FE\u63A5 WiFi \u7684\u4EE3\u7801<br> \u53EF\u4EE5\u76F4\u63A5\u53C2\u8003\u5B98\u65B9\u793A\u4F8B\uFF1A<code>ESP8266_RTOS_SDK ---&gt; examples ---&gt; wifi ---&gt; getting_started ---&gt; station</code></p><h4 id="iii-\u6DFB\u52A0-ota-\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#iii-\u6DFB\u52A0-ota-\u4EE3\u7801" aria-hidden="true">#</a> III. \u6DFB\u52A0 OTA \u4EE3\u7801</h4><p>\u76F4\u63A5\u5C06\u524D\u9762\u793A\u4F8B\u4E2D\u7684\u4EE3\u7801\u76F4\u63A5\u590D\u5236\u8FC7\u6765\u5373\u53EF</p><h4 id="iv-\u4FEE\u6539\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#iv-\u4FEE\u6539\u4EE3\u7801" aria-hidden="true">#</a> IV. \u4FEE\u6539\u4EE3\u7801</h4><p>\u5220\u9664\u4E24\u4E2A\u793A\u4F8B\u7A0B\u5E8F\u4E2D\u91CD\u590D\u7684\u5934\u6587\u4EF6\u548C\u51FD\u6570</p><p>\u7531\u4E8E\u94FE\u63A5\u7F51\u7EDC\u662F\u7531\u4EE3\u7801\u5B9E\u73B0\u7684\uFF0C\u6240\u4EE5 OTA \u793A\u4F8B\u4E2D\u8FDE\u7F51\u7684\u90E8\u5206\u8981\u5220\u6389</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;protocol_examples_common.h&quot;</span></span>
<span class="token function">ESP_ERROR_CHECK</span><span class="token punctuation">(</span><span class="token function">example_connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4FEE\u6539\u56FA\u4EF6\u4E0B\u8F7D\u5730\u5740\uFF0C\u5C06 <code>ONFIG_FIRMWARE_UPGRADE_URL</code> \u66FF\u6362\u4E3A\u81EA\u5DF1\u7684\u7F51\u5740</p><p>\u5220\u9664\u8BC1\u4E66\u76F8\u5173\u7684\u5185\u5BB9\uFF0C\u56E0\u4E3A\u7528\u7684 HTTP \u534F\u8BAE\uFF0C\u4E0D\u9700\u8981\u8BC1\u4E66</p><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token keyword">extern</span> <span class="token keyword">const</span> <span class="token class-name">uint8_t</span> server_cert_pem_start<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">asm</span><span class="token punctuation">(</span><span class="token string">&quot;_binary_ca_cert_pem_start&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">extern</span> <span class="token keyword">const</span> <span class="token class-name">uint8_t</span> server_cert_pem_end<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">asm</span><span class="token punctuation">(</span><span class="token string">&quot;_binary_ca_cert_pem_end&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">.</span>cert_pem <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span>server_cert_pem_start<span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-\u70E7\u5F55\u56FA\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2-4-\u70E7\u5F55\u56FA\u4EF6" aria-hidden="true">#</a> 2.4 \u70E7\u5F55\u56FA\u4EF6</h3><p>\u5269\u4E0B\u7684\u548C\u4E0A\u4E00\u8282\u4E2D\u7684\u5185\u5BB9\u4E00\u81F4</p><ul><li><a href="#_1-4-%E9%85%8D%E7%BD%AE-simplehttpserver">\u542F\u52A8 HTTP \u670D\u52A1</a></li><li><a href="#_1-5-%E7%94%9F%E6%88%90-ota-%E5%9B%BA%E4%BB%B6">\u751F\u6210 OTA \u56FA\u4EF6</a></li><li><a href="#_1-3-%E7%83%A7%E5%BD%95%E5%9B%BA%E4%BB%B6">\u70E7\u5F55\u56FA\u4EF6</a></li><li>\u67E5\u770B\u662F\u5426\u6B63\u5E38\u8FD0\u884C</li></ul>`,36);function v(h,_){const e=p("ExternalLinkIcon");return o(),i("div",null,[r,s("p",null,[u,s("a",d,[m,c(e)]),k]),b])}var f=t(l,[["render",v],["__file","ota.html.vue"]]);export{f as default};
