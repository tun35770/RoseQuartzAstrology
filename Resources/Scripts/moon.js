
// ------ VARIABLES ------ \\
const APIKEY = 'BMJ8966C5QC88NMYNYRLDN6BD';

const phasesURI = './Resources/MoonPhases/';

const button = document.getElementById("date-button");

let moonImgContainer = document.getElementById("moon-img-container");
let moonTextContainer = document.getElementById("moon-text-container");

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

function sendMoonRequest(){
    //let unix_time;

    if(selectedMonth == null || selectedYear == null || selectedDay == null){
        console.error("Invalid date");
        return;
    }

    else{
        
        let monthIndex = months.indexOf(selectedMonth);
        let month = monthIndex+1;

        let location = 'Philadelphia';
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
        ${location}/${selectedYear}-${month}-${selectedDay}?key=${APIKEY}&include=obs`;

        fetch(url, {
            method: 'GET',
            
        })
        .then(response => response.json())
        .then(json => {
            
            console.log(json);
            /* console.log(json[0].Phase);
            let date = new Date(parseInt(json[0].TargetDate));
            console.log("Target Date: " + date);
            displayMoonInfo(json[0].Phase); */
        }) 
    }
}

function displayMoonInfo(phase){
    let moonText = document.getElementById("moon-text");

    if(moonText == null){
        moonText = document.createElement("h2");
        moonText.id = "moon-text";
        moonTextContainer.appendChild(moonText);
    }

    moonText.textContent = phase;

    let moonImage = document.getElementById("moon-image");

    if(moonImage == null){
        moonImage = document.createElement("img");
        moonImage.id = "moon-image";
        moonImage.style.width = "30%";
        moonImage.style.height = "auto";
        moonImgContainer.appendChild(moonImage);
    }

    moonImage.src = phasesURI + phase + '.png';
}