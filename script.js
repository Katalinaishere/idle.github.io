// JavaScript for Time Tracking and To-Do List

// Variables for time tracking
let startTime = null;
let isTracking = false;
let elapsedTime = 0;

// Variables for tracking history
const trackingHistory = [];

// Variables for to-do list
const todoList = [];
const todoListContainer = document.getElementById("todo-list");
const newTaskInput = document.getElementById("new-task-input");

// Function to start or stop time tracking
function toggleTimeTracking() {
    if (!isTracking) {
        startTime = Date.now() - elapsedTime;
        isTracking = true;
        document.getElementById("start-stop-button").textContent = "Stop";
        updateTimer();
    } else {
        isTracking = false;
        document.getElementById("start-stop-button").textContent = "Start";
        saveTrackedTime();
    }
}

// Function to reset the time tracker
function resetTimeTracking() {
    isTracking = false;
    elapsedTime = 0;
    document.getElementById("start-stop-button").textContent = "Start";
    updateTimer();
}

// Function to update the timer display
function updateTimer() {
    const timerDisplay = document.getElementById("timer");
    let intervalId; // Store the interval ID

    // Function to update the timer display
    function update() {
        if (isTracking) {
            elapsedTime = Date.now() - startTime;
        }
        const formattedTime = formatTime(elapsedTime);
        timerDisplay.textContent = formattedTime;
    }

    // Clear any existing interval and start a new one
    clearInterval(intervalId);
    intervalId = setInterval(update, 1000);

    // Call update immediately to display the current time
    update();
}

// Function to format time in HH:MM:SS format
function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes % 60).padStart(2, "0");
    const formattedSeconds = String(seconds % 60).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Function to save tracked time with a name
function saveTrackedTime() {
    const timeName = prompt("Enter a name for this tracked time:");
    if (timeName) {
        const trackedTime = { name: timeName, time: elapsedTime };
        trackingHistory.push(trackedTime);
        displayTrackingHistory();
        elapsedTime = 0;
    }
}

// Function to display tracking history
function displayTrackingHistory() {
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "";
    for (let i = 0; i < trackingHistory.length; i++) {
        const entry = trackingHistory[i];
        const listItem = document.createElement("li");
        listItem.textContent = `${entry.name}: ${formatTime(entry.time)}`;
        historyList.appendChild(listItem);
    }
}

// Function to add a task to the to-do list
function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText !== "") {
        const task = { text: taskText, completed: false };
        todoList.push(task);
        newTaskInput.value = "";
        displayTodoList();
    }
}

// Function to display the to-do list
function displayTodoList() {
    todoListContainer.innerHTML = "";
    for (let i = 0; i < todoList.length; i++) {
        const task = todoList[i];
        const listItem = document.createElement("li");
        listItem.textContent = task.text;
        todoListContainer.appendChild(listItem);
    }
}

// Initialize the timer, tracking history, and to-do list display
updateTimer();
displayTrackingHistory();
displayTodoList();


