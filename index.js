function addTask(){
    var text = document.getElementById("task-text").value;
    var error = document.getElementById("error");
    if(text === "")
    {
        error.textContent = "Please write your task";
        error.style.color = "red";  
        return;
    }

    error.innerHTML = "";
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.classList.add("task-text");
    
    var taskCheckbox = document.createElement("input");
    taskCheckbox.classList.add("task-checkbox");
    taskCheckbox.setAttribute("type", "checkbox")

    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "delete-button");
    deleteButton.innerHTML = '<img src="trashcan.png" />';

    li.appendChild(taskCheckbox);
    li.appendChild(document.createTextNode(text));
    li.appendChild(deleteButton);
    ul.appendChild(li);

    deleteButton.addEventListener('click', function(event) {
        event.target.closest('li').remove();
    });

    document.getElementById("task-text").value = "";
}

function removeAllTasks(){
    list = document.getElementById("list");
    list.innerHTML = "";
}

function removeCompletedTasks(){
    var tasks = Array.from(document.getElementsByClassName("task-checkbox"));
    for(var i = 0; i < tasks.length; i++){
        if(tasks[i].checked){
            var li = tasks[i].closest("li");
            if(li){
                li.remove();
            }
        }
    }
}

addButton = document.getElementById("add-task");
addButton.onclick = function(){
    addTask();
}

removeAllButton = document.getElementById("remove-all");
removeAllButton.onclick = function(){
    removeAllTasks();
}

removeCompleted = document.getElementById("remove-completed");
removeCompleted.onclick = function(){
    removeCompletedTasks();
}