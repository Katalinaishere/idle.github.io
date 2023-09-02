// JavaScript for Time Tracking and To-Do List

// Variables for time tracking
let startTime = null;
let isTracking = false;
let elapsedTime = 0;

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
    }
}

// Function to update the timer display
function updateTimer() {
    const timerDisplay = document.getElementById("timer");
    setInterval(() => {
        if (isTracking) {
            elapsedTime = Date.now() - startTime;
        }
        const formattedTime = formatTime(elapsedTime);
        timerDisplay.textContent = formattedTime;
    }, 1000);
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
        const listItem = document.createElement("div");
        listItem.className = "todo-item";
        listItem.innerHTML = `
            <span>${task.text}</span>
            <div class="actions">
                <button onclick="completeTask(${i})">Complete</button>
                <button onclick="deleteTask(${i})">Delete</button>
            </div>
        `;
        if (task.completed) {
            listItem.classList.add("completed");
        }
        todoListContainer.appendChild(listItem);
    }
}

// Function to complete a task
function completeTask(index) {
    todoList[index].completed = true;
    displayTodoList();
}

// Function to delete a task
function deleteTask(index) {
    todoList.splice(index, 1);
    displayTodoList();
}

// Initialize the timer and to-do list display
updateTimer();
displayTodoList();

