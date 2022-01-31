// global variables

// current date
var today = moment()
$("#currentDay").text(today.format("dddd, MMMM Do, YYYY"));
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
};

// add task to local storage
var setTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
};

var pullTasks = function() {
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
};

// create task function
var createTask = function(taskText, hourDiv) {
    var taskDiv = hourDiv.find(".task");
    var taskP = $("p")
    .addClass("description")
    .text(taskText)
    taskDiv.html(taskP);
};

// colorcode rows by time
var colorcodeHours = function() {
    var currentHour = moment().hour();
    $(".task-info").each(function() {
        var rowHour = parseInt($(this).attr("id"));
        if (rowHour < currentHour) {
            $(this).removeClass(["present", "future"]).addClass("past");
        } else if (rowHour === currentHour) {
            $(this).removeClass(["past", "future"]).addClass("present");
        } else {
            $(this).removeClass(["past", "present"]).addClass("future");
        }
    })
}

// replace text area
var replaceText = function(textAreaEl) {
    var taskInfo = textAreaEl.closest(".task-info");
    var textArea = taskInfo.find("textarea");

    // set variables 
    var time = taskInfo.attr("id");
    var text = textArea.val();

    // persist data through local storage
    tasks[time] = [text];

    // call createTask to replace textarea 
    createTask(text, taskInfo);
};

// add event listeners

$(".task").click(function() {
    $("textarea").each(function() {
        replaceText($(this));
    })

    // set time variable
    var time = $(this).closest(".task-info").attr("id");
    // if parse.int(time) greater than current moment
    if (parseInt(time) >= moment().hour()) {
        var text = $(this).text();
        // create text area with needed text
        var textInput = $("<textarea>")
        .addClass("form-control")
        .val(text);
        // add text input el to parent div
        $(this).html(textInput);
        textInput.trigger("focus");
    }
})

// update task background every hour
var timeToHour = 3600000 - today.milliseconds();
setTimeout(function() {
    setInterval(colorcodeHours, 3600000);
}, timeToHour)

// get tasks from localstorage
pullTasks();

