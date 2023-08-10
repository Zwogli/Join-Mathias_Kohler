/**Generate input field new category */
function generateHTMLNewCategory() {
	let selectField = document.getElementById('category-selection');
	let imgDropdown = document.getElementById('category-img-dropdown');

	imgDropdown.classList.add('d-none');

	selectField.innerHTML = /*html*/`
  <input id="new-category" class="new-category select-task-category paddings" type="name" placeholder="New category name">
  <label for="new-category" id="color-selected" class="color-cicle img-20"></label>
  <div class="selection-img selection-img-activ">
    <img onclick="cancelSection('category')" class="img-24 px-5" src="../img/clear.svg" alt="cancel">
    <img onclick="saveNewCategory('category')" class="border img-24 px-5" src="../img/check-black.svg" alt="check">
  </div>
  `;
}

/**Generate Section Category after cancel input */
function generateHTMLSelectCategory() {
	let selectField = document.getElementById('category-selection');
	selectField.innerHTML = /*html*/`

  <div class="select-task-category-img img-44">
    <img id="category-img-dropdown" src="../img/dropdown.svg" alt="drop down">
  </div>

  <div class="select-task-category" id="currentItem">

    <div id="selected-element" class="d-flex gap-10 paddings" onclick="toggleActive('category-selection');">
      Select task category
    </div>
  </div>

  <div class="addtask-gendrop-scroll">

    <div class="addtask-item paddings" onclick="newInput('category');">
      New category
    </div>

    <div id="dropNum(category)"></div>

  `;
}

/**Generate Section Assign to with checked checkbox */
function generateHTMLNewAssignToChecked(i, contact){
  let contactList = document.getElementById('apicontact-list');

  contactList.innerHTML += /*html*/`
            <label for="contact-checkbox${i}" class="addtask-item contact-list paddings pos-re" onclick="checkboxSwitch(id)">${contact}
                <input id="contact-checkbox${i}" type="checkbox" checked>
            </label>
            `;
}

/**Generate Section Assign to without checked checkbox */
function generateHTMLNewAssignTo(i, contact){
  let contactList = document.getElementById('apicontact-list');

  contactList.innerHTML += /*html*/`
        <label for="contact-checkbox${i}" class="addtask-item contact-list paddings pos-re" onclick="checkboxSwitch(id)">${contact}
            <input id="contact-checkbox${i}" type="checkbox">
		</label>
        `;
}