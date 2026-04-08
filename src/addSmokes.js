import { Graphics } from "pixi.js";

export function addSmokes(app, train) {
  const groupCount = 5; // グループの数
  const particleCount = 7; // パーティクルの数
  const groups = []; // グループを格納する配列
  const baseX = train.x + 170; // ベースx
  const baseY = train.y - 120; // ベースy

  // グループの数だけ煙を作成
  for (let index = 0; index < groupCount; index++) {
    const smokeGroup = new Graphics();

    for (let i = 0; i < particleCount; i++) {
      const radius = 20 + Math.random() * 20;
      const x = (Math.random() * 2 - 1) * 40;
      const y = (Math.random() * 2 - 1) * 40;

      // ランダムなx, y, 半径でで煙を作成
      smokeGroup.circle(x, y, radius);
    }

    smokeGroup.fill({ color: 0xc9c9c9, alpha: 0.5 });

    smokeGroup.x = baseX;
    smokeGroup.y = baseY;
    smokeGroup.tick = index * (1 / groupCount);

    // 配列内に追加
    groups.push(smokeGroup);

    // ステージに追加
    app.stage.addChild(smokeGroup);
  }

  app.ticker.add((time) => {
    const dt = time.deltaTime * 0.01;

    groups.forEach((group) => {
      group.tick = (group.tick + dt) % 1;
      group.x = baseX - Math.pow(group.tick, 2) * 400;
      group.y = baseY - group.tick * 200;
      group.scale.set(Math.pow(group.tick, 0.75));
    });
  });
}
