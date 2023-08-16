const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
// const STORAGE_TOKEN = 'JJER0W91PS930CDVAOULS02PWMPNBAIWOL417IW7'; GroupWork Token
// const STORAGE_TOKEN = "ZP64ZO1L6D9X2EI7HGPY16UYRDDGTVIKBDPF9AU8"; Token Mathias
const STORAGE_TOKEN = "HVB7L29NN265A889AF425B3ZO8TUNPSO7B9Z2XAV";

let users = [];
let contacts = [];
let tasks = [];
let category = [];
let categoryColorPick;
let selectCategory;
let subtasks = [];


/** Overwrites data on backend server with empty Array. */
async function pushEmptyArray() {
  users = [];
  await setItem("users", JSON.stringify(users));
}


/** Loads the users array and the currentUser from local storage. */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
    loadCurrentUserFromLocalStorage();
  } catch (e) {
    console.error("Loading error:", e);
  }
}


/** Loads the currentUser data from local storage. */
function loadCurrentUserFromLocalStorage() {
  let currentUserAsText = localStorage.getItem("currentUser");
  currentUser = JSON.parse(currentUserAsText);
}


/** Saves the currentUser data to local storage. */
function saveCurrentUserToLocalStorage(currentUser) {
  let currentUserAsText = JSON.stringify(currentUser);
  localStorage.setItem("currentUser", currentUserAsText);
}


/**
 * Saves parameter into backend.
 * @param {string} key - The key of the parameter to save.
 * @param {*} value - The value of the parameter to save.
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}


/**
 * Loads value from backend.
 * @param {string} key - The key of the parameter to load.
 * @returns {*} the value of the parameter to load.
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}
