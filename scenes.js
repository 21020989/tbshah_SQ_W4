// ============================================================
// scenes.js: Drawing Functions
// ============================================================
// This file contains all drawing helper functions.
// It does not contain any game logic — that lives in game.js.
// Functions defined here are available in sketch.js because
// all files share the same global scope.
// ============================================================

// ------------------------------------------------------------
// drawBackground()
// A simple dark background drawn every frame in draw().
// Calling background() every frame clears the previous frame,
// which is what creates the illusion of animation.
// ------------------------------------------------------------
function drawBackground() {
  background(10);
}

// ------------------------------------------------------------
// drawBlob(x, y, r, col, t)
// Draws a simple animated blob used in the game background.
// ------------------------------------------------------------
function drawBlob(x, y, r, col, t) {
  push();
  fill(col);
  noStroke();

  beginShape();
  let numPoints = 32;
  for (let i = 0; i < numPoints; i++) {
    let angle = (TWO_PI / numPoints) * i;
    let noiseVal = noise(cos(angle) * 0.8 + t, sin(angle) * 0.8 + t);
    let nr = r + map(noiseVal, 0, 1, -8, 8);
    vertex(x + cos(angle) * nr, y + sin(angle) * nr);
  }
  endShape(CLOSE);

  pop();
}

// ------------------------------------------------------------
// drawButton(x, y, w, h, label, isHovered)
// Draws a rectangular button with a text label.
// isHovered changes the colour when the mouse is over it,
// giving visual feedback that the button is clickable.
//
// x, y        — centre position (uses rectMode(CENTER))
// w, h        — width and height of the button
// label       — text displayed inside the button
// isHovered   — true if the mouse is currently over the button
// ------------------------------------------------------------
function drawButton(x, y, w, h, label, isHovered) {
  push();
  rectMode(CENTER); // x, y are the centre of the rectangle

  // Button background — lighter colour when hovered
  fill(isHovered ? color(80, 80, 100) : color(40, 40, 60));
  stroke(isHovered ? color(180, 180, 220) : color(80, 80, 100));
  strokeWeight(2);
  rect(x, y, w, h, 8); // rounded corners

  // Button label — centred inside the button
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text(label, x, y);

  pop();
}

// ------------------------------------------------------------
// isMouseOver(x, y, w, h)
// Returns true if the mouse cursor is currently inside the
// rectangle defined by centre (x, y) and dimensions (w, h).
// Used alongside drawButton() to detect clicks.
// ------------------------------------------------------------
function isMouseOver(x, y, w, h) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}

// ------------------------------------------------------------
// drawRoundInfo(player, npc)
// Draws the selected round info after the player picks an option.
// ------------------------------------------------------------
function drawRoundInfo(player, npc) {
  push();
  textAlign(CENTER, CENTER);
  noStroke();

  fill(220, 220, 220);
  textSize(20);
  text(`NPC chose ${npc.toUpperCase()}`, width / 2, height / 2 - 20);

  pop();
}

// ------------------------------------------------------------
// drawStoryText(textContent)
// Draws the current story prompt in the top half of the canvas.
// ------------------------------------------------------------
function drawStoryText(textContent) {
  push();
  fill(220);
  textAlign(CENTER, TOP);
  textSize(20);
  // Position text box centered horizontally
  let boxWidth = 700;
  let boxX = (width - boxWidth) / 2;
  text(textContent, boxX, 80, boxWidth, 200);
  pop();
}
