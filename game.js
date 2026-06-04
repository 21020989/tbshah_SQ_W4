// ============================================================
// game.js: Adventure Story Logic
// ============================================================
// This file contains the story tree and current story state.
// It does not draw anything — drawing is handled by scenes.js.
// Variables defined here are available in sketch.js and scenes.js
// because all files share the same global scope.
// ============================================================

const OPTION1 = "option 1";
const OPTION2 = "option 2";

// ------------------------------------------------------------
// STORY NODES
// Each node has a text prompt and two possible next choices.
// The game advances by changing currentNodeKey.
// ------------------------------------------------------------
const STORY_NODES = {
  start1: {
    text: "I enter the Rosedale Themepark, Do I go to Left or Right?",
    options: [
      { label: "Left", next: "Water_Park" },
      { label: "Right", next: "Roller_Coster" },
    ],
  },
  Water_Park: {
    text: "I enter the Water park. I see two rides, One is a log ride, the other a 70ft water slide.",
    options: [
      { label: "Log Ride!", next: "log_ride" },
      { label: "Water Slide!", next: "water_slide" },
    ],
  },
  Roller_Coster: {
    text: "I go to the roller coasters and see a old friend ahead in line! he offers you to cut ahead",
    options: [
      { label: "Skip the Line", next: "skip_line" },
      { label: "Wait in Line", next: "wait_line" },
    ],
  },
  log_ride: {
    text: "A jerk cuts in front of you in the line for the log ride!",
    options: [
      { label: "Confront Him!", next: "conflict" },
      { label: "Complain to your friend", next: "complain" },
    ],
  },
  water_slide: {
    text: "You reach the top, and you see the slide shaking concerningly. You've been waiting for so long you dont want the worker to shut down the ride!",
    options: [
      { label: "let the worker know", next: "shut_down" },
      { label: "Go down anyway", next: "Die" },
    ],
  },
  skip_line: {
    text: "You skip the line and approach your friend. A guy next to you in line is furious that you cut ahead and starts yelling at you.",
    options: [
      { label: "Yell back!", next: "yell_back" },
      { label: "Apologize", next: "apologize" },
    ],
  },
  wait_line: {
    text: "You wait in line, its been 30 minutes, and your are getting impatient. Exit the line or keep waiting?",
    options: [
      { label: "Exit the line", next: "exit_line" },
      { label: "Keep waiting", next: "wait_more" },
    ],
  },
  conflict: {
    text: "You tell the guy off, He boils with rage. He punches you in the stomach, grabs your head and bangs it on the metal railing, shattering your skull. You die a bloody mess.",
    options: [],
  },
  complain: {
    text: "The line skipper hears you, gets a knife out of his pocket and stabs you in the jugular. You die painfully.",
    options: [],
  },
  shut_down: {
    text: "The worker sees the shaking and shuts down the ride. You are disappointed but relieved you didnt go down.",
    options: [],
  },
  Die: {
    text: "You go down the slide, and upon reaching the shaking section the slide splits open, you fall to your doom 50ft down, screaming. You splatter on the concrete.",
    options: [],
  },
  yell_back: {
    text: "You start yelling and getting heated, eventually you punch him in the stomach, grab his head and bang it on the metal railing.",
    options: [],
  },
  apologize: {
    text: "You apologize, the guy calms down and accepts your apology, you have a nice chat about the ride and become friends.",
    options: [],
  },
  exit_line: {
    text: "You exit the line and decide to go to the water park instead, but unfortunately the park closed due to a death at the water slide.",
    options: [],
  },
  wait_more: {
    text: "You keeping waiting and eventually you get on the ride. You have a great time! and found it was worth the wait.",
    options: [],
  },
};

const START_NODES = {
  1: "start1",
  2: "start2",
};

let currentNodeKey = null;

// ------------------------------------------------------------
// startStory(menuChoice)
// Sets the current node to the selected story root.
// ------------------------------------------------------------
function startStory(choice) {
  currentNodeKey = START_NODES[choice] || null;
}

// ------------------------------------------------------------
// getCurrentNode()
// Returns the current story node object.
// ------------------------------------------------------------
function getCurrentNode() {
  return currentNodeKey ? STORY_NODES[currentNodeKey] : null;
}

// ------------------------------------------------------------
// chooseOption(index)
// Advances the story to the next node for the chosen option.
// ------------------------------------------------------------
function chooseOption(index) {
  const node = getCurrentNode();
  if (node && node.options && node.options[index]) {
    currentNodeKey = node.options[index].next;
  }
}

// ------------------------------------------------------------
// resetStory()
// Resets the story state so the page can restart.
// ------------------------------------------------------------
function resetStory() {
  currentNodeKey = null;
}
