// ============================================================
// Week 4 Example 1: Multi-File Structure + Two-Option Game
// ============================================================

// ------------------------------------------------------------
// ABOUT THIS FILE
// This project is split across three JavaScript files:
//
//   sketch.js — p5.js entry point: setup(), draw(), mousePressed()
//   game.js   — game logic: choices, results, state variables
//   scenes.js — drawing helpers: blobs, buttons, result text
//
// All three files are loaded in game.html in that order.
// Variables and functions defined in one file are available
// in all others because they share the same global scope.
// ------------------------------------------------------------

// ------------------------------------------------------------
// BLOB ANIMATION TIMERS
// Stored here in sketch.js because they drive the visuals
// but are not part of the game logic.
// Each timer increases every frame to animate the wobble.
// ------------------------------------------------------------
let playerBlobT = 0;

// ------------------------------------------------------------
// BUTTON LAYOUT
// Shared constants for button position and size.
// Defined once here so sketch.js and scenes.js stay in sync.
// ------------------------------------------------------------
const BTN_Y = 340;
const BTN_W = 140;
const BTN_H = 50;

let initialChoice = null;
const urlParams = new URLSearchParams(window.location.search);
const choiceParam = urlParams.get("choice");
if (choiceParam === "1") {
  initialChoice = OPTION1;
} else if (choiceParam === "2") {
  initialChoice = OPTION2;
}

// ============================================================
// setup()
// Runs once at the very start of the sketch.
// Sets up the canvas and font.
// ============================================================
function setup() {
  createCanvas(800, 450);
  textFont("monospace");

  if (initialChoice !== null) {
    playerChoose(initialChoice);
  }
}

// ============================================================
// draw()
// Runs repeatedly in a loop after setup() finishes.
// Calls drawing functions from scenes.js and reads game
// state variables from game.js to decide what to show.
// ============================================================
function draw() {
  // drawBackground() is defined in scenes.js
  drawBackground();

  // --- Player blob (teal, centred) ---
  // drawBlob() is defined in scenes.js
  drawBlob(width / 2, 180, 50, color(0, 200, 180), playerBlobT);

  // playerChoice is defined in game.js
  // It is null before the player picks, and set to a choice after
  if (playerChoice !== null) {
    // Show what the player chose
    fill(200);
    textSize(18);
    text(playerChoice.toUpperCase(), width / 2, 300);

    // drawResultText() and drawButton() are defined in scenes.js
    drawResultText(roundResult);

    drawButton(
      width / 2,
      380,
      180,
      50,
      "Play Again",
      isMouseOver(width / 2, 380, 180, 50),
    );
  } else {
    // --- Choice buttons (only shown before player picks) ---
    let positions = [260, 540]; // x positions for the 2 buttons
    let labels = ["OPTION 1", "OPTION 2"];

    for (let i = 0; i < 2; i++) {
      drawButton(
        positions[i],
        BTN_Y,
        BTN_W,
        BTN_H,
        labels[i],
        isMouseOver(positions[i], BTN_Y, BTN_W, BTN_H),
      );
    }

    // Prompt
    fill(160);
    textSize(14);
    textAlign(CENTER);
    text("Choose an option", width / 2, 290);
  }

  // Advance blob animation each frame
  playerBlobT += 0.015;
}

// ============================================================
// mousePressed()
// A built-in p5.js event function.
// Automatically called once every time the mouse is clicked.
// Checks which button was clicked and calls the appropriate
// game logic function from game.js.
// ============================================================
function mousePressed() {
  if (playerChoice === null) {
    // Check each choice button
    let positions = [260, 540];
    let choices = [OPTION1, OPTION2];

    for (let i = 0; i < 2; i++) {
      if (isMouseOver(positions[i], BTN_Y, BTN_W, BTN_H)) {
        // playerChoose() is defined in game.js
        // It sets playerChoice, npcChoice, and roundResult
        playerChoose(choices[i]);
      }
    }
  } else {
    // Play Again button — resetRound() is defined in game.js
    if (isMouseOver(width / 2, 380, 180, 50)) {
      resetRound();
    }
  }
}
