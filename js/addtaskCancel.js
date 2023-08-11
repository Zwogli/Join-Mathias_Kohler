/** Closes (from overlay) or resets (from site) the add task form. */
function closeOrResetAddTask() {
    if (addTaskIsOpenAsOverlay()) { closeAddTaskOverlay(); }
    else { resetInputFields(); }
}


/** Resets all inputs in the add task form. */
async function resetInputFields() {
    document.getElementById('addtask-title-input').value = '';
    document.getElementById('addtask-description-input').value = '';
    closeNewCategoryInput();
    document.getElementById('select-task-category').innerHTML = 'Select task category';
    document.getElementById('addtask-dueDate-input').value = '';
    uncheckAllContacts();
    removeRedFramesFromUnfilledInputFields();
    deactivatePrioButtons('addtask');
    await resetArrays();
}


/** Unchecks all contacts in the add task form. */
function uncheckAllContacts() {
    for (let i = 0; i < activeUser.contacts.length; i++) {
        const contactCheckbox = document.getElementById(`addtask-assigned-contact-checkbox-${i}`);
        contactCheckbox.checked = false;
    }
}


/** Removes all red frames around input fields (when resetting the add task form). */
async function removeRedFramesFromUnfilledInputFields() {
    document.getElementById('addtask-title-input').classList.remove('border-red');
    document.getElementById('addtask-description-input').classList.remove('border-red');
    document.getElementById('addtask-category-dropdown').classList.remove('border-red');
    document.getElementById('addtask-dueDate-input').classList.remove('border-red');
    document.getElementById('addtask-prio').classList.remove('border-red');
}


/** Resets temporary arrays for the add task form. */
async function resetArrays() {
    subtasks = [];
    await setItem('subtasks', JSON.stringify(subtasks));
    renderSubtaskArray();

    contacts = [];
    tasks = [];
    // category = [];
    selectCategory = undefined;
}