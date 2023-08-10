/**Save & load subtasks */
function initSubtask() {
    let inputValue = document.getElementById('subtask');
    subtasks.push({
        name: inputValue.value,
        done: false
    });
    inputValue.value = '';
    renderSubtaskArray();
}

/**Set checked Subtasks as "done" */
async function setCheckedSubtasksAsDone() {
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        if (document.getElementById(`subtask-checkbox${i}`).checked) {
            subtask.done = true;
        }
    }
}

/**Load Subtasks */
function renderSubtaskArray() {
    let subtaskList = document.getElementById("dropNum(subtask)");

    subtaskList.innerHTML = '';
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];

        subtaskList.innerHTML += /*html*/`
            <div>
                <input type="checkbox" name="" id="subtask-checkbox${i}">
                <label for="subtask-checkbox${i}">${subtask.name}</label>
            </div>
        `;
    }
}

/**Change subtask img*/
function setHTMLSubtaskImg() {
    document.getElementById('subtask-img-add').classList.add('d-none');
    document.getElementById('subtask-img-activ').classList.remove('d-none');
}

/**Reset subtask img*/
function removeHTMLSubtaskImg() {
    document.getElementById('subtask-img-add').classList.remove('d-none');
    document.getElementById('subtask-img-activ').classList.add('d-none');
    document.getElementById('subtask').value = '';
}