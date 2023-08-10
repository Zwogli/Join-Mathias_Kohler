/**Render all contacts */
async function renderContacts() {
    sortContactsByName(activeUserContacts);
    
    let contactsArray = activeUser.contacts;
    let addTaskContactIndex = localStorage.getItem("addTaskContactIndex");

    for (let i = 0; i < contactsArray.length; i++) {
        const contact = contactsArray[i].name;

        if(addTaskContactIndex == i){
            generateHTMLNewAssignToChecked(i, contact);
            localStorage.setItem("addTaskContactIndex", undefined);
        }else{
            generateHTMLNewAssignTo(i, contact);
        }
    }
}

/**Save checked Contacts */
async function saveCheckedContacts() {
    let contactsArray = activeUser.contacts;

    for (let i = 0; i < contactsArray.length; i++) {
        const contact = contactsArray[i];
        if (document.getElementById(`contact-checkbox${i}`).checked) {
            contacts.push(contact);
        }
    }
}

function giveContactListId(params) {
    const idList = document.getElementById('apicontact-list');

    const childElements = idList.children;
    for (let index = 2; index <= childElements.length + 1; index++) {
        const currentElement = childElements[index - 2];
        currentElement.setAttribute('id', `contact-${index}`);
    }
}