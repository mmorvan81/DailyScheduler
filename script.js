
var myDailyCalendar = [ 
{   id: "0",
    hour: "8:00",
    time: "08",
    daynight: "am",
    memo: ""
    },
{
    id: "1",
    hour: "9:00",
    time: "09",
    daynight: "am",
    memo: ""
    },
{
    id: "2",
    hour: "10:00",
    time: "10",
    daynight: "am",
    memo: ""
    },
{
    id: "3",
    hour: "11:00",
    time: "11",
    daynight: "pm",
    memo: ""
    },
{
    id: "4",
    hour: "12:00",
    time: "12",
    daynight: "pm",
    memo: ""
    },
{
    id: "5",
    hour: "1:00",
    time: "13",
    daynight: "pm",
    memo: ""
    },
{
    id: "6",
    hour: "2:00",
    time: "14",
    daynight: "pm",
    memo: ""
    },
{
    id: "7",
    hour: "3:00",
    time: "15",
    daynight: "pm",
    memo: ""
    },
{
    id: "8",
    hour: "4:00",
    time: "16",
    daynight: "pm",
    memo: ""
    }, ]

function obtainHeaderDay() {
    var presentDay = moment().format('dddd, MMMM Do, h:mm:ss a');
    $("#presentDay").text(presentDay);
}
obtainHeaderDay();

function saveMemos() {
    localStorage.setItem("myDaily", JSON.stringify(myDailyCalendar));
}
function displayMemos() {
    myDailyCalendar.forEach(function (_currHr) {
        $(`#${_currHr.id}`).val(_currHr.memo);
    })
}
function init() {
    var reserveDay = JSON.parse(localStorage.getItem("myDailyCalendar"));
    if (reserveDay) {
        myDailyCalendar = reserveDay;
    }
    saveMemos();
    displayMemos();
}
myDailyCalendar.forEach(function(currHr) {  
    var hrlyRow = $("<form>").attr({"class": "row"});
    $(".container").append(hrlyRow);

    var hrlyField = $("<div>") 
        .text(`${currHr.hour}${currHr.daynight}`)
        .attr({ "class": "col-md-2 hour"});
    var hrlyInfo = $("<div>") 
        .attr({"class": "col-md-9 description p-0"});

    var plannerData= $("<textarea>");

    hrlyInfo.append(plannerData);
    
    plannerData.attr("id", currHr.id);
    if (currHr.time < moment().format("HH")) {
        plannerData.attr ({"class": "completed", })
    } else if (currHr.time === moment().format("HH")) {
        plannerData.attr({ "class": "current" })
    } else if (currHr.time > moment().format("HH")) {
        plannerData.attr({ "class": "upcoming"})
    }

    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var reservePlanner = $("<button>")
        .attr({"class": "col-md-1 saveBtn"});
    reservePlanner.append(saveButton);
    hrlyRow.append(hrlyField, hrlyInfo, reservePlanner);
})
init();

$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".upcoming").attr("id");
    myDailyCalendar[saveIndex].memo = $(this).siblings(".description").children(".upcoming").val();
    console.log(saveIndex);
    saveMemos();
    displayMemos();
})