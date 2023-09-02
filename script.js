// JavaScript for Time Tracking and To-Do List

// Variables for time tracking
let startTime = null;
let isTracking = false;
let elapsedTime = 0;

// Variables for tracking history
const trackingHistory = [];

// Variables for to-do list
const todoList = [];
const taskList = document.getElementById("task-list");
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

// (The rest of the functions remain the same as before)

// Initialize the timer, tracking history, and to-do list display
updateTimer();
displayTrackingHistory();
displayTodoList();


