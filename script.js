$(document).ready(function() {
//Function to display current day at the top of the calendar
function displayCurrentDay() {
    var currentDay = dayjs().format("dddd, MMMM D");
    $("#currentDay").text("Today is " + currentDay);
  }

//Function to generate time blocks for 9-5 busines hours
function generateTimeBlocks() {
    var container = $(".container");
    var currentHour = dayjs().hour();

    for (var hour = 9; hour <= 17; hour++) {
      var timeBlock = $("<div>").addClass("time-block row");
      var hourCol = $("<div>").addClass("hour col-md-1").text(hour + ":00");
      var textAreaCol = $("<textarea>").addClass("description col-md-10");
      var saveBtnCol = $("<button>").addClass("saveBtn col-md-1").text("Save");

      timeBlock.attr("data-hour", hour);
      textAreaCol.attr("data-hour", hour);

//Color-code time blocks based on past, present and future
if (hour < currentHour) {
    textAreaCol.addClass("past");
  } else if (hour === currentHour) {
    textAreaCol.addClass("present");
  } else {
    textAreaCol.addClass("future");
  }

  timeBlock.append(hourCol, textAreaCol, saveBtnCol);
  container.append(timeBlock);
}
}

//Function to handle click on save button and save event to local storage
function handleSaveButtonClick() {
    $(".saveBtn").on("click", function() {
      var hour = $(this).siblings(".description").data("hour");
      var eventText = $(this).siblings(".description").val();

      // Save event in local storage
      localStorage.setItem("event_" + hour, eventText);
    });
  }

// Function to load events from local storage and populate time blocks
function loadEvents() {
    $(".description").each(function() {
      var hour = $(this).data("hour");
      var storedEvent = localStorage.getItem("event_" + hour);

      if (storedEvent) {
        $(this).val(storedEvent);
      }
    });
  }

// Call functions to initialize the planner
displayCurrentDay();
generateTimeBlocks();
handleSaveButtonClick();
loadEvents();
});