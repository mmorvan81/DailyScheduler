
//Local storage is a property that allows this JavaScript site to save key in a browser so it continues to run after the browser window is closed.
function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
}
// Creating the real time function in the jumbotron
$( document ).ready(function() {
    $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    
//Creating the time slots for the calender and inserting a row and columns based on user imput
    for (let i = 8; i < 18; i++) {
        var row = $(`<div data-time=${i} id='${i}' class="row">`);
        var column1 = $('<div class="col-sm-2"> <p class="hour">' + formatAMPM(i) + '</p>');
        var column2 = $(`<div class="col-sm-8 past"><textarea id=text${i} class="description" placeholder="Click here and schedule your appointment or activity"></textarea>`);        
        var column3 = $(`<div class="col-sm-2"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`)
//Appending the three columns to the row
        row.append(column1);
        row.append(column2);
        row.append(column3);
//Adding the row to the container jQuery
        $(".container").append(row);

        getLocalStorage(i);
    }
//Adding the function for the daily hours
    function formatAMPM(hours) {
        var ampm = hours >= 12 ? ':00pm' : ':00am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ampm;
    }
formatAMPM();

//Adding the function for the color changes based on data
function updateColors(){
        var currentTime = new Date().getHours();
        for (var i = 9; i < 18; i++) { 
        console.log(currentTime, $(`#${i}`).data("time"));
         if ($(`#${i}`).data("time") == currentTime){
            $(`#text${i}`).addClass( "present");
        } else if (currentTime < $(`#${i}`).data("time")) {
            $(`#text${i}`).addClass( "future");
        }
    }
}

setInterval(function() {
    updateColors();
}, 1000);

var saveBtn = $('.saveBtn');
saveBtn.on('click', function(){
    let eventId = $(this).attr('id');
    let eventText = $(this).parent().siblings().children('.description').val();
    localStorage.setItem(eventId, eventText);
});});