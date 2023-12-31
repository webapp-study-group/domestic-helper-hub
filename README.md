# domestic-helper-hub

這個 workshop 的主題是「網頁資料爬取、數據庫使用和網頁應用程式開發」。它是一個逐步演示的示範，透過螢幕錄製展示了如何進行這些開發的步驟和方法。

這個示範是從多個網站上抓取家庭傭工的求職 profile，將這些資料統一轉換成一個共同的格式，然後存儲到數據庫中，供後續開發的網頁應用程式 (webapp) 進行搜索。這些家庭傭工的資料是在網上公開可見的。

The topic of this workshop is "Web Data Scraping, Database Usage, and Web Application Development." It is a step-by-step demonstration that showcases the process and methods involved in these development tasks through screen recording.

The demonstration focuses on scraping job profiles of domestic helpers from multiple websites. The data collected is then transformed into a unified format and stored in a database for future usage in a web application (webapp). The information regarding these domestic helpers is publicly available online.

Playlist:
https://www.youtube.com/playlist?list=PLH2rXoLSgZYd25js4V3rxV-3qEC658Bgu

---

Part 1 - demo web scraping with [playwright](https://github.com/microsoft/playwright) and database usage with [quick-erd](https://github.com/beenotung/quick-erd) and [better-sqlite3-proxy](https://github.com/beenotung/better-sqlite3-proxy):
https://www.youtube.com/watch?v=9u_6PV_klY4

---

Part 2 - sum up the web scraping flow and develop a simple search engine for the domestic helpers:
https://www.youtube.com/watch?v=s3H4ziyCHlA

---

Part 3 - build UI with [ts-liveview](https://github.com/beenotung/ts-liveview/blob/v5-minimal-template/README.md) and collect profile picture (and language [WIP])

今次我們用 ts-liveview 的 JSX 語法防止了 Cross-site scripting (XSS) Attack

並示範了如何用 knex migration 把兩個 project 的 database 合併。

亦介紹了 node.js 的兩個模式：commonjs 和 ES Module。

最後我們 setup 了 nested npm package，讓我們可以同時用得到 esm-only 和 commonjs-only 的 packages。

See [help.txt](help.txt) to get started.
