<script setup lang='ts'>
import { onMounted, defineProps } from 'vue'
const { props } = defineProps({
  main: String
});

onMounted(() => {
  const elimg: any = document.querySelector('.main')
  if (elimg) {
    elimg.querySelectorAll('img').forEach((element: any) => {
      element.setAttribute('data-fancybox', 'gallery')
    })
  }
})
</script>

<template>
  <div class="main entry-content center">
    <!-- <highlightjs class="highlight-wrap" language='javascript' code="var x = 5;" /> -->
    <p>之前在海鲜市场淘的<a class="wp-editor-md-post-content-link"
        href="https://fairysen.com/585.html">蜗牛星际矿渣</a>稳定服役了半年多时间，但是总感觉性能差点意思，2021年5月25日在同事的种草下预购了名为 <a
        class="wp-editor-md-post-content-link" href="https://ai.mr/x/nbox.html" target="_blank" rel="nofollow">NBOX</a>
      的16盘位 NAS 机箱，实际到货的时间已经是8月份的事了。到手装完机大概花了一个月时间，配件一直在路上所以大部分时间都在等快递，本来是打算整套服务器硬件但是主板有亿丢丢贵。机器详细配置如下，包含硬盘价格大约为 7K
      RMB，手里的闲置硬件能用的就一起顺便装上去了，对了矿渣小主机已出手。</p>
    <img src="http://localhost:1027/public/img/background.jpg" class="fancybox">
    <h3 id="toc-head-1">配置信息</h3>
    <table class="table">
      <thead>
        <tr>
          <th>硬件</th>
          <th>型号</th>
          <th>备注</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>CPU</td>
          <td>AMD Ryzen 5 3600</td>
          <td>板U套装群友升级闲置转手</td>
        </tr>
        <tr>
          <td>主板</td>
          <td>微星 B450M MORTAR MAX</td>
          <td>板U套装群友升级闲置转手</td>
        </tr>
        <tr>
          <td>散热器</td>
          <td>利民 AXP90-X47</td>
          <td></td>
        </tr>
        <tr>
          <td>内存</td>
          <td>十铨 DDR4 32G 3200 * 4</td>
          <td>海鲜市场拆机内存</td>
        </tr>
        <tr>
          <td>显卡</td>
          <td>盈通 R5450-HM512GD2 战神版</td>
          <td>亮机卡，AMD不带核显</td>
        </tr>
        <tr>
          <td>固态盘</td>
          <td>西部数据 SN550 1T，铭瑄 512G SATA3 终结者</td>
          <td>旧版本缓外不掉速</td>
        </tr>
        <tr>
          <td>缓存盘</td>
          <td>英特尔 傲腾 16G</td>
          <td></td>
        </tr>
        <tr>
          <td>机械盘</td>
          <td>西部数据 紫盘 4T * 3</td>
          <td>RAID 5，问就是够用</td>
        </tr>
        <tr>
          <td>电源</td>
          <td>益衡 7154B FLEX</td>
          <td>全新改模组</td>
        </tr>
        <tr>
          <td>机箱</td>
          <td>NBOX</td>
          <td>预购价 ¥699</td>
        </tr>
        <tr>
          <td>阵列卡</td>
          <td>—</td>
          <td>预计下次升级购买，目前是SATA扩展卡</td>
        </tr>
        <tr>
          <td>网卡</td>
          <td>英特尔 I350-T2</td>
          <td>原为乐扩双口千兆螃蟹网卡</td>
        </tr>
        <tr>
          <td>风扇</td>
          <td>ARCTIC F8 * 2，猫头鹰 NF-A4 * 1</td>
          <td>机箱附送的风扇又脏又吵</td>
        </tr>
        <tr>
          <td>配件</td>
          <td>8087反向线，844拆分卡，防尘罩</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <h3 id="toc-head-2">硬件概述</h3>
    <h4 id="toc-head-3">总览</h4>
    <!--  <el-image class="elimg" :src="url" hide-on-click-modal :preview-src-list="srcList" :initial-index="4" fit="cover"
      preview-teleported loading="lazy" /> -->
    <img src="http://localhost:1027/public/img/101787530_p0.png" class="fancybox">
    <img src="http://localhost:1027/public/img/b2.jpg" class="fancybox">
    <h4 id="toc-head-4">机箱</h4>
    <p>有点翻车，存放环境有些潮湿没放在干燥房，内部有些锈迹。</p>
    <img src="http://localhost:1027/public/img/101523648_p0.png" class="fancybox">
    <ol>
      <li>
        <p>正面</p>
        <p>机箱主箱最大可支持 16 个硬盘位，前置 8 个热插拔硬盘位（支持 3.5、2.5 寸硬盘），内置最大支持 8 个 2.5 寸硬盘位。</p>
      </li>
      <li>
        <p>背面</p>
        <p>由于机箱不支持正常的 PCIE 挡板，我充分发挥动手能力，使用 PVC 塑料板尽量把缺口都封堵住，不然漏风影响散热，卖家后来也提供了定制亚克力板的方案。</p>
      </li>
      <li>
        <p>防尘罩</p>
        <p>防尘罩材质为亚克力，标题是我自行打印粘贴的，内部还有层防尘棉，散热测试下来影响不算大。</p>
      </li>
      <li>
        <p>硬盘背板</p>
        <p>背板 8 个兼容任意 SATA&amp;SAS 硬盘的接口，默认背板输出使用 8087 接口 6G 版本，3 * 4D 供电设计及滤波优化；且有 8643 接口的 12G
          版本背板，可直接更换。不过卖家为了成本没洗板，所以会有很多焊点和焊油，后期我用洗板水才刷干净。</p>
      </li>
      <li>
        <p>内部结构风道</p>
      </li>
    </ol>
    <h4 id="toc-head-5">配件</h4>
    <ol>
      <li>
        <p>844拆分卡</p>
        <p>这卡我挺喜欢的，将 PCIE X16 槽拆分成一个 X8 一个 X4 和一个 M.2 接口，就是调试时发现主板开启 PCIE X8X4X4 拆分模式总有设备识别不出来，后来改成 X4X4X4X4 才行，很费解。
        </p>
      </li>
      <li>
        <p>散热</p>
        <p>内部可以安装个4厘米的 PCIE 散热风扇，聊胜于无。</p>
      </li>
    </ol>
    <h4 id="toc-head-6">装机</h4>
    <p>整机采用的是主板倒扣的方式，支持 MATX 及以下所有主板，显卡是张亮机卡，拥有 512M 大显存。</p>
    <h3 id="toc-head-7">整机功耗</h3>
    <p>都这配置了就不谈省电了，整机一个月差不多90度电左右，反正丢机柜里也不怎么管它。</p>
    <h3 id="toc-head-8">服务列表</h3>
    <p>服务器底层系统我安装的是 <a class="wp-editor-md-post-content-link" href="https://www.proxmox.com/en/" target="_blank"
        rel="nofollow">Proxmox-VE</a> 用来做虚拟化，个人觉得 PVE 易于操作且底层是个完整的 Debian 系统，当然 ESXI 也不错。</p>
    <p>目前共运行着12个虚拟机，Windows 虚拟机被我映射到了公网，用于在外远程连接到家里查看服务器；Ubuntu 主要用于一些固件容器的编译工作；K8S 则是我用来练习 Kubernetes
      而搭建的一个测试集群，准备把一些闲置的
      VPS 都纳入集群中；PCDN 是网心云。</p>
    <p>我使用<a class="wp-editor-md-post-content-link" href="https://github.com/naiba/nezha" target="_blank"
        rel="nofollow">哪吒探针</a>监控虚拟机的运行状态：<a href="https://ops.fogmoe.com" target="_blank"
        rel="nofollow">https://ops.fogmoe.com</a>，使用 Zabbix + Grafana 监控物理机和主力 VPS 的状态：<a
        href="https://status.amogu.cn/dashboards" target="_blank" rel="nofollow">https://status.amogu.cn/dashboards</a>。
    </p>
    <p>下面来说说我在新的 All In One 服务器中安装了哪些服务，你可在我的云面板看到详细信息：<a class="wp-editor-md-post-content-link"
        href="https://dash.fairysen.com/" target="_blank" rel="nofollow">Kinoko's HomeLab</a>。</p>
    <h4 id="toc-head-9">1. 软路由</h4>
    <p>我使用 <a class="wp-editor-md-post-content-link" href="https://www.ikuai8.com/" target="_blank"
        rel="nofollow">iKuai</a> 作为主路由，OpenWrt 作为旁路由，主路由负责实现单线多拨、分流负载、DHCP、DDNS、端口映射、ACL限制，旁路由则主要用来屏蔽广告、全局科学上网。</p>
    <p>我是电信100M宽带且申请了公网 IP，由于运行商并没有限制多拨，所以我用主路由做了单线5拨，这样就有5条100M的公网线路，前2条在 DNSPod 配置了 DNS 负载均衡用来映射内网服务，后3条用来挂<a
        class="wp-editor-md-post-content-link" href="https://www.onethingcloud.com/" target="_blank"
        rel="nofollow">网心云</a>赚电费，配合<a class="wp-editor-md-post-content-link" href="http://ts.js.vnet.cn"
        target="_blank" rel="nofollow">江苏电信的提速地址</a>（不断请求提速接口可以一直提速）可以把每条线路下行提升到200M，上行经测试无法提速。</p>
    <p>旁路由是我自行编译的精简 OpenWrt 固件，只保留了需要的功能，适合用于科学上网，感兴趣自行下载（X86）：<a class="wp-editor-md-post-content-link"
        href="https://github.com/Fog-Forest/Actions-OpenWrt/releases" target="_blank" rel="nofollow">下载地址</a></p>
    <pre class="highlight-wrap" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
      contenteditable="false"
      design="by Mashiro"><code class="language-python hljs" data-rel="PYTHON" id="hljs-0"><table class="hljs-ln"><tbody><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment">#!/usr/bin/python3</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment"># -*- coding: utf-8 -*-</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment"># @Author: Kinoko admin@amogu.cn</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment"># @Date  : 2021/11/22</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="5"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment"># @Desc  : 江苏电信宽带自动提速（仅限江苏电信）3分钟执行一次即可</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="6"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment"># @API   ：http://ts.js.vnet.cn</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="7"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> </div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="8"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">import</span> time</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="9"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> </div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="10"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">import</span> requests</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="11"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> </div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="12"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">headers = {</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="13"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-string">'User-Agent'</span>: <span class="hljs-string">'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36'</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="14"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-string">'Accept'</span>: <span class="hljs-string">'application/json'</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="15"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">}</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="16"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> </div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="17"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">data = {</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="18"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-string">'action'</span>: <span class="hljs-string">'ExperiencesSpeedBegin'</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="19"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-string">'isPostBk'</span>: <span class="hljs-string">'1'</span>,</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="20"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-string">'UserAccount'</span>: <span class="hljs-string">'宽带账号'</span>,  <span class="hljs-comment"># 你的宽带账号</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="21"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-string">'AreaCode'</span>: <span class="hljs-string">'地区号'</span>  <span class="hljs-comment"># 地区号</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="22"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">}</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="23"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> </div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="24"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> </div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="25"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-comment"># 请求提速API</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="26"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">main</span><span class="hljs-params">()</span>:</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="27"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-keyword">try</span>:</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="28"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">        response = requests.post(<span class="hljs-string">'http://ts.js.vnet.cn/speed/beginExperiences'</span>, headers=headers, data=data)</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="29"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">        print(response.text)</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="30"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    <span class="hljs-keyword">except</span> Exception <span class="hljs-keyword">as</span> e:</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="31"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">        print(e)</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="32"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> </div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="33"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> </div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="34"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">"__main__"</span>:</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="35"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">    main()</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="36"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> </div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="37"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"> </div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="38"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-string"><span class="hljs-string">"""Shell版本</span></span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="39"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-string">curl --location --request GET 'http://ts.js.vnet.cn/speed/beginExperiences' \</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="40"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-string">--header 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36' \</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="41"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-string">--header 'Accept: application/json' \</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="42"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-string">--form 'action="ExperiencesSpeedBegin"' \</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="43"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-string">--form 'isPostBk="1"' \</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="44"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-string">--form 'UserAccount="宽带账号"' \</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="45"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-string">--form 'AreaCode="地区号"'</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="46"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-string">"""</span></div></td></tr></tbody></table></code><a class="copy-code" href="javascript:" data-clipboard-target="#hljs-0" title="拷贝代码"><i class="fa fa-clipboard" aria-hidden="true"></i></a></pre>
    <h4 id="toc-head-10">2. 黑群晖</h4>
    <p>这个没啥好说的，搞 All In One 基本一开始都是先奔着 NAS 去的，之前用过 TrueNAS 感觉易用性不如群晖，很多组件需要自己去安装。由于 NAS
      是我和室友共同使用的，所以安装了更为简单的黑群晖。黑群晖使用的是
      RedPill 的 DSM 7.0.1 引导，安装的是 DS3615xs 系统，某宝买的洗白码，已完全洗白，引导编译教程见：<a class="wp-editor-md-post-content-link"
        href="https://wp.gxnas.com/11358.html" target="_blank"
        rel="nofollow">【授人鱼不如授人以渔】私人定制专属的RedPill-DSM7.X引导文件并添加扩展驱动（编译DSM7.X引导教程）</a>。</p>
    <h4 id="toc-head-11">3. Jellyfin</h4>
    <p>家庭媒体中心，使用容器方式部署在群晖，我使用的是 DS3615xs 系统而且 CPU 也没有核显，显卡是个亮机卡所以并不支持硬解，不过也够用，我下的视频基本都是 H264 编码，只是想有个海报墙而已。</p>
    <h4 id="toc-head-12">4. qBittorrent</h4>
    <p>玩 PT 的基本都用过，用来下载视频的，同样部署在群晖上。</p>
    <h4 id="toc-head-13">5. Minecraft（已停服）</h4>
    <p>地图：<a href="https://local.amogu.cn:3000/" target="_blank" rel="nofollow">https://local.amogu.cn:3000/</a></p>
    <p>服务器地址：local.amogu.cn</p>
    <p>由<a class="wp-editor-md-post-content-link" href="https://imashen.cn/" target="_blank"
        rel="nofollow">猫老板</a>维护，我只是个提供机器的，有兴趣的可以进来看看。</p>
    <h4 id="toc-head-14">6. 私有签到框架</h4>
    <p>项目地址：<a href="https://github.com/qiandao-today/qiandao" target="_blank"
        rel="nofollow">https://github.com/qiandao-today/qiandao</a></p>
    <p>解放双手，用于一些网站的自动签到，可以自行抓包添加模板。</p>
    <h4 id="toc-head-15">7. 京东挂机签到</h4>
    <p>可以自动做京东的一些任务，自动互助等，感兴趣的欢迎上我的车： <a href="https://jdcookie.ml" target="_blank"
        rel="nofollow">https://jdcookie.ml</a>，部署方法自行谷歌就有了。</p>
    <h3 id="toc-head-16">总结</h3>
    <p>本来这篇文章应该在11月中旬完成的，期间为了测试配件反复拆装机器搞得心态爆炸，内网服务环境安装测试也花了几周时间，目前我的 ALL IN ONE 服务器主要在跑就是这些，所有需要映射到公网的服务地址都通过 Nginx
      进行反向代理统一配置 SSL 证书，更多有趣的玩法我还在持续探索中。</p>
    <p></p>
    <div class="has-toc have-toc"></div>
    <p></p>


  </div>
