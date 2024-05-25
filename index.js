document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#list li').forEach(task => {
        const text = task.querySelector('.task-text').textContent;
        const checked = task.querySelector('.task-checkbox').checked;
        tasks.push({ text, checked });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.checked));
}

function addTask(text = null, checked = false) {
    if (text === null) {
        text = document.getElementById("task-text").value;
    }

    var error = document.getElementById("error");
    if (text === "") {
        error.textContent = "Please write your task";
        error.style.color = "red";
        return;
    }

    error.innerHTML = "";
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.classList.add("task-item");

    var taskCheckbox = document.createElement("input");
    taskCheckbox.classList.add("task-checkbox");
    taskCheckbox.setAttribute("type", "checkbox");
    taskCheckbox.checked = checked;

    var taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = text;

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "delete-button");
    deleteButton.innerHTML = '<img src="trashcan.png" alt="Delete" />';

    li.appendChild(taskCheckbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);
    ul.appendChild(li);

    deleteButton.addEventListener('click', function(event) {
        event.target.closest('li').remove();
        saveTasks();
    });

    taskCheckbox.addEventListener('change', function(event) {
        li.classList.toggle('completed-task', taskCheckbox.checked);
        saveTasks();
    });

    document.getElementById("task-text").value = "";
    saveTasks();
}

function removeAllTasks() {
    var list = document.getElementById("list");
    list.innerHTML = "";
    saveTasks();
}

function removeCompletedTasks() {
    var tasks = Array.from(document.getElementsByClassName("task-checkbox"));
    tasks.forEach(task => {
        if (task.checked) {
            var li = task.closest("li");
            if (li) {
                li.remove();
            }
        }
    });
    saveTasks();
}

var addButton = document.getElementById("add-task");
addButton.onclick = function() {
    addTask();
}

var removeAllButton = document.getElementById("remove-all");
removeAllButton.onclick = function() {
    removeAllTasks();
}

var removeCompletedButton = document.getElementById("remove-completed");
removeCompletedButton.onclick = function() {
    removeCompletedTasks();
}
