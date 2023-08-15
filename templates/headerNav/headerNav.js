menuIsOpen = false;

/**load async w3-school template loader */
async function initHeaderNav() {
    await includeHTML();
}

/**Load HTML-templates */
async function includeHTML() {
    // select all Elements with the same name "w3-include-html, [] = query ger.: abfrage"
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        // read value from attribute
        file = element.getAttribute("w3-include-html");   // includes/header.html
        let resp = await fetch(file);   // load file ger.: Datei
        // security query
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/** Toggles slide menu overlay. */
function toggleMenu() {
    if (menuIsOpen) closeMenu();
    else openMenu();
}

/** Opens slide menu overlay. */
function openMenu() {
    showElement('mobile-slide-menu-container');
    showOverlay('mobile-slide-menu');
    menuIsOpen = true;
}

/** Closes slide menu overlay. */
function closeMenu() {
    hideOverlay('mobile-slide-menu');
    setTimeout(() => {
        removeElement('mobile-slide-menu-container');
    }, 220);
    menuIsOpen = false;
}

/**
 * Toggles following Overlays legal, help, menu 
 * @param {string} className - fill id legal, help
 */
function toggleOverlays(className) {
    toggleElement(className);
    checkOverlays(className);
}

/**
 * Check overlays for closing or opening.
 * @param {string} className - id legal, help
 * @param {string} headerMenu - call id
 */
function checkOverlays(className) {
    if (className == 'help') {
        toggleElement('header-help-icon');
        removeElement(`legal`);
    }
    if (className == 'legal') {
        showElement('header-help-icon');
        removeElement(`help`);
    }
    if (menuIsOpen) {
        closeMenu();
    }
}