
// ------ VARIABLES ------ \\
//HTML elements
const myParent = document.body;
const header = document.getElementById("header");
const button = document.getElementById("birthdate-button");
const primaryHoroscopeBody = document.getElementById("primary-horoscope");
const secondaryHoroscopeBody = document.getElementById("secondary-horoscope");

//for horoscope results
let signBody = document.getElementById("sign");
let compatBody = document.getElementById("compatibility");
let timeBody = document.getElementById("luckytime");
let numberBody = document.getElementById("luckynumber");
let colorBody = document.getElementById("color"); 
let moodBody = document.getElementById("mood");
let descBody = document.getElementById("description");

let signHead = document.getElementById("sign-head");
let compatHead = document.getElementById("compat-head");
let timeHead = document.getElementById("time-head");
let numberHead = document.getElementById("number-head");
let colorHead = document.getElementById("color-head");
let moodHead = document.getElementById("mood-head");
let descHead = document.getElementById("desc-head");

//text of each section above
let signText, compatText, timeText, numberText, colorText, moodText, descText;

//create selects
const monthList = document.getElementById("month");
const dayList = document.getElementById("day");
const yearList = document.getElementById("year");

//DONT TOUCH (well, you can add more years if you want)!!!
const months = ["January", "February", "March", "April", "May", "June", "July"
                    , "August", "September", "October", "November", "December"];
const days = new Array(31);
const years = new Array(100);

let isLeapYear = false;

// ------ PROGRAM ------ \\

initializeBirthdateSelect();
initializeHeader();

//updates time every second
setInterval(() => {updateTime();}
, 1000);

button.onclick = sendAPIRequest;

// ------ FUNCTIONS ------ \\
monthList.oninput = function () {
    //the +1 in each .remove is because the select menus contain a title option at the beginning
    //so total size is 1 more than the array sizes (every element shifted by 1)

    //30 days, remove 31
    if(monthList.value == "September" || monthList.value == "April" || monthList.value == "June" || monthList.value == "November"){
        let d31 = days.indexOf(31);
        if(d31 != -1){
            dayList.remove(d31+1);
            days.splice(d31, 1);
        }
    }

    //28 days, remove 31 30 29
    else if(monthList.value == "February"){
        let d31 = days.indexOf(31);
        let d30 = days.indexOf(30);
        let d29 = days.indexOf(29);

        if(d31 != -1){
            dayList.remove(d31+1);
            days.splice(d31, 1);
        }
        if(d30 != -1){
            dayList.remove(d30+1);
            days.splice(d30, 1);
        }
        if(d29 != -1 && !isLeapYear){
            dayList.remove(d29+1);
            days.splice(d29, 1);
        }
    }

    //31 days, add them back if needed
    else{
        let daysSize = days.length; //should be 31 for 31 days, otherwise add them back!
        if(daysSize < 29){  //add back 29
            days.push(29);
            let option = document.createElement("option");
            option.value = 29;
            option.text = 29;
            dayList.appendChild(option);
        }
        if(daysSize < 30){  //add back 30
            days.push(30);
            let option = document.createElement("option");
            option.value = 30;
            option.text = 30;
            dayList.appendChild(option);
            
        }
        if(daysSize < 31){   //add back 31
            days.push(31);
            let option = document.createElement("option");
            option.value = 31;
            option.text = 31;
            dayList.appendChild(option);
        }
    }
};


//just flag whether leap year or not
yearList.oninput = function () {
    if((yearList.value % 4 == 0 && yearList.value % 100 != 0) || (yearList.value % 4 == 0 && yearList.value % 400 == 0))
        isLeapYear = true;
    else
        isLeapYear = false;

    if(monthList.value == "February"){
        let d29 = days.indexOf(29);
        //if leapyear and there is no 29th day in Feb, add it
        if(isLeapYear && d29 == -1){
            days.push(29);
            let option = document.createElement("option");
            option.value = 29;
            option.text = 29;
            dayList.appendChild(option);  
        }

        //if not a leap year but there is a 29th day in Feb, remove it
        else if(!isLeapYear && d29 != -1){
            dayList.remove(d29+1);
            days.splice(d29, 1);
        }
    }
}


//adds months, days, and years to respective lists
function initializeBirthdateSelect(){
    
    //initialize days[] with 1-31
    for(let i = 1; i <= 31; i++){
        days[i-1] = i;
    }

    //initialize years[] with 1922-2021
    for(let i = 0; i < 100; i++){
        years[i] = 2021 - i;
    }

    //add months as options to monthList
    for(let i = 0; i < months.length; i++){
        let option = document.createElement("option");
        option.value = months[i];
        option.text = months[i];
        monthList.appendChild(option);
    }

    //add days as options to dayList
    for(let i = 0; i < days.length; i++){
        let option = document.createElement("option");
        option.value = days[i];
        option.text = days[i];
        dayList.appendChild(option);
    }

    //add years as options to yearList
    for(let i = 0; i < years.length; i++){
        let option = document.createElement("option");
        option.value = years[i];
        option.text = years[i];
        yearList.appendChild(option);
    }
}

