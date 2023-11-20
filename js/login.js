const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let msg = params.msg;


/** Initializes Login. */
function initLogin() { /**@alias module:initLogin */
  loadUsers();
  animationLogin();
  enterInputDataIfRemembered();
  displayMessageFromURL();
}


/** Starts/stops animation. */
function animationLogin() {
  setTimeout(() => {
    removeElement('animation-join');
    removeElement('screen-animation');
    removeElement('logo-animation');
    showElement('join-logo');
  }, 900);
}


/** Logs user in and saves data, if input is valid (shows error otherwise). */
async function userLogin() {
  let userEmail = document.getElementById('loginEmail');
  let userPassword = document.getElementById('loginPassword');
  let user = users.find(users => users.email.toLowerCase() == userEmail.value.toLowerCase() && users.password == userPassword.value);

  if (user) {
    saveInputDataIfRememberMeIsChecked(userEmail, userPassword);
    saveCurrentUserToLocalStorage(users.indexOf(user));
    navigateToURL('summary.html');
  } else {
    await showErrorBoxAndMessage('loginEmail', 'loginEmail-error-msg')
    await showErrorBoxAndMessage('loginPassword', 'loginPassword-error-msg')
  }
  document.getElementById('msg-box').innerHTML = '';
}


/** Logs user in as guest and saves to local storage. */
async function guestLogin() {
  saveCurrentUserToLocalStorage('');
  navigateToURL('summary.html');
}


/** 
 * Checks the remember checkbox and saves input data in the local storage.
 * @param {string} userEmail - login email value
 * @param {string} userPassword - login password value
 */
function saveInputDataIfRememberMeIsChecked(userEmail, userPassword) {
  let rememberCheckbox = document.getElementById('remember-me');
  if (rememberCheckbox.checked) {
    localStorage.setItem('user', userEmail.value);
    localStorage.setItem('pw', userPassword.value);
    localStorage.setItem('remember', true);
  } else {
    localStorage.setItem('user', '');
    localStorage.setItem('pw', '');
    localStorage.setItem('remember', false);
  }
}


/** Checks onload if remember checkbox is set in the local storage 
 * and enters the data in the input fields if this is the case. 
 */
function enterInputDataIfRemembered() {
  let remember = localStorage.getItem('remember');
  if (remember == 'true') {
    document.getElementById('loginEmail').value = localStorage.getItem('user');
    document.getElementById('loginPassword').value = localStorage.getItem('pw');
    document.getElementById('remember-me').checked = localStorage.getItem('remember');
  } else {
    localStorage.setItem('user', '');
    localStorage.setItem('pw', '');
    localStorage.setItem('remember', false);
  }
}


/** Clears array "currentUser" and navigates to index.html */
async function logout() {
  saveCurrentUserToLocalStorage('');
  navigateToURL('index.html');
}


/** Shows message from 'msg-box' for 2 seconds. */
function displayMessageFromURL() {
  let msgBox = document.getElementById('msg-box');
  if (msg) {
    showOverlay('msg-box');
    msgBox.innerHTML = msg;
  }
  setTimeout(() => {
    hideOverlay('msg-box');
  }, 2000);
}


/** 
 * Draws a red error-box around a given input field and writes a corresponding message below. 
 * @param {String} inputID The ID of the input field.
 * @param {String} msgID The ID of the error message.
*/
async function showErrorBoxAndMessage(inputID, msgID) {
  let errorBoxInput = document.getElementById(inputID);
  errorBoxInput.classList.add('error-box');
  errorBoxInput.value = '';
  showElement(msgID);
}


/** Removes a red error-box from a given input field and the corresponding message. 
 * @param {String} inputID The ID of the input field.
 * @param {String} msgID The ID of the error message.
 */
async function resetErrorBoxAndMessage(inputID, msgID) {
  let resetErrorBoxInput = document.getElementById(inputID);
  resetErrorBoxInput.classList.remove('error-box');
  hideElement(msgID);
}