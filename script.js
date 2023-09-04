
let timerInterval;
let timerRunning = false;
let hours = 0;
let minutes = 0;
let seconds = 0;
let timerHistory = [];
let taskIdCounter = 1;

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

// Function to save a time entry with a name
function saveTimeEntry() {
    const timerName = document.getElementById('timer-name').value.trim();
    if (timerName === '') {
        alert('Please enter a name for this time entry.');
        return;
    }

    const elapsedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    const timeEntry = {
        id: Date.now(),
        name: timerName,
        time: elapsedTime,
    };

    timerHistory.push(timeEntry);

     // Display the time entry in the history
    const timerHistoryList = document.getElementById('timer-history');
    const historyItem = document.createElement('li');
    historyItem.innerHTML = `<strong>${timerName}:</strong> ${elapsedTime}`;
    timerHistoryList.appendChild(historyItem);

    // Clear the name input
    document.getElementById('timer-name').value = '';

    // Reset the timer
    resetTimer();
}

// Function to create a task item with a checkbox
function createTaskItem(taskText) {
    const taskList = document.getElementById('task-list');

    // Create a new list item for the task with a checkbox
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <input type="checkbox" id="task-${taskIdCounter}">
        <label for="task-${taskIdCounter}">${taskText}</label>
        <button onclick="removeTask(this)">Remove</button>
    `;

    taskIdCounter++;

    // Add the task to the list
    taskList.appendChild(taskItem);
}

// Function to add a task to the to-do list
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return; // Don't add empty tasks
    }

    createTaskItem(taskText);

    // Clear the task input
    taskInput.value = '';
}

// Function to mark a task as completed
function toggleTaskCompletion(checkbox) {
    const taskText = checkbox.nextElementSibling;
    if (checkbox.checked) {
        taskText.style.textDecoration = 'line-through';
    } else {
        taskText.style.textDecoration = 'none';
    }
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

// Display the timer history on page load
function displayTimerHistory() {
    const timerHistoryList = document.getElementById('timer-history');

    // Clear existing entries
    timerHistoryList.innerHTML = '';

    // Add saved time entries
    for (const timeEntry of timerHistory) {
        const historyItem = document.createElement('li');
        historyItem.innerHTML = `<strong>${timeEntry.name}:</strong> ${timeEntry.time}`;
        timerHistoryList.appendChild(historyItem);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid'],
        events: [
            // Your event data here
            {
                title: 'Event 1',
                start: '2023-09-15'
            },
            {
                title: 'Event 2',
                start: '2023-09-20'
            }
            // Add more events as needed
        ]
    });

    calendar.render();
});

// Real time clock 
function updateClock (){
    const clock = document.getElementById('clock');
    const now = new Date(); 
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = '${hours}:${minutes}:${seconds}';
    clock.textContent = timeString;   
}
// Update the clock every second
setInterval(updateClock, 1000);

// Initialize dark mode preference and button text
checkDarkModePreference();
updateTimerDisplay();
displayTimerHistory();
updateClock(); // Initialize the clock
