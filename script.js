const formValue = document.getElementById("form");
const saveTask = document.getElementById("storeData");
let tasks = [];

formValue.addEventListener("submit", (e) => {
    e.preventDefault();

    const FirstName = document.getElementById("FirstName").value;
    const LastName = document.getElementById("LastName").value;

    if (FirstName === "" || LastName === "") {
        return alert("Please fill in the details");
    }

    const task = { FirstName, LastName };
    tasks.push(task);
    saveTasksToLocalStorage();

    const myDiv = document.createElement("div");
    myDiv.classList.add("saveTask");

    const myContent = document.createElement("div");
    myContent.classList.add("content");

    const myFname = document.createElement("input");
    myFname.setAttribute("type", "text");
    myFname.classList.add("text");
    myFname.value = FirstName;
    myFname.readOnly = true;

    const myLname = document.createElement("input");
    myLname.setAttribute("type", "text");
    myLname.classList.add("text");
    myLname.value = LastName;
    myLname.readOnly = true;

    const myAction = document.createElement("div");
    myAction.classList.add("action");

    const myEdit = document.createElement("button");
    myEdit.classList.add("editItem");
    myEdit.textContent = "Edit";
    myEdit.addEventListener("click", () => {
        if (myFname.readOnly) {
            myFname.readOnly = false;
            myLname.readOnly = false;
            myEdit.textContent = 'Update';
            myEdit.style.color = "white";
        } else {
            if (myFname.value === "") {
                return alert("Please fill in the details");
            } else {
                myEdit.textContent = "Edit";
                myFname.readOnly = true;
                myLname.readOnly = true;
                myEdit.style.color = "black";
                updateTaskInLocalStorage(task, myFname.value, myLname.value);
            }
        }
    });

    const myDelete = document.createElement("button");
    myDelete.classList.add("deleteItem");
    myDelete.textContent = "Delete";
    myDelete.addEventListener("click", () => {
        myDiv.remove();
        deleteTaskFromLocalStorage(task);
    });

    myDiv.appendChild(myContent);
    myContent.appendChild(myFname);
    myContent.appendChild(myLname);
    saveTask.appendChild(myDiv);

    myContent.appendChild(myAction);
    myAction.appendChild(myEdit);
    myAction.appendChild(myDelete);

    document.getElementById("FirstName").value = "";
    document.getElementById("LastName").value = "";
});

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasksFromStorage = JSON.parse(localStorage.getItem('tasks'));
    if (tasksFromStorage) {
        tasks = tasksFromStorage;
        tasks.forEach(task => {
            const myDiv = document.createElement("div");
            myDiv.classList.add("saveTask");

            const myContent = document.createElement("div");
            myContent.classList.add("content");

            const myFname = document.createElement("input");
            myFname.setAttribute("type", "text");
            myFname.classList.add("text");
            myFname.value = task.FirstName;
            myFname.readOnly = true;

            const myLname = document.createElement("input");
            myLname.setAttribute("type", "text");
            myLname.classList.add("text");
            myLname.value = task.LastName;
            myLname.readOnly = true;

            const myAction = document.createElement("div");
            myAction.classList.add("action");

            const myEdit = document.createElement("button");
            myEdit.classList.add("editItem");
            myEdit.textContent = "Edit";
            myEdit.addEventListener("click", () => {
            const index = tasks.findIndex(task => task.FirstName === oldTask.FirstName && task.LastName === oldTask.LastName);
                if (index !== -1) {
                    tasks[index].FirstName = newFirstName;
                    tasks[index].LastName = newLastName;}
                    updateTaskInLocalStorage();
            });

            const myDelete = document.createElement("button");
            myDelete.classList.add("deleteItem");
            myDelete.textContent = "Delete";
            myDelete.addEventListener("click", () => {
            tasks = tasks.filter(t => t.FirstName !== task.FirstName || t.LastName !== task.LastName);
            saveTasksToLocalStorage();
            });

            myDiv.appendChild(myContent);
            myContent.appendChild(myFname);
            myContent.appendChild(myLname);
            saveTask.appendChild(myDiv);

            myContent.appendChild(myAction);
            myAction.appendChild(myEdit);
            myAction.appendChild(myDelete);
        });
    }
}
const index=null;
function updateTaskInLocalStorage(oldTask, newFirstName, newLastName) {
    const index = tasks.findIndex(task => task.FirstName === oldTask.FirstName && task.LastName === oldTask.LastName);
    if (index !== null) {
        tasks[index].FirstName = newFirstName;
        tasks[index].LastName = newLastName;
        saveTasksToLocalStorage();
    }
}

function deleteTaskFromLocalStorage(task) {
    tasks = tasks.filter(t => t.FirstName !== task.FirstName || t.LastName !== task.LastName);
    saveTasksToLocalStorage();
}

loadTasksFromLocalStorage();