//determines astrological sign based on birthdate
function getSign(month, day){
    let sign;

    //now figure out the sign...this is the cleanest, simplest way i can think of
    if((month == "January" && day >= 20) || (month == "February" && day <= 18))
        sign = "Aquarius";
    if((month == "February" && day >= 19) || (month == "March" && day <= 20))
        sign = "Pisces";
    if((month == "March" && day >= 21) || (month == "April" && day <= 19))
        sign = "Aries";
    if((month == "April" && day >= 20) || (month == "May" && day <= 20))
        sign = "Taurus";
    if((month == "May" && day >= 21) || (month == "June" && day <= 20))
        sign = "Gemini";
    if((month == "June" && day >= 21) || (month == "July" && day <= 22))
        sign = "Cancer";
    if((month == "July" && day >= 23) || (month == "August" && day <= 22))
        sign = "Leo";
    if((month == "August" && day >= 23) || (month == "September" && day <= 22))
        sign = "Virgo";
    if((month == "September" && day >= 23) || (month == "October" && day <= 22))
        sign = "Libra";
    if((month == "October" && day >= 23) || (month == "November" && day <= 21))
        sign = "Scorpio";
    if((month == "November" && day >= 22) || (month == "December" && day <= 21))
        sign = "Sagittarius"
    if((month == "December" && day >= 22) || (month == "January" && day <= 19))
        sign = "Capricorn";
    
    return sign;
}


function sendAPIRequest(){

    //get the astrological sign given the birthdate
    let sign = getSign(monthList.value, dayList.value);

    if (sign == null){
        console.log("Sign is null\n");
        return;
    }

    else{
        //send request to get horoscope
        const url = `https://aztro.sameerkumar.website/?sign=${sign}&day=today`;
        fetch(url, {
            method: 'POST'
        })
        .then(response => response.json())
        .then(json => {
            const compatibility = json.compatibility;
            const lucky_time = json.lucky_time;
            const lucky_number = json.lucky_number;
            const color = json.color;
            const mood = json.mood;
            const description = json.description;

            displayHoroscope(sign, compatibility, lucky_time, lucky_number, color, mood, description);
        })
    } 
}

//displays horoscope info in html
function displayHoroscope(sign, compatibility, lucky_time, lucky_number, color, mood, description){
    signHead = document.getElementById("sign-head");

    if(signHead == null){
        signHead = document.createElement("h2");
        signHead.id = "sign-head";
        signHead.className = "horoscope-heading";
        signHead.textContent = "Your Sign";

        compatHead = document.createElement("h2");
        compatHead.id = "compat-head";
        compatHead.className = "horoscope-heading";
        compatHead.textContent = "Compatibility";

        timeHead = document.createElement("h2");
        timeHead.id = "time-head";
        timeHead.className = "horoscope-heading";
        timeHead.textContent = "Lucky Time";

        numberHead = document.createElement("h2");
        numberHead.id = "number-head";
        numberHead.className = "horoscope-heading";
        numberHead.textContent = "Lucky Number";

        colorHead = document.createElement("h2");
        colorHead.id = "color-head";
        colorHead.className = "horoscope-heading";
        colorHead.textContent = "Color";

        moodHead = document.createElement("h2");
        moodHead.id = "mood-head";
        moodHead.className = "horoscope-heading";
        moodHead.textContent = "Mood";

        descHead = document.createElement("h2");
        descHead.id = "desc-head";
        descHead.className = "horoscope-heading";
        descHead.textContent = "Your Horoscope";

        signBody.appendChild(signHead);
        compatBody.appendChild(compatHead);
        timeBody.appendChild(timeHead);
        numberBody.appendChild(numberHead);
        colorBody.appendChild(colorHead);
        moodBody.appendChild(moodHead);
        descBody.appendChild(descHead);
    }

    compatText = document.getElementById("compat-text");

    //if compatBody doesn't exist, none of them do, so create them
    if(compatText == null){
        signText = document.createElement("h3");
        signText.id = "sign-text";
        signText.className = "horoscope-body";

        compatText = document.createElement("h3");
        compatText.id = "compat-text";
        compatText.className = "horoscope-body";

        timeText = document.createElement("h3");
        timeText.id = "time-text";
        timeText.className = "horoscope-body";

        numberText = document.createElement("h3");
        numberText.id = "number-text";
        numberText.className = "horoscope-body";

        colorText = document.createElement("h3");
        colorText.id = "color-text";
        colorText.className = "horoscope-body";

        moodText = document.createElement("h3");
        moodText.id = "mood-text";
        moodText.className = "horoscope-body";

        descText = document.createElement("h3");
        descText.id = "desc-text";
        descText.className = "horoscope-body";
    } 

    //set text contents
    signText.textContent = sign;
    compatText.textContent = compatibility;
    timeText.textContent = lucky_time;
    numberText.textContent = lucky_number;
    colorText.textContent = color;
    moodText.textContent = mood;
    descText.textContent = description;


    signBody.appendChild(signText);
    compatBody.appendChild(compatText);
    timeBody.appendChild(timeText);
    numberBody.appendChild(numberText);
    colorBody.appendChild(colorText);
    moodBody.appendChild(moodText);
    descBody.appendChild(descText);
}

function initializeHeader(){
    let today = new Date();

    let date = months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
    //let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let date_text = document.createElement("p");
    date_text.textContent = date;
    date_text.style.margin = "0";
    header.appendChild(date_text);

    //create time text element
    let time_text = document.createElement("p");
    time_text.id = "time_text";
    time_text.style.margin = "0";
    header.appendChild(time_text);

    //sets initial time
    updateTime();
}

//updates time
function updateTime(){
    let today = new Date();
    let suffix;

    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();

    //from 24 hour to 12 hour
    if(hours < 12)
        suffix = "a.m.";
    else  suffix = "p.m.";

    hours %= 12;
    if(hours == 0)
        hours == 12;

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    let time = hours + ":" + minutes + ":" + seconds + ' ' + suffix;
    let time_text = document.getElementById("time_text");
    time_text.textContent = time;

}