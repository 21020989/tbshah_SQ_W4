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

const STORY_NODES = {};

let currentNodeKey = null;

// ------------------------------------------------------------
// startStory(nodeKey)
// Sets the current node to the selected story node.
// ------------------------------------------------------------
function startStory(nodeKey) {
  const key = nodeKey || "start1";
  currentNodeKey = STORY_NODES[key] ? key : "start1";
}

// ------------------------------------------------------------
// getCurrentNode()
// Returns the current story node object.
// ------------------------------------------------------------
function getCurrentNode() {
  return currentNodeKey ? STORY_NODES[currentNodeKey] : null;
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
