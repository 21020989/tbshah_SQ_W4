// ============================================================
// Choose-Your-Own-Adventure Game
// ============================================================

// ------------------------------------------------------------
// ABOUT THIS FILE
// sketch.js is the p5.js entry point: setup(), draw(), mousePressed().
// It reads story state from game.js and draws UI via scenes.js.
// ------------------------------------------------------------

let playerBlobT = 0;

const BTN_Y = 340;
const BTN_W = 140;
const BTN_H = 50;

function setup() {
  createCanvas(800, 450);
  textFont("monospace");

  const urlParams = new URLSearchParams(window.location.search);
  const nodeParam = urlParams.get("node");
  startStory(nodeParam);
}

function draw() {
  drawBackground();
  drawBlob(width / 2, 180, 50, color(0, 200, 180), playerBlobT);

  const node = getCurrentNode();

  if (!node) {
    fill(200);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("No story loaded.", width / 2, 220);
    textSize(14);
    text("Go back to the menu to start the adventure.", width / 2, 260);

    drawButton(
      width / 2,
      320,
      220,
      50,
      "Back to menu",
      isMouseOver(width / 2, 320, 220, 50),
    );
  } else {
    drawStoryText(node.text);

    if (node.options && node.options.length > 0) {
      let positions = [260, 540];

      for (let i = 0; i < node.options.length; i++) {
        drawButton(
          positions[i],
          BTN_Y,
          BTN_W,
          BTN_H,
          node.options[i].label.toUpperCase(),
          isMouseOver(positions[i], BTN_Y, BTN_W, BTN_H),
        );
      }
    } else {
      fill(220);
      textSize(18);
      textAlign(CENTER, CENTER);
      text("The story ends here.", width / 2, 320);

      drawButton(
        width / 2,
        380,
        220,
        50,
        "Restart",
        isMouseOver(width / 2, 380, 220, 50),
      );
    }
  }

  playerBlobT += 0.015;
}

function mousePressed() {
  const node = getCurrentNode();

  if (!node) {
    if (isMouseOver(width / 2, 320, 220, 50)) {
      window.location.href = "index.html";
    }
    return;
  }

  if (node.options && node.options.length > 0) {
    let positions = [260, 540];

    for (let i = 0; i < node.options.length; i++) {
      if (isMouseOver(positions[i], BTN_Y, BTN_W, BTN_H)) {
        window.location.href = `index.html?node=${encodeURIComponent(node.options[i].next)}`;
      }
    }
  } else {
    if (isMouseOver(width / 2, 380, 220, 50)) {
      window.location.href = "index.html";
    }
  }
}
