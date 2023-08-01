/*--------------------------------------------------
Global Constants and Variables
---------------------------------------------------*/
const NUMBER_OF_BG_COLORS = 17; // see bgColors.css
let activeUser;
let boardColumnToAddTask = "board-column-todo";

/*--------------------------------------------------
Support Functions
---------------------------------------------------*/
/** Function to clear the inner HTML content of an element with a given ID.
 * @param {string} id - The ID of the element to clear.
 */
function clearElement(id) {
  document.getElementById(id).innerHTML = "";
}

/** Function to scroll to an element with a given ID.
 * @param {string} id - The ID of the element to scroll to.
 */
function scrollToID(id) {
  location.hash = `#${id}`;
}

/** Function to get a random background-color class out of NUMBER_OF_BG_COLORS classes (defined in bgColors.css).
 * @returns {string} A string representing the background-color class.
 */
function getRandomColorClass() {
  return `bg-${getRandomInt(NUMBER_OF_BG_COLORS)}`;
}

/** Function to get a random integer between 0 and a given maximum value.
 * @param {number} max - The maximum value for the random integer.
 * @returns {number} A random integer between 0 and the given maximum value.
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/** Function to highlight the current section in the Navbar.
 * @param {string} sectionID - The ID of the section to be highlighted.
 */
function activateNavSection(sectionID) {
  document.getElementById("nav-summary").classList.remove("active");
  document.getElementById("nav-board").classList.remove("active");
  document.getElementById("nav-addtask").classList.remove("active");
  document.getElementById("nav-contacts").classList.remove("active");
  document.getElementById(sectionID).classList.add("active");
}

/** This Function restricts the date so you can't pick dates in the past
 * @param {string} inputID - The ID of the input field that will be checked.
 */
function setMinDate(inputID) {
  let dateToday = new Date();
  let month = dateToday.getMonth() + 1;
  let day = dateToday.getDate();
  let year = dateToday.getFullYear();

  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();
  let maxDate = year + "-" + month + "-" + day;
  document.getElementById(inputID).setAttribute("min", maxDate);
}

/** Checks if the current screen width is at most a specified width.
 * @param {string} screenWidth - The maximum screen width to check against.
 * @returns {boolean} Whether or not the current screen width is at most the specified width.
 */
function screenWidthIsAtMost(screenWidth) {
  return window.matchMedia(`(max-width: ${screenWidth})`).matches;
}

/*--------------------------------------------------
User Data
---------------------------------------------------*/
/**
 * Sets the active user to guest or current signed user.
 */
function setActiveUser() {
  activeUser = loggedInAsGuest() ? guestUser : users[currentUser];
}

/**
 * Sets the predefined categories for active user.
 */
function setCategories() {
  category = activeUser.categories;
}

/**
 * Saves the user data to local storage (guest) or backend (signed user).
 */
async function saveUserData() {
  if (loggedInAsGuest()) {
    saveGuestUserToLocalStorage();
  } else {
    await setItem("users", JSON.stringify(users));
  }
}

/**
 * Loads the user data from local storage (guest) or backend (signed user).
 */
async function loadUserData() {
  await loadUsers();

  if (loggedInAsGuest()) {
    loadGuestUserFromLocalStorage();
  }
}

/**
 * Checks if the user is logged in as a guest.
 * @returns {boolean} True if the user is logged in as a guest, false otherwise.
 */
function loggedInAsGuest() {
  return currentUser.length === 0;
}

/**
 * Saves the guest user data to local storage.
 */
function saveGuestUserToLocalStorage() {
  let guestUserAsText = JSON.stringify(guestUser);
  localStorage.setItem("guestUser", guestUserAsText);
}

/**
 * Loads the guest user data from local storage.
 */
function loadGuestUserFromLocalStorage() {
  let guestUserAsText = localStorage.getItem("guestUser");

  if (guestUserAsText) {
    guestUser = JSON.parse(guestUserAsText);
  }
}
