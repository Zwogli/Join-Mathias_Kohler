/*--------------------------------------------------
Global Constants and Variables
---------------------------------------------------*/
const NUMBER_OF_BG_COLORS = 17; // see bgColors.css
let activeUser;
let boardColumnToAddTask = "board-column-todo";

/*--------------------------------------------------
Support Functions
---------------------------------------------------*/
/** 
 * Clears the inner HTML content of an element with a given ID.
 * @param {string} id - The ID of the element to clear.
 */
function clearElement(id) {
  document.getElementById(id).innerHTML = "";
}


/** 
 * Scrolls to an element with a given ID.
 * @param {string} id - The ID of the element to scroll to.
 */
function scrollToID(id) {
  location.hash = `#${id}`;
}


/** 
 * Gets a random background-color class out of NUMBER_OF_BG_COLORS classes (defined in bgColors.css).
 * @returns {string} A string representing the background-color class.
 */
function getRandomColorClass() {
  return `bg-${getRandomInt(NUMBER_OF_BG_COLORS)}`;
}


/** 
 * Gets a random integer between 0 and a given maximum value.
 * @param {number} max - The maximum value for the random integer.
 * @returns {number} A random integer between 0 and the given maximum value.
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


/**
 * Checks whether a given array contains a given object.
 * @param {Array} array - The array to be checked.
 * @param {Object} object - The object to be contained.
 * @returns {Boolean} True if array contains object.
 */
function arrayIncludesObject(array, object) {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (JSON.stringify(element) === JSON.stringify(object)) {
      return true;
    }
  }
  return false;
}


/** 
 * Highlights the current section in the Navbar.
 * @param {string} sectionID - The ID of the section to be highlighted.
 */
function activateNavSection(sectionID) {
  document.getElementById("nav-summary").classList.remove("active");
  document.getElementById("nav-board").classList.remove("active");
  document.getElementById("nav-addtask").classList.remove("active");
  document.getElementById("nav-contacts").classList.remove("active");
  document.getElementById(sectionID).classList.add("active");
}


/** 
 * Restricts the date so you can't pick dates in the past.
 * @param {string} inputID - The ID of the input field that will be checked.
 */
function setMinDate(inputID) {
  const dateToday = new Date();
  const month = (dateToday.getMonth() + 1).toString().padStart(2, '0');
  const day = dateToday.getDate().toString().padStart(2, '0');
  const year = dateToday.getFullYear();
  const minDate = `${year}-${month}-${day}`;

  document.getElementById(inputID).setAttribute("min", minDate);
}


/** 
 * Checks if the current screen width is at most a specified width.
 * @param {string} screenWidth - The maximum screen width to check against.
 * @returns {boolean} Whether or not the current screen width is at most the specified width.
 */
function screenWidthIsAtMost(screenWidth) {
  return window.matchMedia(`(max-width: ${screenWidth})`).matches;
}


/** 
 * Opens a given url.
 * @param {String} url - URL adress
 */
function linkToUrl(url) {
  window.location.href = `./${url}`;
}


/** 
 * Checks the current url.
 * @param {String} endOfPath - string that may match with the end of current url.
 * @returns {Boolean} true if the end of the current url matches the given string, false otherwise.
 */
function checkUrl(endOfPath) {
  return window.location.pathname.endsWith(endOfPath);
}