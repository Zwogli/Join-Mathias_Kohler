/** Searches tasks by a given string and remove non-relevant tasks. */
function search() {
    let search = document.getElementById('search-input').value;
    showTasks();
    removeNonrelevantTasks(search);
}


/**
 * Removes tasks that do not contain the search string in their title or description.
 * @param {string} search - The search string to match tasks against.
 */
function removeNonrelevantTasks(search) {
    const tasksToRemove = getTasksToRemoveForSearch(search);

    for (let i = 0; i < tasksToRemove.length; i++) {
        const index = activeUser.tasks.indexOf(tasksToRemove[i]);
        removeElement(`task-${index}`);
    }
}


/**
 * Gets the list of tasks that do not match the search string in their title or description.
 * @param {string} searchString - The search string to match tasks against.
 * @returns {Array} An array of task objects that do not match the search string in their title or description.
 */
function getTasksToRemoveForSearch(searchString) {
    let search = searchString.toLowerCase();
    return activeUser.tasks.filter(obj =>
        !obj.title.toLowerCase().includes(search) &&
        !obj.description.toLowerCase().includes(search)
    )
}


/** Clears the search input field and show all tasks. */
function closeSearch() {
    document.getElementById('search-input').value = '';
    showTasks();
}


/** Shows all tasks. */
function showTasks() {
    for (let i = 0; i < activeUser.tasks.length; i++) {
        showElement(`task-${i}`);
    }
}
