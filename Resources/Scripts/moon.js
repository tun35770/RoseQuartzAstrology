
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
initializeHeader("<-- Horoscope", "index.html");

initializeYearSelect()
initializeMonthSelect();
initializeDaySelect();

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
        ${location}/${selectedYear}-${month}-${selectedDay}?key=${APIKEY}&include=obs&elements=moonphase`;

        fetch(url, {
            method: 'GET',
            
        })
        .then(response => response.json())
        .then(json => {
            let phaseNum = json.days[0].moonphase;
            console.log(phaseNum);
            let phase = moonPhaseFromFloat(phaseNum);
            displayMoonInfo(phase);
        }) 
    }
}

//displays the moon phase in text and image 
function displayMoonInfo(phase){
    let moonText = document.getElementById("moon-text");

    if(moonText == null){
        moonText = document.createElement("h2");
        moonText.id = "moon-text";
        moonText.style.fontSize = '2em';
        moonText.style.margin = '0 auto';
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

//returns the moon phase based on a float between 0 and 1
function moonPhaseFromFloat(phaseNum){

    let phase;

    if(phaseNum <= 0.02)
        phase = 'New Moon';    
    else if(phaseNum <= 0.23)
        phase = 'Waxing Crescent';
    else if(phaseNum <= 0.27)
        phase = 'First Quarter';
    else if(phaseNum <= 0.48)
        phase = 'Waxing Gibbous';
    else if(phaseNum <= 0.51)
        phase = 'Full Moon';
    else if(phaseNum <= 0.73)
        phase = 'Waning Gibbous';
    else if(phaseNum <= 0.77)
        phase = 'Last Quarter';
    else if(phaseNum <= 0.98)
        phase = 'Waning Crescent';
    else
        phase = 'New Moon';

    return phase;
    
}