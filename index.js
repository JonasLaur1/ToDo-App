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
    var image = document.createElement("img");
    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", "delete-button");



    //taskCheckbox = document.createElement("li");
    //taskCheckbox.setAttribute("type", "checkbox")



    deleteButton.innerHTML = '<img src="icons8-x-48.png" />';
    li.appendChild(document.createTextNode(text));
    li.appendChild(deleteButton);
    ul.appendChild(li);

    deleteButton.addEventListener('click', function(event) {
        event.target.closest('li').remove();
    });
}

button = document.getElementById("add-task");

button.onclick = function(){
    addTask();
}
