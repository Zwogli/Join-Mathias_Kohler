/**
 * Initializes the addTask site by loading user data, initializing header navigation and setting up the input form.
 */
async function initAddTask() {
    await loadUserData();
    setActiveUser();
    setCategories();
    await initHeaderNav();
    activateNavSection('nav-addtask');

    await renderContactsForAddTaskDropDown();
    renderCategoriesForAddTaskDropDown();
    setMinDate('addtask-dueDate');
    renderAddTaskLightButton();
    renderAddTaskMobileCreateButton();

    boardColumnToAddTask = 'board-column-todo';
    localStorage.setItem('boardColumnToAddTask', boardColumnToAddTask);
}