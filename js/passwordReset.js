/** Initializes password reset. */
function initPasswordReset() {
  loadUsers();
  displayMessageFromURL();
}


/** Saves email of the password requester into localStorage. */
function saveRequesterLocal() {
  const requestEmail = document.getElementById('requesterEmail').value;
  localStorage.setItem('requestEmail', requestEmail);
}


/** Sets and saves the new password if the email of the password requester is registered. */
function setNewPasswordIfEmailExists() {
  const requestEmail = localStorage.getItem('requestEmail');
  const checkedUser = users.find(user => user.email.toLowerCase() == requestEmail.toLowerCase());

  if (checkedUser) {
    updatePassword(checkedUser);
  } else {
    navigateToURL('index.html?msg=Email does not exist');
  }
}


/** Sets and saves the new password for the given user. 
 * @param {User} checkedUser - The given user.
 */
async function updatePassword(checkedUser) {
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (newPassword != confirmPassword) {
    showErrorBoxAndMessage('confirm-password', 'confirm-password-error-msg');
    return;
  }

  checkedUser.password = newPassword;
  await setItem('users', JSON.stringify(users));
  localStorage.setItem('requestEmail', '');
  navigateToURL('index.html?msg=You reset your password');
}