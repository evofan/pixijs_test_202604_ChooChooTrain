import { Graphics } from "pixi.js";

/**
 * 山々を画面に追加して動かす
 * @param { object } app
 */
export function addMountains(app) {
  const group1 = createMountainGroup(app); // 1群目の山々
  const group2 = createMountainGroup(app); // 2群目の山々

  // 2群目の山々を画面の右の外に移動
  group2.x = app.screen.width;

  // 画面に追加
  app.stage.addChild(group1, group2);

  // ティッカーで動かす
  app.ticker.add((time) => {
    // 1ティッカー毎に動かす距離を設定
    const dx = time.deltaTime * 0.5;

    // 山々の1と2を肥左に動かす
    group1.x -= dx;
    group2.x -= dx;

    // 画面の外に出たら右からまた登場する
    if (group1.x <= -app.screen.width) {
      group1.x += app.screen.width * 2;
    }
    if (group2.x <= -app.screen.width) {
      group2.x += app.screen.width * 2;
    }
  });
}

/**
 * 山々を作成する
 * @param { object } app
 * @returns // 山々のグラフィックのインスタンス
 */
function createMountainGroup(app) {
  // 山のグラフィックオブジェクト
  const graphics = new Graphics();

  // 山の幅
  const width = app.screen.width / 2;

  // 山の描画の開始点（画面下部）
  const startY = app.screen.height;

  // 個々の山のx軸上の開始点
  const startXLeft = 0;
  const startXMiddle = Number(app.screen.width) / 4;
  const startXRight = app.screen.width / 2;

  // 個々の山の高さ
  const heightLeft = app.screen.height / 2;
  const heightMiddle = (app.screen.height * 4) / 5;
  const heightRight = (app.screen.height * 2) / 3;

  // 個々の山の色
  const colorLeft = 0xc1c0c2;
  const colorMiddle = 0x7e818f;
  const colorRight = 0x8c919f;

  graphics
    // 中央の山を描く
    .moveTo(startXMiddle, startY)
    .bezierCurveTo(
      startXMiddle + width / 2,
      startY - heightMiddle,
      startXMiddle + width / 2,
      startY - heightMiddle,
      startXMiddle + width,
      startY,
    )
    .fill({ color: colorMiddle })

    // 左の山を描く
    .moveTo(startXLeft, startY)
    .bezierCurveTo(
      startXLeft + width / 2,
      startY - heightLeft,
      startXLeft + width / 2,
      startY - heightLeft,
      startXLeft + width,
      startY,
    )
    .fill({ color: colorLeft })

    // 右の山を描く
    .moveTo(startXRight, startY)
    .bezierCurveTo(
      startXRight + width / 2,
      startY - heightRight,
      startXRight + width / 2,
      startY - heightRight,
      startXRight + width,
      startY,
    )
    .fill({ color: colorRight });

  return graphics;
}
