/**
 * Initializes the board by loading user data, initializing header navigation and rendering the board columns.
 */
async function initBoard() {
    await initHeaderNav();
    await loadUserData();
    setActiveUser();
    setCategories();
    activateNavSection('nav-board');
    renderBoardColumns();
    enableMobileDragAndDrop();
}

/**
 * Renders the four board-columns by calling the function {@link renderColumn} for each column.
 */
function renderBoardColumns() {
    renderColumn('board-column-todo');
    renderColumn('board-column-progress');
    renderColumn('board-column-feedback');
    renderColumn('board-column-done');
    enableMobileDragAndDrop();
}


/**
 * Renders a board-column given as a parameter.
 * @param {string} boardColumn - The ID of the board-column to be rendered.
 */
function renderColumn(boardColumn) {
    let tasksOfColumn = activeUser.tasks.filter(t => t.boardColumn === boardColumn);
    let container = document.getElementById(boardColumn);

    if (tasksOfColumn.length) {
        container.innerHTML = renderCards(tasksOfColumn);
    }
    else {
        container.innerHTML = renderEmptyColumn();
    }
}


/**
 * Renders the cards for all task objects in the given array.
 * @param {array} arrayOfTasks - The array of task JSONs to render.
 */
function renderCards(arrayOfTasks) {
    let html = '';
    for (let i = 0; i < arrayOfTasks.length; i++) {
        const task = arrayOfTasks[i];
        html += renderCard(task);
    }
    return html;
}


/** Renders an empty board-column. */
function renderEmptyColumn() {
    return `<div class="empty-column cursor-d fs-16 fw-400 ta-c">No tasks here</div>`;
}


/**
 * Renders the card for a task object.
 * @param {json} task - The task to render.
 */
function renderCard(task) {
    let index = activeUser.tasks.indexOf(task);
    return /*html*/`
        <div id="task-${index}" class="task" draggable="true" ondragstart="startDragging(${index})" onclick="openBoardCardOverlay(${index})">
            <div class="task-card-category fs-16 fw-400 bg-${task.category.color} mb-20">${task.category.name}</div>
            <h3 class="fs-16 fw-700 m-0 mb-10">${task.title}</h3>
            <span class="fs-16 fw-400 mb-20">${task.description}</span>
            ${renderProgressBar(task)}
            <div class="assignedTo-and-prio">
                <div class="assigned-contacts">
                    ${renderAssignedContacts(task)}
                </div>
                <img src="./assets/img/prio-${task.prio}.svg">
            </div>
        </div>
    `;
}


/**
 * Renders the progress bar regarding the subtasks of a task object.
 * @param {json} task - The task object with the corresponding subtasks.
 */
function renderProgressBar(task) {
    if (task.subtasks.length) {
        return /*html*/`
            <div class="progressbar-container mb-20">
                <div class="progressbar">
                    <div class="progress" style="width:${getProgressOfSubtasks(task)}%"></div>
                </div>
                <span class="fs-12 fw-400">${getNumberOfDoneSubtasks(task)}/${task.subtasks.length} Done</span>
            </div>
        `;
    }
    else {
        return '';
    }
}


/**
 * Calculates the progress regarding the subtasks of a task object.
 * @param {json} task - The task object with the corresponding subtasks.
 * @returns {number} The progress in percentage.
 */
function getProgressOfSubtasks(task) {
    let percentage = (getNumberOfDoneSubtasks(task) / task.subtasks.length) * 100;
    let roundedPercentage = Math.round(percentage);
    return roundedPercentage;
}


/**
 * Gives the number of done subtasks of a task object.
 * @param {json} task - The task object with the corresponding subtasks.
 * @returns {number} The number of done subtasks.
 */
function getNumberOfDoneSubtasks(task) {
    let doneSubtasks = task.subtasks.filter(t => t.done);
    return doneSubtasks.length;
}


/**
 * Renders the assigned contacts of a task object within the cards of the board-columns.
 * @param {json} task - The corresponding task object.
 */
function renderAssignedContacts(task) {
    return (task.assignedTo.length <= 3) ?
        renderUpToThreeAssignedContacts(task) :
        renderMoreThanThreeAssignedContacts(task);
}


/**
 * Renders the assigned contacts of a task object within the cards of the board-columns, 
 * if there are at most three contacts assigned.
 * @param {json} task - The corresponding task object.
 */
function renderUpToThreeAssignedContacts(task) {
    let html = '';

    for (let i = 0; i < task.assignedTo.length; i++) {
        const contact = task.assignedTo[i];
        html += `
                <div class="contact-icon contact-icon-assigned fs-12 fw-400 ${contact.color}">
                    ${getInitials(contact)}
                </div>
            `;
    }

    return html;
}


/**
 * Renders the assigned contacts of a task object within the cards of the board-columns, 
 * if there are more than three contacts assigned.
 * @param {json} task - The corresponding task object.
 */
function renderMoreThanThreeAssignedContacts(task) {
    return `
        <div class="contact-icon contact-icon-assigned fs-12 fw-400 ${task.assignedTo[0].color}">
            ${getInitials(task.assignedTo[0])}
        </div>
        <div class="contact-icon contact-icon-assigned fs-12 fw-400 ${task.assignedTo[1].color}">
            ${getInitials(task.assignedTo[1])}
        </div>
        <div class="contact-icon contact-icon-assigned fs-12 fw-400 bg-theme">
            +${task.assignedTo.length - 2}
        </div>
    `;
}