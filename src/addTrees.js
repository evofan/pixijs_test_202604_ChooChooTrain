import { Graphics } from "pixi.js";

/**
 * 木を設置する
 * @param { object } app
 */
export function addTrees(app) {
  const treeWidth = 200;
  const y = app.screen.height - 20;
  const spacing = 15;
  const count = app.screen.width / (treeWidth + spacing) + 1;
  const trees = [];

  for (let index = 0; index < count; index++) {
    const treeHeight = 225 + Math.random() * 50;
    const tree = createTree(treeWidth, treeHeight);

    tree.x = index * (treeWidth + spacing);
    tree.y = y;

    app.stage.addChild(tree);
    trees.push(tree);
  }

  // 木をアニメーションさせる（山より速くする事で視差効果で近くに見える）
  app.ticker.add((time) => {
    const dx = time.deltaTime * 3;

    trees.forEach((tree) => {
      tree.x -= dx;

      if (tree.x <= -(treeWidth / 2 + spacing)) {
        tree.x += count * (treeWidth + spacing) + spacing * 3;
      }
    });
  });
}

/**
 * 木を作成する
 * @param { number } width
 * @param { number } height
 */
function createTree(width, height) {
  // trunk＝（ここでは）幹
  const trunkWidth = 30; // 木の数
  const trunkHeight = height / 4; // 木の高さ
  const trunkColor = 0x563929; // 木の色
  const graphics = new Graphics() // 木（四角）を描画
    .rect(-trunkWidth / 2, -trunkHeight, trunkWidth, trunkHeight)
    .fill({ color: trunkColor }); // 塗りつぶし

  // crown＝（ここでは鉢、頂点、上部の三角形部分）
  const crownHeight = height - trunkHeight; // 三角形の高さ
  const crownLevels = 4; // 三角形は4段階
  const crownLevelHeight = crownHeight / crownLevels; // 三角形の高さ
  const crownWidthIncrement = width / crownLevels; // 三角形の高さの増分
  const crownColor = 0x264d3d; // 三角形の色

  // 三角形の大きさを段階で調整
  for (let index = 0; index < crownLevels; index++) {
    const y = -trunkHeight - crownLevelHeight * index;
    const levelWidth = width - crownWidthIncrement * index;
    const offset = index < crownLevels - 1 ? crownLevelHeight / 2 : 0;

    graphics // 三角形を描画
      .moveTo(-levelWidth / 2, y)
      .lineTo(0, y - crownLevelHeight - offset)
      .lineTo(levelWidth / 2, y)
      .fill({ color: crownColor });
  }

  return graphics;
}
