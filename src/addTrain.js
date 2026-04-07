import { Container, Graphics } from "pixi.js";

/**
 * 列車を追加する
 * @param { object } app
 * @param { object } container
 */
export function addTrain(app, container) {
  const head = createTrainHead(app);
  // Add the head to the train container.
  container.addChild(head);

  // Add the train container to the stage.
  app.stage.addChild(container);

  const scale = 0.75;

  // Adjust the scaling of the train.
  container.scale.set(scale);

  // Position the train, taking into account the variety of screen width.
  // To keep the train as the main focus, the train is offset slightly to the left of the screen center.
  container.x = app.screen.width / 2 - head.width / 2;
  container.y = app.screen.height - 35 - 55 * scale;
}

/**
 * 列車の先頭部分を作成する
 * @param { object } app
 */
function createTrainHead(app) {
  const container = new Container(); // 新規コンテナ作成

  const frontHeight = 100; // フロントの高さ
  const frontWidth = 140; // フロントの横幅
  const frontRadius = frontHeight / 2; // フロントの半径

  const cabinHeight = 200; // キャビンの高さ
  const cabinWidth = 150; // キャビンの横幅
  const cabinRadius = 15; // キャビンの半径

  const chimneyBaseWidth = 30; // 煙突の基底の横幅
  const chimneyTopWidth = 50; // 煙突の上部の横幅
  const chimneyHeight = 70; // 煙突の高さ
  const chimneyDomeHeight = 25; // 煙突のドームの高さ
  const chimneyTopOffset = (chimneyTopWidth - chimneyBaseWidth) / 2; // 煙突上部のオフセット
  const chimneyStartX = // 煙突のスタート位置x座標
    cabinWidth + frontWidth - frontRadius - chimneyBaseWidth;
  const chimneyStartY = -frontHeight; // 煙突のスタート位置y座標

  const roofHeight = 25; // 屋根の高さ
  const roofExcess = 20; // 屋根の余分

  const doorWidth = cabinWidth * 0.7; // ドアの横幅
  const doorHeight = cabinHeight * 0.7; // ドアの高さ
  const doorStartX = (cabinWidth - doorWidth) * 0.5; // ドアのスタート位置x
  const doorStartY = -(cabinHeight - doorHeight) * 0.5 - doorHeight; // ドアのスタート位置y

  const windowWidth = doorWidth * 0.8; // 窓の横幅
  const windowHeight = doorHeight * 0.4; // 窓の高さ
  const offset = (doorWidth - windowWidth) / 2; // オフセット

  // グラフィックを描画
  const graphics = new Graphics()
    // 煙突を描く
    .moveTo(chimneyStartX, chimneyStartY)
    .lineTo(
      chimneyStartX - chimneyTopOffset,
      chimneyStartY - chimneyHeight + chimneyDomeHeight,
    )
    .quadraticCurveTo(
      chimneyStartX + chimneyBaseWidth / 2,
      chimneyStartY - chimneyHeight - chimneyDomeHeight,
      chimneyStartX + chimneyBaseWidth + chimneyTopOffset,
      chimneyStartY - chimneyHeight + chimneyDomeHeight,
    )
    .lineTo(chimneyStartX + chimneyBaseWidth, chimneyStartY)
    .fill({ color: 0x121212 })

    // フロントを描く
    .roundRect(
      cabinWidth - frontRadius - cabinRadius,
      -frontHeight,
      frontWidth + frontRadius + cabinRadius,
      frontHeight,
      frontRadius,
    )
    .fill({ color: 0x7f3333 })

    // キャビンを描く
    .roundRect(0, -cabinHeight, cabinWidth, cabinHeight, cabinRadius)
    .fill({ color: 0x725f19 })

    // 屋根を描く
    .rect(
      -roofExcess / 2,
      cabinRadius - cabinHeight - roofHeight,
      cabinWidth + roofExcess,
      roofHeight,
    )
    .fill({ color: 0x52431c })

    // ドアを描く
    .roundRect(doorStartX, doorStartY, doorWidth, doorHeight, cabinRadius)
    .stroke({ color: 0x52431c, width: 3 })

    // 窓を描く
    .roundRect(
      doorStartX + offset,
      doorStartY + offset,
      windowWidth,
      windowHeight,
      10,
    )
    .fill({ color: 0x848484 });

  // 3つの車輪を作成する
  const bigWheelRadius = 55; // 大きい車輪の半径
  const smallWheelRadius = 35; // 小さい車輪の半径
  const wheelGap = 5; // 車輪のギャップ
  const wheelOffsetY = 5; // 車輪のオフセット

  const backWheel = createTrainWheel(bigWheelRadius); // 後ろの車輪を作成する
  const midWheel = createTrainWheel(smallWheelRadius); // 中間の車輪を作成する
  const frontWheel = createTrainWheel(smallWheelRadius); // 前の車輪を作成する

  backWheel.x = bigWheelRadius; // 大きい車輪のx座標
  backWheel.y = wheelOffsetY; // 大きい車輪のy座標
  midWheel.x = backWheel.x + bigWheelRadius + smallWheelRadius + wheelGap; // 中間の車輪のx
  midWheel.y = backWheel.y + bigWheelRadius - smallWheelRadius; // 中間の車輪のy
  frontWheel.x = midWheel.x + smallWheelRadius * 2 + wheelGap; // 前の車輪のx
  frontWheel.y = midWheel.y; // 前の車輪のy

  container.addChild(graphics, backWheel, midWheel, frontWheel); // コンテナにグラフィックス、大きい車輪、中間の車輪、フロントの車輪を追加する

  // 3つの車輪をアニメーションさせる
  app.ticker.add((time) => {
    const dr = time.deltaTime * 0.15; // 速度

    backWheel.rotation += dr * (smallWheelRadius / bigWheelRadius); // 大きい車輪を回転
    midWheel.rotation += dr; // 中間の車輪を回転
    frontWheel.rotation += dr; // 小さい車輪を回転
  });

  return container;
}

/**
 * 列車の車輪を作成する
 * @param { number } radius
 */
function createTrainWheel(radius) {
  const strokeThickness = radius / 3; // 線の太さは半径の1/3
  const innerRadius = radius - strokeThickness; // 内側の半径

  return (
    // 新規グラフィックスを作成
    new Graphics()
      .circle(0, 0, radius) // 円
      .fill({ color: 0x848484 })
      // 車輪を描画
      // タイヤを描画
      .stroke({ color: 0x121212, width: strokeThickness, alignment: 1 })
      // スポークを描画
      .rect(
        -strokeThickness / 2,
        -innerRadius,
        strokeThickness,
        innerRadius * 2,
      )
      .rect(
        -innerRadius,
        -strokeThickness / 2,
        innerRadius * 2,
        strokeThickness,
      )
      .fill({ color: 0x4f4f4f })
  );
}
