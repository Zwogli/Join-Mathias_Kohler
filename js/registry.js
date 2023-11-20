/** Initializes SignUp. */
function initSignUp() {
	loadUsers();
	displayMessageFromURL();
}


/** Registers new user or checks users array for existing email. */
async function userSignUp() {
	let name = document.getElementById('signUpName');
	let email = document.getElementById('signUpEmail');
	let password = document.getElementById('signUpPassword');

	if (emailAlreadyExists(email.value)) {
		showErrorBoxAndMessage('signUpEmail', 'signUpEmail-error-msg')
	} else {
		setSignedUpUserAsFirstContact(name.value, email.value);
		await updateAndSaveUserArray(name.value, email.value, password.value);
		navigateToURL('index.html?msg=You have successfully registered.');
	}

	name.value = '';
	email.value = '';
	password.value = '';
}


/**
 * Checks whether email already exists in user array.
 * @param {string} email - email of the new user.
 * @returns {boolean} true or false.
 */
function emailAlreadyExists(email) {
	return users.some(user => user.email === email);
}


/**
 * Pushes new user object into users array and saves the array in the backend.
 * @param {string} newUserName - name of the new user.
 * @param {string} newUserEmail - email of the new user.
 * @param {string} newUserPassword - password of the new user.
 */
async function updateAndSaveUserArray(newUserName, newUserEmail, newUserPassword) {
	users.push({
		name: newUserName,
		email: newUserEmail,
		password: newUserPassword,
		contacts,
		tasks: [{
			"title": "Start with Join",
			"description": "For new tasks click on add task.",
			"dueDate": getCurrentDateAsString(),
			"prio": 0,
			"category": { name: "Test", color: 0 },
			"assignedTo": [{
				name: `${newUserName} (You)`,
				email: newUserEmail,
				phone: '',
				color: 'bg-theme',
				tasks: []
			}],
			"subtasks": [
				{ name: "Create task", done: false },
				{ name: "Check task", done: false }
			],
			"boardColumn": "board-column-todo"
		}],
		categories: [
			{ name: "Test", color: 0 }
		]
	});
	await setItem('users', JSON.stringify(users));
}


/**
 * Sets new user as first entry in its own contacts array.
 * @param {string} newUserName - name of the new user.
 * @param {string} newUserEmail - email of the new user.
 */
function setSignedUpUserAsFirstContact(newUserName, newUserEmail) {
	contacts = [{ name: `${newUserName} (You)`, email: newUserEmail, phone: '', color: 'bg-theme', tasks: [] }];
}