<div align="center">
  <img src="./assets/banner.png" alt="Who's the Dev Banner" width="100%" />

  <h1>🕵️ Who's the Dev?</h1>
  <h3>在 Meme 币的 PVP 战场里，信息不对称就是最大的 Alpha | 3秒极速透视 Dev 资金与声誉</h3>

  <p>
    <img src="https://img.shields.io/badge/Platform-Pump.fun-green?style=flat-square" />
    <img src="https://img.shields.io/badge/Chain-Solana-blueviolet?style=flat-square" />
    <img src="https://img.shields.io/badge/License-MIT-orange?style=flat-square" />
  </p>

  <p>
    <a href="https://twitter.com/ckn_acee" target="_blank">
      <img src="https://img.shields.io/twitter/follow/你的推特IDckn_acee?style=social" />
    </a>
  </p>
</div>

---

> 关注我的推特获取最新更新：[@ckn_acee]

## 💡 设计理念

作为一名冲土狗（Meme）的交易者，我们每天都要面临无数新盘子。通常我们需要：
1. 复制 CA。
2. 去 Solscan 查 Dev 余额。
3. 去推特搜 Dev 地址看有没有黑历史。

这一套流程熟练手也需要 **7-10 秒**。而在 Solana 链上，10秒足够决定你是买在底部还是挂在山顶。

**"Who's the Dev?"** 旨在将这个过程压缩到 **0 秒**。当你打开 Pump.fun 的那一刻，Dev 的家底（余额）和声誉（推特记录）就已经直接贴在你的脸上了。

## ✨ 核心功能

* **⚡️ 极速透视 (Vibe Check)**：无需点击，插件自动扫描页面顶部的 Dev 地址。
* **💰 巨鲸雷达**：直接显示 Dev 钱包的 SOL 余额（基于 Helius RPC）。
    * 🔴 红色：余额 < 1 SOL (穷鬼/刷子风险)
    * 🟡 黄色：余额 > 1 SOL (正常)
    * 🟢 绿色：余额 > 50 SOL (巨鲸/强庄)
* **🐦 推特侦探**：自动在 Google 索引中检索该地址是否在 Twitter/X 上留下过痕迹。
    * ✅ **有记录**：可能是老手、KOL 或公开过身份的项目方。
    * ⬜ **无记录**：纯新钱包，需警惕。
* **🛡️ 防误触缓存**：内置智能缓存机制，刷新页面不消耗 API 额度，省钱且稳定。

## 🗺️ 版本规划 (Roadmap)

- [x] **v1.0 (Current)**: 完美支持 Pump.fun 头部 Dev 检测；集成 Helius RPC 与 Google Search API。
- [ ] **v1.1**: 重新上线 GMGN.ai 列表页支持（目前因请求量过大暂时禁用）。
- [ ] **v2.0**: 引入 AI 分析，自动判断 Dev 的过往发币胜率。
- [ ] **v3.0**: 集成社区黑名单数据库，自动标记已知 Scammer。

---

## 🛠️ 如何在本地安装运行

本项目完全开源，你可以免费在本地运行。

### 第一步：下载代码
1.  `git clone` 本仓库或直接下载 ZIP 压缩包解压。

### 第二步：配置 API Key (核心步骤)
为了获取链上数据和搜索数据，你需要配置自己的 API Key（都有免费额度）。

1.  打开项目文件夹中的 `background.js` 文件。
2.  找到顶部的配置区域：

```javascript
// background.js
const HELIUS_API_KEY = "你的_HELIUS_KEY"; 
const GOOGLE_CX = "你的_GOOGLE_SEARCH_ID"; 
const GOOGLE_API_KEY = "你的_GOOGLE_API_KEY"; 
如何获取免费 Key？
Helius Key (查余额用):

去 Helius.dev 注册账号（无需信用卡），复制 API Key。

费用：免费版足够个人使用。

Google Search API (查推特用):

去 Programmable Search Engine 创建一个搜索引擎，搜索站点填 twitter.com 和 x.com。获取 CX ID。

去 Google Cloud Console 获取 API Key。

费用：每天免费 100 次查询。如果你是高频交易员，建议绑定卡付费（$5/1000次）。

第三步：加载插件
在 Chrome 浏览器地址栏输入 chrome://extensions/。

打开右上角的 "开发者模式" (Developer mode)。

点击左上角的 "加载已解压的扩展程序" (Load unpacked)。

选择本项目文件夹。

打开 Pump.fun 即可看到效果！
