import { Graphics } from "pixi.js";

/**
 * 地面を追加する
 * @param { object } app
 */
export function addGround(app) {
  // 積雪層
  const width = app.screen.width; // 地面の横幅
  const groundHeight = 20; // 地面の高さ
  const groundY = app.screen.height; // 地面のy座標
  // 地面のグラフィックを作成
  const ground = new Graphics()
    .rect(0, groundY - groundHeight, width, groundHeight)
    .fill({ color: 0xdddddd });
  app.stage.addChild(ground); // ステージに追加（コンテナに追加との違い？）

  // トラックの板
  const trackHeight = 15; // トラックの高さ
  const plankWidth = 50; // 板の横幅
  const plankHeight = trackHeight / 2; // 板の高さ
  const plankGap = 20; // 板のギャップ
  const plankCount = width / (plankWidth + plankGap) + 1; // 板の数
  const plankY = groundY - groundHeight; // 板のy座標
  const planks = []; // 板の格納用配列
  // 板のグラフィックを描画
  for (let index = 0; index < plankCount; index++) {
    const plank = new Graphics()
      .rect(0, plankY - plankHeight, plankWidth, plankHeight)
      .fill({ color: 0x241811 });
    plank.x = index * (plankWidth + plankGap); // x座標を設定
    app.stage.addChild(plank); // ステージに追加
    planks.push(plank); // 配列に格納（後でアニメーションさせる）
  }
  app.ticker.add((time) => {
    const dx = time.deltaTime * 6; // 板のアニメーションは木より速くする
    // 全ての板に対して
    planks.forEach((plank) => {
      plank.x -= dx; // x座標を左に移動
      if (plank.x <= -(plankWidth + plankGap)) {
        plank.x += plankCount * (plankWidth + plankGap) + plankGap * 1.5; // 画面外に出たら右から出て来る
      }
    });
  });

  // 線路のレール
  const railHeight = trackHeight / 2; // レールの高さ
  const railY = plankY - plankHeight; // レールのy座標
  // レールを描画
  const rail = new Graphics()
    .rect(0, railY - railHeight, width, railHeight)
    .fill({ color: 0x5c5c5c });
  app.stage.addChild(rail); // ステージに追加
}
