const taskList = document.getElementById("taskList");

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTask(task.text, task.completed));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    createTask(text, false);
    saveTasks();
    input.value = "";
}

function createTask(text, completed) {
    const li = document.createElement("li");
    li.textContent = text;

    if (completed) li.classList.add("completed");

    li.onclick = () => {
        li.classList.toggle("completed");
        saveTasks();
    };

    const del = document.createElement("span");
    del.textContent = "❌";
    del.className = "delete-btn";
    del.onclick = (e) => {
        e.stopPropagation();
        li.remove();
        saveTasks();
    };

    li.appendChild(del);
    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

loadTasks();
