let input = document.querySelector(".input"); // catch the input_field

let submit = document.querySelector(".add"); // the (Add) button

let tdlist = document.getElementById("tdlist"); // the list div

let head = document.getElementById("head"); // the header element

let toDoList = []; // creating an empty arrylist
// check if thers items in local storage

if (localStorage.getItem("tasks")) {
  toDoList = JSON.parse(localStorage.getItem("tasks"));
}

// trigger get data from local function
getDataFromLocalStorage();

// Add a task
submit.onclick = function () {
  // check if the input is empty
  if (input.value !== "") {
    addTaskToList(input.value); // add task to list
    input.value = ""; // empty input field
  }
};

// add a task with (Enter) key
head.addEventListener("keypress", function (e) {
  if (e.target.classList.contains("input")) {
    if (e.key === "Enter" && input.value !== "") {
      e.preventDefault();
      addTaskToList(input.value); // add task to list
      input.value = "";
    }
  }
});

// click on task
tdlist.addEventListener("click", (e) => {
  // delete button
  if (e.target.classList.contains("del")) {
    // remove task from local storage
    deletTaskWithId(e.target.parentElement.getAttribute("data_id"));
    // remove task from page
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
  }
});

// our main function
function addTaskToList(taskText) {
  // task data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // push task to the list
  toDoList.push(task);
  // add tasks to the page
  addElemntsToPage(toDoList);
  // add tasks to local storage
  addDataToLocalStorage(toDoList);
}

// add tasks to the main page function
function addElemntsToPage(toDoList) {
  tdlist.innerHTML = ""; // empty the div
  // loop on the list of tasks
  toDoList.forEach((task) => {
    let item = document.createElement("div"); // create main div
    item.className = "task";
    // check if the task is done
    if (task.completed) {
      item.className = "task done";
    }
    item.setAttribute("data_id", task.id);
    item.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span"); // crate delete button
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    item.appendChild(span); // append the button to the div
    tdlist.appendChild(item); // add the tdlist to the main container
  });
}

// add data (tasks) to local storage
function addDataToLocalStorage(toDoList) {
  window.localStorage.setItem("tasks", JSON.stringify(toDoList));
}

// get the data from local storage
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElemntsToPage(tasks);
  }
}

// delet the task from the local storage
function deletTaskWithId(taskId) {
  toDoList = toDoList.filter((task) => task.id != taskId);
  addDataToLocalStorage(toDoList);
}

// mark the task as done
function toggleStatusTaskWith(taskId) {
  for (const task of toDoList) {
    if (task.id == taskId) {
      task.classList.toggle("completed");
    }
  }
  addDataToLocalStorage(toDoList);
}
