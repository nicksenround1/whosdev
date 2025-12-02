<div align="center">
  <img src="./assets/banner.png" alt="Who's the Dev Banner" width="100%" />

  <h1>🕵️ Who's the Dev?</h1>
  <h3>Solana Meme 交易辅助神器 | 3秒极速透视 Dev 资金与声誉</h3>

  <p>
    <img src="https://img.shields.io/badge/Platform-Pump.fun-green?style=flat-square" />
    <img src="https://img.shields.io/badge/Chain-Solana-blueviolet?style=flat-square" />
    <img src="https://img.shields.io/badge/License-MIT-orange?style=flat-square" />
  </p>
  
  <p>
    <a href="https://twitter.com/ckn_acee" target="_blank">
      <img src="https://img.shields.io/twitter/follow/ckn_acee?style=social" />
    </a>
  </p>
</div>

---

## 💡 设计理念
**"Who's the Dev?"** 旨在将查 CA、查余额、搜推特的 10 秒流程压缩到 **0 秒**。

## ✨ 核心功能
* **⚡️ 极速透视**: 自动扫描 Dev 地址。
* **💰 巨鲸雷达**: 实时显示 SOL 余额。
* **🐦 推特侦探**: 自动检索 Twitter/X 痕迹。

## 🛠️ 安装与配置 (重要!)
**注意：你需要配置自己的 API Key 才能使用。**

前端爬虫（Yahoo/Google）是在用你的浏览器去搜，搜太快会被当成机器人（429 Too Many Requests）；公共 RPC 节点（Ankr/Mainnet）是给所有人用的，你一秒钟发 20 个请求，它直接把你的 IP 暂时拉黑。

要实现“3秒内出结果”且“稳定不挂”，我们需要引入 API Key。

以下是两种方案的对比与实作：
| 维度 | 方案 A：极客免费版 (推荐入门) | 方案 B：付费土豪版 (稳定商用) |
| :--- | :--- | :--- |
| **SOL 余额查询** | **使用 Helius/QuickNode 免费套餐**<br><br>✅ 极稳。免费额度通常够个人用很久。 | **付费 RPC 节点 ($19/月+)**<br><br>✅ 速度极快，甚至可以监听 Mempool。 |
| **推特/X 记录** | **Google Custom Search (免费层)**<br><br>⚠️ 每天限额 100 次查询。超过后不可用。<br>或者继续用 **Yahoo 爬虫 + 队列延迟** (慢，但免费)。 | **Google Search API ($5 / 1000次)**<br><br>✅ 钞能力解决一切，速度快，无视验证码。<br>或者 **SerpApi**。 |
| **稳定性** | ⭐⭐⭐ (偶尔会被限流) | ⭐⭐⭐⭐⭐ (丝般顺滑) |
| **适合场景** | 刚开始做 Sniper，资金量不大。 | 职业交易员，追求极致速度。 |

我们采用 “Helius 免费 API” 彻底解决 RPC拥堵 问题（这个最关键，因为余额是判断巨鲸的核心）。推特部分，我教你接入 Google 搜索 API（有免费额度，不够可以用付费扩容）。

第一步：获取必要的 API Key (5分钟)
解决 RPC 问题 (Helius):

去 helius.dev 注册一个账号（不需要信用卡）。

在 Dashboard 复制你的 API Key (一串 UUID)。

Helius 的免费层非常大方，个人使用完全足够。

解决推特搜索问题 (Google Custom Search):

去 Google Programmable Search Engine。

点击 "Add"，命名为 TwitterFinder。

Search specific sites 填入: twitter.com 和 x.com。

创建后，记下 Search engine ID (CX)。

然后去 Google Custom Search API 获取 API Key。

注意：每天免费 100 次。如果你是高频交易，建议绑定结算卡，每 1000 次查询 $5 (约 35 RMB)，这比你在土狗上亏的钱少多了。

1. 下载本代码库。
2. 打开 `background.js` 文件。
3. 找到顶部的配置区，填入你的 Key：
   ```javascript
   const HELIUS_API_KEY = "你的_HELIUS_KEY"; 
   const GOOGLE_CX = "你的_GOOGLE_CX"; 
   const GOOGLE_API_KEY = "你的_GOOGLE_API_KEY"; 
   ```
4. 在 Chrome 中加载扩展。
