/*eslint-env browser*/

//GLOBAL VARIABLES
var storage;
var list = "";
var task;
var tasks = [];

//GET DOM ELEMENTS
var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

//DISPLAY THE TASKS
var displayTaskList = function () {
    "use strict";
    //if there are no tasks in the array
    //check the storage object
    if(tasks.length === 0){
        storage = localStorage.getItem("tasks") || "";
        if(storage.length > 0) {
            task = storage.split("|");
        }
    }
    //if there are tasks in the array
    //sort them
    //return a break-delimited string into the list of tasks
    if(tasks.length > 0) {
        tasks.sort();
       list = tasks.join("\n"); 
    }
    //populate the textarea with the list of tasks
    $("tasklist").value = list;
};

//ADD A TASK
var addToTaskList = function () {
    "use strict";
    //check to see if add task text box is empty;
    //if it is 
    task = $("task");
    if (task.value === "") {
        window.alert("Please enter a task.");
        
    } else {
        tasks.push(task.value);
        localStorage.tasks = tasks.join("|");
        task.value = "";
        displayTaskList();
    }
};

//CLEAR TASK LIST
var clearTaskList = function () {
    "use strict";
    tasks.length = 0;  //clear out array
    localStorage.tasks = ""; //clear out storage object
    $("tasklist").value = "";//clear out task list
    
};

//WIRE UP EVENT HANDLERS AND DISPLAY TASK LIST
window.addEventListener("load", function () {
   "use strict";
    $("addtask").addEventListener("click", addToTaskList);
    $("cleartask").addEventListener("click", clearTaskList);
    displayTaskList();
});