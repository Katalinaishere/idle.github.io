
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


function updateClockAndDate() {
    const clock = document.getElementById('clock');
    const currentDate = document.getElementById('current-date');

    const now = new Date();

    // Update the time
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    clock.textContent = timeString;

    // Update the date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);
    currentDate.textContent = dateString;
}

// Update the clock and date every second
setInterval(updateClockAndDate, 1000);

document.addEventListener('DOMContentLoaded', function () {
    const calendarBody = document.getElementById('calendar-body');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const currentMonthYear = document.getElementById('current-month-year');

     // Get references to the event-related elements
    const eventList = document.getElementById('event-list');
    const eventsForDate = document.getElementById('events-for-date');

    // Function to handle date selection and display events
    function handleDateSelection(date) {
        // Clear existing events
        eventsForDate.innerHTML = '';

        // Filter events for the selected date
        const selectedDate = new Date(date);
        const selectedDateString = selectedDate.toDateString();

        const filteredEvents = timerHistory.filter((event) => {
            return event.date.toDateString() === selectedDateString;
        });

        if (filteredEvents.length === 0) {
            eventsForDate.innerHTML = '<p>No events for this date.</p>';
        } else {
            filteredEvents.forEach((event) => {
                const eventItem = document.createElement('li');
                eventItem.textContent = `${event.name} - ${event.time}`;
                eventsForDate.appendChild(eventItem);
            });
        }
    }

    // Event listener for clicking on a date cell
    calendarBody.addEventListener('click', function (event) {
        const target = event.target;

        if (target.classList.contains('fc-day')) {
            const date = new Date(target.getAttribute('data-date'));
            handleDateSelection(date);
        }
    });


    // Function to create a calendar for the given month and year
    function createCalendar(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(1 - firstDay.getDay());
        const endDate = new Date(lastDay);
        endDate.setDate(lastDay.getDate() + 6 - lastDay.getDay());

        const days = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            days.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        const calendarDays = days.map((date) => {
            const dayElement = document.createElement('td');
            dayElement.textContent = date.getDate();
            return dayElement;
        });

        calendarBody.innerHTML = '';

        while (calendarDays.length > 0) {
            const weekRow = document.createElement('tr');
            weekRow.classList.add('calendar-week');
            for (let i = 0; i < 7; i++) {
                if (calendarDays.length > 0) {
                    weekRow.appendChild(calendarDays.shift());
                } else {
                    const emptyDay = document.createElement('td');
                    weekRow.appendChild(emptyDay);
                }
            }
            calendarBody.appendChild(weekRow);
        }

        currentMonthYear.textContent = `${new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(firstDay)}`;
    }
     // Function to save a time entry with a name and date
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
            date: new Date(), // Store the current date
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

        // Update events for the selected date
        handleDateSelection(timeEntry.date);
    }

    // Get the current date
    const currentDate = new Date();

    // Initial calendar setup
    createCalendar(currentDate.getFullYear(), currentDate.getMonth());

    // Event listener for previous month button
    prevMonthButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        createCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });

    // Event listener for next month button
    nextMonthButton.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        createCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });
});



// Call the function on page load to initialize the clock and date
updateClockAndDate();


// Initialize dark mode preference and button text
checkDarkModePreference();
updateTimerDisplay();
displayTimerHistory();
