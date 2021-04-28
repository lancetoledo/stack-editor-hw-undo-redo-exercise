// Import stylesheets
import "./style.css";
import Stack from "./stack";

const undo = new Stack();
const redo = new Stack();

const editor = document.getElementById("editor");

editor.addEventListener("keydown", ev => {
  if (ev.ctrlKey && ev.key === "z") {
    ev.preventDefault();
    // Here is where we're going to link the undo functionality
    // with the front-end.  In this event listener, we need to
    // edit the contents of the editor (ev.target.value) with
    // the last item from the stack.

    // Don't forget!  We also have to make sure we're loading
    // our redo stack as well!
    if (!undo.isEmpty()) {
      const value = undo.pop();
      ev.target.value = value;
      redo.push(value);
    } else {
      ev.target.value = "";
    }
  } else if (ev.ctrlKey && ev.key === "r") {
    ev.preventDefault();
    // Just like you did with the undo functionality, link your redo
    // stack functionality here!  Remember!  We want to set
    // (ev.target.value) with your value from your redo stack.

    // Don't forget!  We also need to make sure we're loading
    // our UNDO stack as well!
    if (!redo.isEmpty()) {
      const value = redo.pop();
      ev.target.value = value;
      undo.push(value);
    }
  } else if (ev.key === " ") {
    // If the user has hit space, we want to reorgamize the undo
    // history to account for words instead of by character.
    // First we clear the undo.
    undo.clear();
    redo.clear();
    // We need a variable to hold the current string SO FAR.
    let tempString = "";
    // Then we need to move through each character.  To do this I'm going
    // to use a for loop.  My first answer used Array.reduce() but I don't think
    // we've covered that yet. :)
    for (const char of ev.target.value.split("")) {
      // If we come across a space, we need to push the accumulation of the string
      // so far onto the stack.
      if (char == " ") {
        // First we push a space onto the string, then we push the accumulated value
        // onto the history.
        tempString = tempString + " ";
        undo.push(tempString);
      } else {
        // If there's no space, then just continue to build the the accumulator string.
        tempString += char;
      }
    }
  } else {
    undo.push(ev.target.value);
  }
});
