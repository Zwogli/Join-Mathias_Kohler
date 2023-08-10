/**Check and set input field */
function setCategoryInputFrame(){
  const categorySelection = document.getElementById('category-selection');

  if (!category[selectCategory]) {
      categorySelection.style.border = "1px solid #ff0000";
  } else {
      categorySelection.style.border = "1px solid #FFFFFF";
  }
}

/** Manage drop down bar
 * @param {Element} i - category.length
 */
function selectedCategory(i) {
  let showSelectedCategory = document.getElementById('selected-element');

  selectCategory = i

  showSelectedCategory.innerHTML = `
      <div>${category[i].name}</div>
      <div class="addtask-item-color color-cicle img-20 bg-${category[i].color}"></div>
  `;
  document.getElementById("category-selection").classList.remove("collapsed");
  document.getElementById('color-pick').classList.add('d-none');
}

/**Load all categorys with color */
function renderCategory() {
  let categoryList = document.getElementById('dropNum(category)');

  for (let i = 0; i < category.length; i++) {
      let categoryElement = category[i];

      categoryList.innerHTML += /*html*/`
      <div onclick="selectedCategory(${i})" class="addtask-item paddings addtask-id">
          <div class="addtask-item-color color-cicle img-20 bg-${categoryElement.color}"></div>
          ${categoryElement.name}
  </div>
      `;
  }
}

/**Save new category */
async function saveNewCategory(section) {
  if (section === 'category') {
      let inputValue = document.getElementById('new-category');
      if (categoryColorPick !== undefined && inputValue.value !== '') {
          category.push({ name: inputValue.value, color: categoryColorPick });
          document.getElementById('category-selection').classList.remove('height-46');
          resetCetegory(inputValue);
          renderCategory();
      }
  }
  else if (section === 'subtask') {
      initSubtask();
  }
}

/**After save new category, reset the selection */
function resetCetegory(inputValue) {
  let editColor = document.getElementById('color-selected');
  let editContainer = document.getElementById('category-selection');

  document.getElementById('color-pick').classList.add('d-none');
  editColor.classList.remove(`bg-${categoryColorPick}`);
  editContainer.classList.remove('d-flex');
  editContainer.classList.remove('a-item');
  inputValue.value = '';
  categoryColorPick = undefined;
  generateHTMLSelectCategory();
}

/**Color pick category */
function addColorCategory(id) {
  let editContainer = document.getElementById('category-selection');
  let editColor = document.getElementById('color-selected');

  editContainer.classList.add('d-flex');
  editContainer.classList.add('a-item');

  categoryColorPick = id;
  editColor.classList.add(`bg-${id}`);
  document.getElementById('color-pick').classList.add('d-none');
}