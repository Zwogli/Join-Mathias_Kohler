/*--------------------------------------------------
Drag and Drop
---------------------------------------------------*/
let currentDraggedElement;


/**
 * Determines the task element that is currently dragged.
 * @param {number} index - The index of the dragged task.
 */
function startDragging(index) {
    currentDraggedElement = index;
}


/**
 * Enables dropping of an element to the board-column over which it is dragged.
 */
function allowDrop(event) {
    event.preventDefault();
}


/**
 * Changes the board-column of a task element and [updates the column containers]{@link renderBoardColumns}.
 * @param {string} boardColumn - The target column.
 */
async function moveTo(boardColumn) {
    activeUser.tasks[currentDraggedElement].boardColumn = boardColumn;
    renderBoardColumns();
    removeHighlight(boardColumn);
    saveUserData();
}


/**
 * Highlights a board-column container when an element is dragged over, if the dragged element is not contained.
 * @param {string} boardColumn - The column to be highlighted.
 */
function highlight(boardColumn) {
    if (activeUser.tasks[currentDraggedElement].boardColumn !== boardColumn)
        document.getElementById(boardColumn).classList.add('drag-area-highlight');
}


/**
 * Removes the highlight effect of a board-column container.
 * @param {string} boardColumn - The column to be unhighlighted.
 */
function removeHighlight(boardColumn) {
    document.getElementById(boardColumn).classList.remove('drag-area-highlight');
}


/*--------------------------------------------------
Drag and Drop Mobile
---------------------------------------------------*/
let initialTouchY = 0;
let isDragging = false;
let dragTimeout;


/**
 * Sets up EventListeners to enable drag and drop on mobile devices via touch.
 */
function enableMobileDragAndDrop() {
    activeUser.tasks.forEach(task => {
        const taskIndex = activeUser.tasks.indexOf(task);
        const taskElement = document.getElementById(`task-${taskIndex}`);

        taskElement.addEventListener('touchstart', event => handleTouchStart(task, event));
        taskElement.addEventListener('touchmove', event => handleTouchMove(task, event), { passive: false });
        taskElement.addEventListener('touchend', event => handleTouchEnd(task, event));
    });
}


/** 
 * Helper function to handle the touchstart event and mark the taskElement as being dragged.
 * @param {object} task - The task whose element is dragged.
 * @param {Event} event - The touchstart event.
 */
function handleTouchStart(task, event) {
    const taskIndex = activeUser.tasks.indexOf(task);
    const taskElement = document.getElementById(`task-${taskIndex}`);

    dragTimeout = setTimeout(() => {
        taskElement.classList.add('task-ondrag');
        setCoordinatesBasedOnTouch(taskElement, event);
        startDragging(taskIndex)
        isDragging = true;
    }, 100);
}


/** 
 * Helper function to assign new coordinates to a taskElement based on a touch event.
 * @param {HTMLElement} taskElement - The touched task element.
 * @param {Event} event - The touch event.
 */
function setCoordinatesBasedOnTouch(taskElement, event) {
    let touchLocation = event.targetTouches[0];
    taskElement.style.left = touchLocation.pageX - 0.5 * getTaskWidthOnDrag() + 'px';
    taskElement.style.top = touchLocation.pageY - 100 + 'px';
}


/** 
 * Helper function to handle the touchmove event and mark the taskElement as being dragged.
 * @param {object} task - The task whose element is dragged.
 * @param {Event} event - The touchmove event.
 */
function handleTouchMove(task, event) {
    const taskIndex = activeUser.tasks.indexOf(task);
    const taskElement = document.getElementById(`task-${taskIndex}`);

    if (isDragging) {
        event.preventDefault(); // prevent scrolling on the page while dragging
        taskElement.classList.add('task-ondrag');
        handleScrolling(event);
        setCoordinatesBasedOnTouch(taskElement, event);
        setAndHighlightDropTarget(taskElement);
    }
    else {
        clearTimeout(dragTimeout);
    }
}


/** 
 * Helper function to higlight a possible drop target (a board-column) under the current drag position.
 * @param {HTMLElement} taskElement - The dragged task element.
 */
function setAndHighlightDropTarget(taskElement) {
    let left = parseInt(taskElement.style.left) + 0.5 * getTaskWidthOnDrag();
    let top = parseInt(taskElement.style.top) + 100;
    let dropTarget = findDropTarget(left, top);

    if (dropTarget) {
        let boardColumn = dropTarget.id;
        highlight(boardColumn);
        taskElement.classList.add('task-ondrag-over-droptarget');
    }
    else {
        removeHighlight('board-column-todo');
        removeHighlight('board-column-progress');
        removeHighlight('board-column-feedback');
        removeHighlight('board-column-done');
        taskElement.classList.remove('task-ondrag-over-droptarget');
    }
}


/** 
 * Helper function to evoke scrolling when a dragged element reaches the top or bottom of the 'main'-container.
 * @param {Event} event - The touch event.
 */
function handleScrolling(event) {
    const scrollAmount = 5;
    const scrollContainer = document.getElementById('main');
    let touchLocation = event.targetTouches[0];
    let currentTouchY = touchLocation.pageY;
    const containerTop = scrollContainer.getBoundingClientRect().top;
    const containerHeight = scrollContainer.clientHeight;
    const scrollThreshold = 100;

    if (currentTouchY < containerTop + scrollThreshold && currentTouchY < initialTouchY) {
        scrollContainer.scrollTop -= scrollAmount; // Scroll up
    } else if (currentTouchY > containerTop + containerHeight - scrollThreshold && currentTouchY > initialTouchY) {
        scrollContainer.scrollTop += scrollAmount; // Scroll down
    }

    initialTouchY = currentTouchY;
}


/** 
 * Helper function to find a drop target element under the given coordinates
 * @param {number} x - The given x coordinate.
 * @param {number} y - The given y coordinate.
 * @returns {HTMLElement} An element that contains the class 'drop-target-mobile' if one exists.
 */
function findDropTarget(x, y) {
    let elements = document.elementsFromPoint(x, y);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('drop-target-mobile')) {
            return elements[i];
        }
    }
    return null;
}


/** 
 * Helper function to get the width of a currently dragged task card.
 * @returns {number} The calulated width.
 */
function getTaskWidthOnDrag() {
    let widthInPercent = 16;
    if (screenWidthIsAtMost('900px')) {
        widthInPercent = 80;
    }
    else if (screenWidthIsAtMost('1100px')) {
        widthInPercent = 45;
    }
    return Math.round(window.innerWidth * widthInPercent / 100);
}


/**
 * Helper function to handle the touchend event and drop the corresponding taskElement. 
 * It records the position of the touch when released (this will be the drop position).
 * @param {object} task - The task whose element is dropped.
 * @param {Event} event - The touchend event.
 */
async function handleTouchEnd(task, event) {
    const taskIndex = activeUser.tasks.indexOf(task);
    const taskElement = document.getElementById(`task-${taskIndex}`);

    if (isDragging) {
        isDragging = false;
        let left = parseInt(taskElement.style.left) + 0.5 * getTaskWidthOnDrag();
        let top = parseInt(taskElement.style.top) + 100;
        let dropTarget = findDropTarget(left, top);

        if (dropTarget) {
            let boardColumn = dropTarget.id;
            await moveTo(boardColumn);
        }
        else {
            taskElement.classList.remove('task-ondrag');
            taskElement.classList.remove('task-ondrag-over-droptarget'); // in if-case above: this reset is done automatically
        }
    }
    else {
        clearTimeout(dragTimeout);
    }
}