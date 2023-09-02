let timerInterval;
let timerRunning = false;
let hours = 0;
let minutes = 0;
let seconds = 0;

// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const todoList = document.getElementById('todo-list');
    const notes = document.getElementById('notes');

    // Toggle dark mode class on body
    body.classList.toggle('dark-mode');

    // Toggle dark mode class on specific elements
    header.classList.toggle('dark-mode');
    main.classList.toggle('dark-mode');
    todoList.classList.toggle('dark-mode');
    notes.classList.toggle('dark-mode');
}

// Check and set dark mode preference from local storage
function checkDarkModePreference() {
    const isDarkMode = localStorage.getItem('dark-mode');
    if (isDarkMode === 'true') {
        toggleDarkMode();
    }
}

// Save dark mode preference to local storage
function saveDarkModePreference() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
}

// Function to update the timer display
function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Function to start the timer
function startTimer() {
    if (!timerRunning) {
        timerInterval = setInterval(updateTimer, 1000);
        timerRunning = true;
    }
}

// Function to update the timer
function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    updateTimerDisplay();
}

// Function to stop the timer
function stopTimer() {
    if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
    }
}

// Function to reset the timer
function resetTimer() {
    stopTimer();
    hours = 0;
    minutes = 0;
    seconds = 0;
    updateTimerDisplay();
}

// Function to add a task to the to-do list
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return; // Don't add empty tasks
    }

    const taskList = document.getElementById('task-list');

    // Create a new list item for the task
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <button onclick="removeTask(this)">Remove</button>
    `;

    // Add the task to the list
    taskList.appendChild(taskItem);

    // Clear the task input
    taskInput.value = '';
}

// Function to remove a task from the to-do list
function removeTask(button) {
    const taskItem = button.parentElement;
    const taskList = taskItem.parentElement;
    taskList.removeChild(taskItem);
}

// Function to add a note
function addNote() {
    const noteInput = document.getElementById('note-input');
    const noteText = noteInput.value.trim();

    if (noteText === '') {
        return; // Don't add empty notes
    }

    const noteList = document.getElementById('note-list');

    // Create a new list item for the note
    const noteItem = document.createElement('li');
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    noteItem.innerHTML = `
        <span>${formattedDate}</span>
        <p>${noteText}</p>
    `;

    // Add the note to the list
    noteList.appendChild(noteItem);

    // Clear the note input
    noteInput.value = '';
}

// Event listener for dark mode toggle button
const darkModeToggleBtn = document.getElementById('dark-mode-toggle');
darkModeToggleBtn.addEventListener('click', () => {
    toggleDarkMode();
    saveDarkModePreference();
});

// Initialize dark mode preference and button text
checkDarkModePreference();
updateTimerDisplay();

