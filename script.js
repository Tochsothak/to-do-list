// Select Elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// console.log(todoForm, todoInput, todoList);

// Add task to the  list
todoForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const taskText = todoInput.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        todoInput.value = ""; //Clear input
    } else {
        alert("Please enter a task!");
    }
});

//Add task function
function addTask(taskText) {
    //create list item
    const li = document.createElement("li");
    li.className = "todo-item";

    // Add the task  text
    li.innerHTML = `<span>${taskText}</span>
    <div>
    <button class="complete-btn">Complete</button>
    <button class="delete-btn">Delete</button>
    </div>`;

    // Append to list
    todoList.appendChild(li);

    // Add event listener to delete button
    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function() {
        todoList.removeChild(li);
    });

    //complete task
    li.querySelector(".complete-btn").addEventListener("click", function() {
        li.classList.toggle("completed");
    });
}

// Save task to local storage
function SaveTaskToLocalStorage() {
    const tasks = [];
    document.querySelectorAll(".todo-item span").forEach((task) => {
        tasks.push({
            text: task.innerText,
            completed: task.parentElement.classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load task from local storage
function loadTaskFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        addTask(task.text);
        if (task.completed) {
            todoList.lastChild.classList.add("completed");
        }
    });
}

// Add saving task whenever a new task is Added or removed
todoForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const taskText = todoInput.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        todoInput.value = "";
        SaveTaskToLocalStorage(); // save to localStorage
    }
});

// Add task deletion handling
todoList.addEventListener("click", function(event) {
    if (event.target.classLis.contains("delete-btn")) {
        event.target.parentElement.parentElement.remove();
        SaveTaskToLocalStorage(); // Update localStorage
    }
});

//Load tasks when the page Loads
document.addEventListener("DOMContentLoaded", loadTaskFromLocalStorage);