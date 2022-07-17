import{_ as t}from"./plugin-vue_export-helper.21dcd24c.js";import{r as p,o,c as i,a as n,b as a,e as c,d as e}from"./app.17c9999d.js";const l={},r=c(`<h2 id="\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#\u8BF4\u660E" aria-hidden="true">#</a> \u8BF4\u660E</h2><p>\u4E00\u4E2A\u7B80\u5355\u7684\u9879\u76EE\uFF0C\u4F7FESP12F\u4E0A\u7684LED\u95EA\u70C1<br> \u6B64\u7A0B\u5E8F\u6D89\u53CA GPIO \u53CA ESP8266 \u786C\u4EF6\u5B9A\u65F6\u5668\u4E2D\u65AD\u7684\u914D\u7F6E\u4F7F\u7528<br> \u56E0\u4E3A\u7A0B\u5E8F\u5F88\u7B80\u5355\uFF0C\u6240\u4EE5\u4E0D\u505A\u8FC7\u591A\u89E3\u91CA\uFF0C\u76F4\u63A5\u770B\u6CE8\u91CA\u5C31\u884C\uFF08\u5199\u7684\u5E94\u8BE5\u591F\u660E\u767D\u4E86\uFF09<br> \u66F4\u591A\u914D\u7F6E\u9009\u9879\u8BF7\u53C2\u8003\u5BF9\u5E94<a href="#%E5%8F%82%E8%80%83%E8%B5%84%E6%96%99">API\u6587\u6863</a></p><h2 id="\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801" aria-hidden="true">#</a> \u4EE3\u7801</h2><div class="language-c ext-c line-numbers-mode"><pre class="language-c"><code><span class="token comment">/*
\u4F5C\u8005\uFF1ALycm
\u65E5\u671F\uFF1A2022/7/16
chip\uFF1AESP8266EX
ESP8266_RTOS_SDK\uFF1Av3.4
toolchain\uFF1Av8.4.0
esptool.py\uFF1Av2.4.0 
*/</span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdbool.h&gt;</span> <span class="token comment">// \u4E3A\u4E86\u652F\u6301 hw_timer \u4E2D\u4F7F\u7528\u7684 bool \u7C7B\u578B</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;driver/gpio.h&quot;</span> <span class="token comment">// GPIO \u5934\u6587\u4EF6</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&quot;driver/hw_timer.h&quot;</span> <span class="token comment">// \u786C\u4EF6\u5B9A\u65F6\u5668\u5934\u6587\u4EF6</span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">LED_PIN</span>    <span class="token expression"><span class="token number">2</span> </span><span class="token comment">// \u5B9A\u4E49 GPIO2 \u4E3A LED_PIN\u3002 ESP12\u7CFB\u5217\u4E0A\u7684LED\u5C31\u662F\u63A5\u7684GPIO2 </span></span>
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
    io_conf<span class="token punctuation">.</span>intr_type <span class="token operator">=</span> GPIO_INTR_DISABLE<span class="token punctuation">;</span> <span class="token comment">// \u8BBE\u7F6E\u4E2D\u65AD\u6A21\u5F0F</span>
    io_conf<span class="token punctuation">.</span>mode <span class="token operator">=</span> GPIO_MODE_OUTPUT<span class="token punctuation">;</span> <span class="token comment">// \u8BBE\u7F6E\u8F93\u5165/\u8F93\u51FA\u6A21\u5F0F</span>
    io_conf<span class="token punctuation">.</span>pin_bit_mask <span class="token operator">=</span> GPIO_OUTPUT_PIN_SEL<span class="token punctuation">;</span> <span class="token comment">// \u9009\u62E9GPIO\u5F15\u811A</span>
    io_conf<span class="token punctuation">.</span>pull_down_en <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// \u662F\u5426\u542F\u7528\u5185\u90E8\u4E0B\u62C9</span>
    io_conf<span class="token punctuation">.</span>pull_up_en <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token comment">// \u662F\u5426\u542F\u7528\u5185\u90E8\u4E0A\u62C9</span>

    <span class="token comment">/* \u7528\u7ED9\u5B9A\u7684\u8BBE\u7F6E\u914D\u7F6EGPIO */</span>
    <span class="token function">gpio_config</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>io_conf<span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span>

<span class="token comment">/* \u5B9A\u65F6\u5668\u4E2D\u65AD\u56DE\u8C03\u51FD\u6570 */</span>
<span class="token keyword">void</span> <span class="token function">HW_Timer_INT</span><span class="token punctuation">(</span><span class="token keyword">void</span> <span class="token operator">*</span>arg<span class="token punctuation">)</span> <span class="token comment">// \u914D\u7F6E\u5B9A\u65F6\u5668\u8981\u4F20\u4E00\u4E2A\u53C2\u6570\uFF0C\u6682\u65F6\u4E0D\u77E5\u9053\u5982\u4F55\u4E0D\u4F20\u53C2\u3002 void * \u4E3A\u901A\u7528\u6307\u9488</span>
<span class="token punctuation">{</span>
    F_LED <span class="token operator">=</span> <span class="token operator">!</span>F_LED<span class="token punctuation">;</span> <span class="token comment">// \u7FFB\u8F6C\u72B6\u6001</span>
    <span class="token function">gpio_set_level</span><span class="token punctuation">(</span>LED_PIN<span class="token punctuation">,</span> F_LED<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u8BBE\u7F6E\u5F15\u811A\u8F93\u51FA\u7535\u5E73 (\u5F15\u811A\u7F16\u53F7, \u5F15\u811A\u72B6\u6001)</span>
<span class="token punctuation">}</span>

<span class="token comment">/* \u4E3B\u51FD\u6570 */</span>
<span class="token keyword">void</span> <span class="token function">app_main</span><span class="token punctuation">(</span><span class="token keyword">void</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">/* GPIO\u521D\u59CB\u5316 */</span>
    <span class="token function">gpio_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">/* \u521D\u59CB\u5316\u786C\u4EF6\u5B9A\u65F6\u5668 */</span>
    <span class="token function">hw_timer_init</span><span class="token punctuation">(</span>HW_Timer_INT<span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// (\u56DE\u8C03\u51FD\u6570, \u4F20\u7ED9\u51FD\u6570\u7684\u53C2\u6570)</span>

    <span class="token comment">/* \u914D\u7F6E\u786C\u4EF6\u5B9A\u65F6\u5668 */</span>
    <span class="token function">hw_timer_alarm_us</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token operator">*</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// (\u5B9A\u65F6\u65F6\u95F4 \u5355\u4F4D\u5FAE\u79D2, \u5B9A\u65F6\u5668\u662F\u5426\u91CD\u65B0\u52A0\u8F7D)</span>
    <span class="token comment">// hw_timer_set_reload(1); // \u542F\u7528\u5B9A\u65F6\u5668\u91CD\u65B0\u52A0\u8F7D\uFF0Chw_timer_alarm_us \u51FD\u6570\u4E5F\u53EF\u4EE5\u914D\u7F6E</span>

    <span class="token comment">/* \u542F\u7528\u786C\u4EF6\u5B9A\u65F6\u5668 */</span>
    <span class="token function">hw_timer_enable</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u542F\u7528\u786C\u4EF6\u5B9A\u65F6\u5668</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u8D44\u6599" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u8D44\u6599" aria-hidden="true">#</a> \u53C2\u8003\u8D44\u6599</h2>`,5),d={href:"https://docs.espressif.com/projects/esp8266-rtos-sdk/en/latest/api-reference/peripherals/hw_timer.html",target:"_blank",rel:"noopener noreferrer"},u=e("API\u53C2\u8003-Hardware Timer"),m={href:"https://docs.espressif.com/projects/esp8266-rtos-sdk/en/latest/api-reference/peripherals/gpio.html",target:"_blank",rel:"noopener noreferrer"},k=e("API\u53C2\u8003-GPIO"),v={href:"https://baike.baidu.com/item/stdbool.h/8438118",target:"_blank",rel:"noopener noreferrer"},_=e("\u767E\u5EA6\u767E\u79D1-stdbool.h");function b(h,f){const s=p("ExternalLinkIcon");return o(),i("div",null,[r,n("ul",null,[n("li",null,[n("a",d,[u,a(s)])]),n("li",null,[n("a",m,[k,a(s)])]),n("li",null,[n("a",v,[_,a(s)])])])])}var E=t(l,[["render",b],["__file","ESP8266 SDK \u70B9\u706F.html.vue"]]);export{E as default};