</template>

<style>
@import '../assets/css/essay.css';
</style>
<style scoped>
p {
  margin: 10px 0;
  text-indent: 2em
}

.entry-content {
  margin-top: 60px !important;
  background-color: #fff;
  box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, .2);
  padding: 20px;
  padding-top: 10px;
  font-size: 18px;
  border-radius: 10px;
  line-height: 40px;
}

.entry-content :deep(img) {
  box-shadow: 0px 0px 4px 1px #888;
  border: 1px solid #000;
  padding: 2px;
  border-radius: 8px;
  cursor: var(--linkCup);
}

ol {
  list-style: decimal !important;
  border: 1px dashed #949494;
  padding: 15px 10px 15px 50px;
  color: #616161;
  margin-left: 0;
  border-radius: 10px;
}

li {
  list-style: decimal !important;
}

ol p {
  text-indent: 0em;
  margin: 0
}

ol :deep(li) p:nth-child(1) {
  font-size: 19px;
  font-weight: 600;
  color: #555
}

.dark ol {
  color: #fff;
}

.dark ol :deep(li) p:nth-child(1) {
  color: #fff;
}

/* 解决问题，让a标签跳转至id时，可以迁出顶部状态栏的位置 */
h1[id*=toc-head]:before,
h2[id*=toc-head]:before,
h3[id*=toc-head]:before,
h4[id*=toc-head]:before,
h5[id*=toc-head]:before,
h6[id*=toc-head]:before {
  display: block;
  content: " ";
  height: 60px;
  margin-top: -60px;
  visibility: hidden;
}
</style>
