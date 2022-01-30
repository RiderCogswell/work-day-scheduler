// global variables

// current date
var today = moment()
$("#currentDay").text(today.format("dddd, MMMM, YYYY, h:mm:ss a"));
// tasks arrays for local storage

var tasks = {
    "9": [],
    "10": [],
    "11": [], 
    "12": [],
    "13": [],
    "14": [],
    "15": [],
    "16": [],
    "17": []
}

// add task to local storage
var setTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

var getTasks = function() {
    // load task from local storage 
    var loadedTasks = JSON.parse(localStorage.getItem(tasks));
    if (loadedTasks) {
    
        tasks = loadedTasks;

        // for each key/value pair in tasks, create a task
        $.each(tasks, function(hour, task) {
            var hourDiv = $("#" + hour);
            createTask(task, hourDiv);
        })
    }

}

// create task function

var createTask = function(taskText, hourDiv) {
    var taskDiv = hourDiv.find(".task");
    var taskP = $("p")
    .addClass("description")
    .text(taskText)
    taskDiv.html(taskP);
}