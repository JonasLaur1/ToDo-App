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

    const error = document.getElementById("error");
    if (text.trim() === "") {
        error.textContent = "Please write your task";
        error.style.color = "red";
        return;
    }

    error.textContent = "";
    const ul = document.getElementById("list");
    const li = document.createElement("li");
    li.classList.add("task-item");

    const taskCheckbox = document.createElement("input");
    taskCheckbox.classList.add("task-checkbox");
    taskCheckbox.setAttribute("type", "checkbox");
    taskCheckbox.checked = checked;

    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = text;

    if (checked) {
        li.classList.add('completed-task');
        taskText.classList.add('completed-task');
    }

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
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
        taskText.classList.toggle('completed-task', taskCheckbox.checked);
        saveTasks();
    });

    document.getElementById("task-text").value = "";
    saveTasks();
}

function removeAllTasks() {
    const list = document.getElementById("list");
    list.innerHTML = "";
    saveTasks();
}

function removeCompletedTasks() {
    const tasks = Array.from(document.getElementsByClassName("task-checkbox"));
    tasks.forEach(task => {
        if (task.checked) {
            const li = task.closest("li");
            if (li) {
                li.remove();
            }
        }
    });
    saveTasks();
}

document.getElementById("add-task").onclick = function() {
    addTask();
}

document.getElementById("remove-all").onclick = function() {
    removeAllTasks();
}

document.getElementById("remove-completed").onclick = function() {
    removeCompletedTasks();
}
