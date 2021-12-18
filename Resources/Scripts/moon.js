
// ------ VARIABLES ------ \\
const button = document.getElementById("date-button");

//create selects
const monthList = document.getElementById("month");
const dayList = document.getElementById("day");
const yearList = document.getElementById("year");


// ------ PROGRAM ------ \\
initializeDateSelect();

monthList.oninput = monthSelectOnInput;
dayList.oninput = daySelectOnInput;
yearList.oninput = yearSelectOnInput;

button.onclick = sendMoonRequest;


// ------ FUNCTIONS ------ \\
function getUnixTime(month, day, year){
    let date = Date.UTC(year, month, day);    //milliseconds since 1/1/1970
    console.log(date);
    return date;
}

function sendMoonRequest(){
    let unix_time;

    if(selectedMonth == null && selectedYear == null && selectedDay == null){
        console.error("Invalid date");
        return;
    }

    else{
        let monthIndex = months.indexOf(selectedMonth);
        unix_time = getUnixTime(monthIndex, selectedDay, selectedYear);

        const url = `https://api.farmsense.net/v1/moonphases/?d=${unix_time}`;

        fetch(url, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        }) 
    }
}