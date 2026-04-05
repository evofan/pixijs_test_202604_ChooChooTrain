// reference URL
// https://pixijs.com/8.x/tutorials/choo-choo-train

import { Application } from "pixi.js";
import { VERSION } from "pixi.js";
import { addStars } from "./addStars";
import { addMoon } from "./addMoon";
import { addMountains } from "./addMountains";

// PixiJSのアプリを作成する
const app = new Application();

// Asynchronous IIFE
// 非同期即時実行関数式
(async () => {
  // アプリの初期化
  await app.init({ background: "#021f4b", resizeTo: window });

  // DOMのcanvasにアプリを追加す
  document.body.appendChild(app.canvas);

  // 星を追加
  addStars(app);

  // 月を追加
  addMoon(app);

  // 山を追加
  addMountains(app);

  
})();

// PixiJSのバージョンを表示
console.log(VERSION); // 8.17.1
