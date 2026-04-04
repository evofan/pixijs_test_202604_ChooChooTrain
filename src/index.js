// reference URL
// https://pixijs.com/8.x/tutorials/choo-choo-train

import { Application } from "pixi.js";
import { VERSION } from "pixi.js";

// PixiJSのアプリを作成する
const app = new Application();

// Asynchronous IIFE
(async () => {
  // アプリの初期化
  await app.init({ background: "#021f4b", resizeTo: window });

  // DOMのcanvasにアプリを追加す
  document.body.appendChild(app.canvas);
})();

// PixiJSのバージョンを表示
console.log(VERSION); // 8.17.1
