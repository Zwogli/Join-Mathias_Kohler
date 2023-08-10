/*--------------------------------------------------
Overlays
---------------------------------------------------*/
/** This function currently links to the Add Task page,
 * and sets the board-column where a new task will be rendered.
 * @param {string} columnID - The ID of the board-column.
 */
async function openAddTaskOverlay(columnID = "board-column-todo") {
  freezeBackground("overlay-fullscreen");
  // renderAddTaskCard();
  showElement("add-task-card");
  showElement("addtask-create");
  slideInOverlay("add-task-card");
  slideInOverlay("addtask-create");
  await renderContacts();
  renderCategory();
  setMinDate("date");

  boardColumnToAddTask = columnID;
  localStorage.setItem("boardColumnToAddTask", boardColumnToAddTask);

}

/** Close Add Task Overlay. */
function closeAddTaskOverlay() {
  hideOverlay("add-task-card");
  hideOverlay("addtask-create");
  setTimeout(() => {
    removeElement("addtask-create");
    removeElement("add-task-card");
    unfreezeBackground("overlay-fullscreen");
  }, 220);
  resetInputFields();
  renderBoardColumns();
}

/*--------------------------------------------------
Show / Hide
---------------------------------------------------*/
/** Function to show an element with a given ID by removing the 'd-none' and 'hidden' classes.
 * @param {string} id - The ID of the element to show.
 */
function showElement(id) {
    document.getElementById(id).classList.remove("d-none");
    document.getElementById(id).classList.remove("hidden");
}

/** Function to hide an element with a given ID by adding the 'hidden' class.
 * @param {string} id - The ID of the element to hide.
 */
function hideElement(id) {
  document.getElementById(id).classList.add("hidden");
}

/** Function to hide an element with a given ID by adding the 'd-none' class.
 * @param {string} id - The ID of the element to hide.
 */
function hideElementDisplay(id) {
  document.getElementById(id).classList.add("d-none");
}

/** Function to remove an element with a given ID by adding the 'd-none' class.
 * @param {string} id - The ID of the element to remove.
 */
function removeElement(id) {
    document.getElementById(id).classList.add("d-none");
}

/** Function to show an overlay with a given ID by adding the 'show-overlay' class.
 *  @param {string} id - The ID of the overlay to show.
 */
function showOverlay(id) {
  document.getElementById(id).classList.add("show-overlay");
}

/** Function to hide an overlay with a given ID by removing the 'show-overlay' class.
 * @param {string} id - The ID of the overlay to hide.
 */
function hideOverlay(id) {
  document.getElementById(id).classList.remove("show-overlay");
}

/** Function to show an overlay with a given ID for a short time and then hide it.
 * @param {string} id - The ID of the overlay to show and hide.
 */
function showThenHideOverlay(id) {
  setTimeout(() => {
    showOverlay(id);
  }, 500);
  setTimeout(() => {
    hideOverlay(id);
  }, 2500);
}

/** Slides in an overlay element with the specified ID.
 * @param {string} id - The ID of the overlay element to slide in.
 */
function slideInOverlay(id) {
  setTimeout(() => {
    showOverlay(id);
  }, 100);
}

/** Freezes the background scrolling and shows an overlay element with the specified ID.
 * @param {string} id - The ID of the overlay element to show.
 */
function freezeBackground(id) {
  showElement(id);
  document.getElementById("body").classList.add("no-scrolling");
}

/** Unfreezes the background scrolling and hides an overlay element with the specified ID.
 * @param {string} id - The ID of the overlay element to hide.
 */
function unfreezeBackground(id) {
  removeElement(id);
  document.getElementById("body").classList.remove("no-scrolling");
}

/** Stops the propagation of an event to its parent elements.
 * @param {Event} event The event object.
 */
function doNotClose(event) {
  event.stopPropagation();
}

/** Closes a Dropdown menu.
 * @param {string} id - The ID of the menu element to close.
 */
function closeDropDown(id) {
  document.getElementById(id).classList.remove("collapsed");
}