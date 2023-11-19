const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let msg = params.msg;


/** Initializes Login. */
function initLogin() { /**@alias module:initLogin */
  loadUsers();
  animationLogin();
  remember();
  displayMessage();
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


/** Checks user input for login. */
async function userLogin() {
  let userEmail = document.getElementById('loginEmail');
  let userPassword = document.getElementById('loginPassword');
  let userIndex = 0;

  let user = users.find(users => users.email.toLowerCase() == userEmail.value.toLowerCase() && users.password == userPassword.value);

  checkUserInput(user, userEmail, userPassword, userIndex);
}


/** 
 * Checks user input and call back.
 * @param {string} user activ user
 * @param {string} userEmail user login email
 * @param {string} userPassword user login password
 * @param {number} userIndex array position
 */
async function checkUserInput(user, userEmail, userPassword, userIndex) {
  let msgBox = document.getElementById('msg-box');

  msgBox.innerHTML = '';

  if (user) {
    checkRemember(userEmail, userPassword);
    while (user != users[userIndex]) {
      userIndex++;
    }
    saveCurrentUserToLocalStorage(userIndex);
    linkToUrl('summary.html');
  } else {
    await errorBox('loginEmail', 'loginEmail-error-msg')
    await errorBox('loginPassword', 'loginPassword-error-msg')
  }
}


/** Guest log in */
async function userGuest() {
  saveCurrentUserToLocalStorage('');
  linkToUrl('summary.html');
}


/** 
 * Checks the remember checkbox and saves in the local storage.
 * @param {string} userEmail - login email value
 * @param {string} userPassword - login password value
 */
function checkRemember(userEmail, userPassword) {
  let remember = document.getElementById('remember-me');
  if (remember.checked == true) {
    localStorage.setItem('user', userEmail.value);
    localStorage.setItem('pw', userPassword.value);
    localStorage.setItem('remember', true);
  } else {
    localStorage.setItem('user', '');
    localStorage.setItem('pw', '');
    localStorage.setItem('remember', false);
  }
}


/** Checks onload if remember checkbox is set in the local storage. */
function remember() {
  let remember = localStorage.getItem('remember')
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
  linkToUrl('index.html');
}


/** Shows message from 'msg-box' for 2 seconds. */
function displayMessage() {
  let msgBox = document.getElementById('msg-box');
  if (msg) {
    showOverlay('msg-box');
    msgBox.innerHTML = msg;
  }
  setTimeout(() => {
    hideOverlay('msg-box');
  }, 2000);
}


/** Sets error-box. */
async function errorBox(inputID, msgID) {
  let errorBoxInput = document.getElementById(inputID);
  errorBoxInput.classList.add('error-box');
  errorBoxInput.value = '';
  showElement(msgID);
}


/** Resets error-box. */
async function resetErrorBox(inputID, msgID) {
  let resetErrorBoxInput = document.getElementById(inputID);
  resetErrorBoxInput.classList.remove('error-box');
  hideElement(msgID);
}