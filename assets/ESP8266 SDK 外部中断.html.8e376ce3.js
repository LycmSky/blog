import{_ as o}from"./plugin-vue_export-helper.21dcd24c.js";import{r as t,o as c,c as i,a as n,b as a,w as l,d as s,e as r}from"./app.a75b87e3.js";const u={},d=n("h2",{id:"\u8BF4\u660E",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u8BF4\u660E","aria-hidden":"true"},"#"),s(" \u8BF4\u660E")],-1),k=s("\u7531 "),m=s("ESP8266 SDK \u70B9\u706F"),v=s(" \u6539\u7684\u9879\u76EE\uFF0C\u5C06\u786C\u4EF6\u5B9A\u65F6\u5668\u4E2D\u65AD\u6539\u6210\u7531\u5916\u90E8\u4E2D\u65AD\u63A7\u5236\u3002"),_=r(`<h2 id="\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801" aria-hidden="true">#</a> \u4EE3\u7801</h2><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
\u4F5C\u8005\uFF1ALycm
\u65E5\u671F\uFF1A2022/7/17
chip\uFF1AESP8266EX
ESP8266_RTOS_SDK\uFF1Av3.4
toolchain\uFF1Av8.4.0
esptool.py\uFF1Av2.4.0 
*/</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;driver/gpio.h&quot;</span> <span class="token comment">// GPIO \u5934\u6587\u4EF6</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">LED_PIN</span>    <span class="token expression"><span class="token number">2</span> </span><span class="token comment">// \u5B9A\u4E49 GPIO2 \u4E3A LED_PIN\u3002 ESP12\u7CFB\u5217\u4E0A\u7684LED\u5C31\u662F\u63A5\u7684GPIO2 </span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">INTR_PIN</span>    <span class="token expression"><span class="token number">4</span> </span><span class="token comment">// \u5916\u90E8\u4E2D\u65AD\u5F15\u811A</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">GPIO_OUTPUT_PIN_SEL</span>  <span class="token expression"><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">1ULL</span><span class="token operator">&lt;&lt;</span>LED_PIN<span class="token punctuation">)</span><span class="token punctuation">)</span> </span><span class="token comment">// \u5B9A\u4E49\u4E00\u4E2A\u5BF9\u8C61\u7528\u4EE5\u914D\u7F6EGPIO</span></span>

<span class="token comment">/* 
\u591A\u4E2A\u5F15\u811A\u60F3\u8981\u8FDB\u884C\u76F8\u540C\u7684\u914D\u7F6E\u53EF\u4EE5\u5199\u5728\u4E00\u8D77
#define GPIO_OUTPUT_PIN_SEL  ((1ULL&lt;&lt;LED_PIN) | (1ULL&lt;&lt;OTHER_PIN) | ...)
*/</span>

<span class="token keyword">int</span> F_LED <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// \u7528\u6765\u5B58\u50A8LED\u72B6\u6001</span>

<span class="token comment">/* \u914D\u7F6EGPIO */</span>
<span class="token keyword">void</span> <span class="token function">gpio_init</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">/* \u5B9A\u4E49GPIO\u914D\u7F6E\u7ED3\u6784\u4F53 */</span>
    <span class="token class-name">gpio_config_t</span> io_conf<span class="token punctuation">;</span>

    <span class="token comment">/* \u914D\u7F6E\u7ED3\u6784\u4F53 */</span>
    io_conf<span class="token punctuation">.</span>intr_type <span class="token operator">=</span> GPIO_INTR_DISABLE<span class="token punctuation">;</span> <span class="token comment">// \u8BBE\u7F6E\u4E2D\u65AD\u6A21\u5F0F\uFF0C\u7981\u7528</span>
    io_conf<span class="token punctuation">.</span>mode <span class="token operator">=</span> GPIO_MODE_OUTPUT<span class="token punctuation">;</span> <span class="token comment">// \u8BBE\u7F6E\u8F93\u5165/\u8F93\u51FA\u6A21\u5F0F</span>
    io_conf<span class="token punctuation">.</span>pin_bit_mask <span class="token operator">=</span> GPIO_OUTPUT_PIN_SEL<span class="token punctuation">;</span> <span class="token comment">// \u9009\u62E9GPIO\u5F15\u811A</span>
    io_conf<span class="token punctuation">.</span>pull_down_en <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// \u662F\u5426\u542F\u7528\u5185\u90E8\u4E0B\u62C9</span>
    io_conf<span class="token punctuation">.</span>pull_up_en <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// \u662F\u5426\u542F\u7528\u5185\u90E8\u4E0A\u62C9</span>

    <span class="token comment">/* \u7528\u7ED9\u5B9A\u7684\u8BBE\u7F6E\u914D\u7F6EGPIO */</span>
    <span class="token function">gpio_config</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>io_conf<span class="token punctuation">)</span><span class="token punctuation">;</span> 

    <span class="token comment">/* \u914D\u7F6E\u7ED3\u6784\u4F53 */</span>
    io_conf<span class="token punctuation">.</span>intr_type <span class="token operator">=</span> GPIO_INTR_POSEDGE<span class="token punctuation">;</span> <span class="token comment">// \u8BBE\u7F6E\u4E2D\u65AD\u6A21\u5F0F\uFF0C\u4E0A\u5347\u6CBF</span>
    io_conf<span class="token punctuation">.</span>mode <span class="token operator">=</span> GPIO_MODE_INPUT<span class="token punctuation">;</span> <span class="token comment">// \u8BBE\u7F6E\u8F93\u5165/\u8F93\u51FA\u6A21\u5F0F</span>
    io_conf<span class="token punctuation">.</span>pin_bit_mask <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">1ULL</span><span class="token operator">&lt;&lt;</span>INTR_PIN<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u9009\u62E9GPIO\u5F15\u811A</span>
    io_conf<span class="token punctuation">.</span>pull_down_en <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// \u662F\u5426\u542F\u7528\u5185\u90E8\u4E0B\u62C9</span>

    <span class="token comment">/* \u7528\u7ED9\u5B9A\u7684\u8BBE\u7F6E\u914D\u7F6EGPIO */</span>
    <span class="token function">gpio_config</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>io_conf<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token comment">/* \u5916\u90E8\u4E2D\u65AD\u56DE\u8C03\u51FD\u6570 */</span>
<span class="token keyword">void</span> <span class="token function">blink</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>arg<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    F_LED <span class="token operator">=</span> <span class="token operator">!</span>F_LED<span class="token punctuation">;</span> <span class="token comment">// \u7FFB\u8F6C\u72B6\u6001</span>
    <span class="token function">gpio_set_level</span><span class="token punctuation">(</span>LED_PIN<span class="token punctuation">,</span> F_LED<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u8BBE\u7F6E\u5F15\u811A\u8F93\u51FA\u7535\u5E73 (\u5F15\u811A\u7F16\u53F7, \u5F15\u811A\u72B6\u6001)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* \u4E3B\u51FD\u6570 */</span>
<span class="token keyword">void</span> <span class="token function">app_main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">/* GPIO\u521D\u59CB\u5316 */</span>
    <span class="token function">gpio_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">gpio_install_isr_service</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u8BBE\u7F6E\u4E2D\u65AD\u4F18\u5148\u7EA7\uFF0C\u6B64\u9879\u662F\u4E3A\u4E86\u4E0EESP32\u517C\u5BB9\uFF0C\u6CA1\u6709\u5B9E\u9645\u610F\u4E49\uFF0C\u53EF\u75280\u586B\u5145</span>
    <span class="token function">gpio_isr_handler_add</span><span class="token punctuation">(</span>INTR_PIN<span class="token punctuation">,</span> blink<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u6CE8\u518C\u4E2D\u65AD\u51FD\u6570 (\u5F15\u811A\u7F16\u53F7, \u56DE\u8C03\u51FD\u6570, \u53C2\u6570)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u8D44\u6599" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u8D44\u6599" aria-hidden="true">#</a> \u53C2\u8003\u8D44\u6599</h2>`,3),b={href:"https://docs.espressif.com/projects/esp8266-rtos-sdk/en/latest/api-reference/peripherals/gpio.html",target:"_blank",rel:"noopener noreferrer"},h=s("API\u53C2\u8003-GPIO"),P={href:"https://so.csdn.net/so/search?q=GPIO&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},f=s("ESP32S2\u5F00\u53D1\u5B66\u4E60\u4E4B\u8DEF--GPIO\u4E0E\u4E2D\u65AD");function I(E,L){const p=t("RouterLink"),e=t("ExternalLinkIcon");return c(),i("div",null,[d,n("p",null,[k,a(p,{to:"/articles/ESP8266%20SDK%20%E7%82%B9%E7%81%AF.html"},{default:l(()=>[m]),_:1}),v]),_,n("ul",null,[n("li",null,[n("a",b,[h,a(e)])]),n("li",null,[n("a",P,[f,a(e)])])])])}var N=o(u,[["render",I],["__file","ESP8266 SDK \u5916\u90E8\u4E2D\u65AD.html.vue"]]);export{N as default};
