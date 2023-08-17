let timeOfDay;


/**
 * Initializes the summary site by loading user data, initializing header navigation and render greeting and task stats.
 */
async function initSummary() {
  await initHeaderNav();
  await loadUserData();
  setActiveUser();
  setCategories();
  activateNavSection('nav-summary');
  renderGreeting();
  renderNumbers();
}


/** Generates time of day. */
function renderTimeOfDay() {
  let date = new Date;
  let hours = date.getHours();
  if (hours >= 7 && hours <= 13) {
    timeOfDay = 'Good morning';
  } else if (hours >= 13 && hours <= 18) {
    timeOfDay = 'Good afternoon';
  } else if (hours >= 18 && hours <= 22) {
    timeOfDay = 'Good evening';
  }
  else if (hours >= 22 && hours <= 24 || hours >= 0 && hours <= 7) {
    timeOfDay = 'Good night';
  }
}


/** Generates greetings for user. */
async function renderGreeting() {
  let greetings = document.getElementById('summary-infos-greeting');
  let mobileGreeting = document.getElementById('mobile-overlay');

  renderTimeOfDay();
  greetings.innerHTML = '';
  mobileGreeting.innerHTML = '';

  if (loggedInAsGuest()) {
    generateHTMLGreetingGuest(greetings, mobileGreeting, timeOfDay)
  } else {
    generateHTMLGreetingUser(greetings, mobileGreeting, currentUser, timeOfDay)
  }
}


/** Fills summary stats. */
function renderNumbers() {
  document.getElementById('summary-infos-tasks-card-board').innerHTML = activeUser.tasks.length;
  document.getElementById('summary-infos-tasks-card-progress').innerHTML = getNumberOfTasksInBoardColumn('board-column-progress');
  document.getElementById('summary-infos-tasks-card-feedback').innerHTML = getNumberOfTasksInBoardColumn('board-column-feedback');
  document.getElementById('summary-infos-tasks-progress-card-todo-amount').innerHTML = getNumberOfTasksInBoardColumn('board-column-todo');
  document.getElementById('summary-infos-tasks-progress-card-Done-amount').innerHTML = getNumberOfTasksInBoardColumn('board-column-done');
  document.getElementById('number-of-urgent-tasks').innerHTML = getNumberOfUrgentTasks();

  renderUpcomingDeadline()
}


/**
 * Counts all tasks in columns.
 * @param {string} columnID 
 */
function getNumberOfTasksInBoardColumn(columnID) {
  let tasksInProgress = activeUser.tasks.filter(task =>
    task.boardColumn === columnID
  );
  return tasksInProgress.length;
}


/** Counts all urgent tasks. */
function getNumberOfUrgentTasks() {
  let urgentTasks = activeUser.tasks.filter(task =>
    task.prio === 2
  );
  return urgentTasks.length;
}


/** Renders upcoming deadline date. */
function renderUpcomingDeadline() {
  let urgentTasks = activeUser.tasks.filter(task =>
    task.prio === 2
  );

  if (urgentTasks.length) {
    let urgentDates = [];
    urgentTasks.forEach(task => urgentDates.push(task.dueDate))
    urgentDates.sort();
    document.getElementById('deadline-time').innerHTML = urgentDates[0];
  }
}