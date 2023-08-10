let lastClickedImage = null;
let priority;

/**init onload functions */
async function initAddTask() {
    await initHeaderNav();
    activateNavSection('nav-addtask');
    await loadUserData();
    setActiveUser();
    setCategories();
    activeUserContacts = activeUser.contacts;
    setMinDate('date');
    renderCategory();
    await renderContacts()
    giveContactListId();
    media();
}

window.addEventListener('resize', media);
let minwidth = window.matchMedia('(min-width: 1300px)')

function media() {
    const imposter = document.getElementById("imposter");
    const amogus = document.getElementById("amogus");

    if (minwidth.matches) {
        moveContent("imposter");
    } else {
        moveContent("amogus");
    }
}

function moveContent(destination) {
    const container = document.getElementById(destination);

    const prio = document.getElementById("addtask-prio");
    const duedate = document.getElementById("addtask-duedate");
    const subtasks = document.getElementById("addtask-subtasks");

    container.appendChild(prio);
    container.appendChild(duedate);
    container.appendChild(subtasks);
}

function setActiveButton(buttonId) {
    const buttons = [
        { id: "addtask-prio-bnt-urgent", img: "./assets/img/prio-urgent.svg", activeImg: "./assets/img/urgent-white.svg" },
        { id: "addtask-prio-bnt-medium", img: "./assets/img/prio-medium.svg", activeImg: "./assets/img/medium-white.svg" },
        { id: "addtask-prio-bnt-low", img: "./assets/img/prio-low.svg", activeImg: "./assets/img/low-white.svg" },
    ];
    const selectedButton = buttons.find((button) => button.id === buttons[buttonId].id);
    priority = buttonId;

    buttons.forEach((button) => {
        const element = document.getElementById(button.id);
        const imgElement = document.getElementById(`${button.id}-img`);

        if (button.id !== selectedButton.id) {
            element.classList.remove("active");
            imgElement.src = button.img;
        } else {
            element.classList.toggle("active");
            if (element.classList.contains("active")) {
                lastClickedImage = imgElement.src;
                imgElement.src = button.activeImg;
            } else {
                imgElement.src = lastClickedImage || button.img;
            }
        }
    });
}

function toggleActive(dropMaster) {
    if (dropMaster === 'category-selection') {
        document.getElementById("category-selection").classList.toggle("collapsed");
        document.getElementById('color-pick').classList.add('d-none');

    } else if (dropMaster === 'mail-selection') {
        document.getElementById("mail-selection").classList.toggle("collapsed");
    }
}

async function keyframe() {
    document.getElementById("addtask-create-task").classList.remove("d-none");
    await new Promise(resolve => setTimeout(resolve, 1000));
    // console.log("Delayed for 1 second.");
    document.getElementById("addtask-create-task").classList.add("d-none");
}


/**Save values into backend */
async function addTask() {
    await saveCheckedContacts();
    await setCheckedSubtasksAsDone();
    const newTask = {
        "title": document.getElementById('task-title').value,
        "description": document.getElementById('task-description').value,
        "dueDate": document.getElementById('date').value,
        "prio": priority,
        "category": category[selectCategory],
        "assignedTo": contacts,
        "subtasks": subtasks,
        "boardColumn": "board-column-todo"
    };
    const prioIsWhat = document.querySelector('#addtask-prio .addtask-prio-bnt.active');
    const title = document.getElementById('task-title');
    const description = document.getElementById('task-description');
    const dueDate = document.getElementById('date');
    
    setInputFildsFrame();
    if (
        category[selectCategory] &&
        prioIsWhat !== null && prioIsWhat !== undefined &&
        title.value.trim() !== '' &&
        description.value.trim() !== '' &&
        dueDate.value.trim() !== ''
    ) {
        await keyframe();
        activeUser.tasks.push(newTask);
        await saveUserData();
        linkToUrl('board.html');
    }
}

/**Set red Frame for input Fields */
function setInputFildsFrame(){
    setCategoryInputFrame();
    setBntPrioInputFrame();
    setTitleInputFrame();
    setDescriptionInputFrame();
    setDueDateInputFrame();
}

/**Check and set bnt frame */
function setBntPrioInputFrame(){
    const prioIsWhat = document.querySelector('#addtask-prio .addtask-prio-bnt.active');

   if (prioIsWhat === null || prioIsWhat === undefined) {
        document.getElementById('addtask-prio-whichBnt').style.border = "1px solid #ff0000";
        document.getElementById('addtask-prio-whichBnt').style.border.radius = "10px";
    } else {
        document.getElementById('addtask-prio-whichBnt').style.border = "1px solid #ffffff";
    }
}

/**Check and set title frame */
function setTitleInputFrame(){
    const title = document.getElementById('task-title');

    if (!title.value.trim()) {
        title.style.border = "1px solid #ff0000";
    } else {
        title.style.border = "1px solid #FFFFFF";
    }
}

/**Check and set discription field */
function setDescriptionInputFrame(){
    const description = document.getElementById('task-description');

    if (!description.value.trim()) {
        description.style.border = "1px solid #ff0000";
    } else {
        description.style.border = "1px solid #FFFFFF";
    }
}

/**Check and set due dtae frame */
function setDueDateInputFrame(){
    const dueDate = document.getElementById('date');

    if (!dueDate.value.trim()) {
        dueDate.style.border = "1px solid #ff0000";
    } else {
        dueDate.style.border = "1px solid #FFFFFF";
    }
}

/**Render input field for new Catergory */
function newInput(section) {
    if (section === 'category') {
        generateHTMLNewCategory();
        document.getElementById('color-pick').classList.remove('d-none');
        document.getElementById('category-selection').classList.add('height-46');
    }
    else if (section === 'new-mail') {
        linkToUrl('contacts.html');
    }
    else if (section === 'subtask') {
        setHTMLSubtaskImg();
    }
}

/**Cancel input and load drop down list */
function cancelSection(section) {
    if (section === 'category') {
        document.getElementById('category-selection').classList.remove('height-46');
        resetCetegory('category');
        renderCategory();
    } else if (section === 'new-mail') {
        generateHTMLSelectMail();
    } else if (section === 'subtask') {
        removeHTMLSubtaskImg();
    }
}

function checkboxSwitch(id) {

}