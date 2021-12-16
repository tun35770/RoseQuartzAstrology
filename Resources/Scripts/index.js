
// ------ VARIABLES ------ \\
//HTML elements
const myParent = document.body;
const button = document.getElementById("birthdate-button");
const horoscopeBody = document.getElementById("horoscope");

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
        sign = "aquarius";
    if((month == "February" && day >= 19) || (month == "March" && day <= 20))
        sign = "pisces";
    if((month == "March" && day >= 21) || (month == "April" && day <= 19))
        sign = "aries";
    if((month == "April" && day >= 20) || (month == "May" && day <= 20))
        sign = "taurus";
    if((month == "May" && day >= 21) || (month == "June" && day <= 20))
        sign = "gemini";
    if((month == "June" && day >= 21) || (month == "July" && day <= 22))
        sign = "cancer";
    if((month == "July" && day >= 23) || (month == "August" && day <= 22))
        sign = "leo";
    if((month == "August" && day >= 23) || (month == "September" && day <= 22))
        sign = "virgo";
    if((month == "September" && day >= 23) || (month == "October" && day <= 22))
        sign = "libra";
    if((month == "October" && day >= 23) || (month == "November" && day <= 21))
        sign = "scorpio";
    if((month == "November" && day >= 22) || (month == "December" && day <= 21))
        sign = "sagittarius"
    if((month == "December" && day >= 22) || (month == "January" && day <= 19))
        sign = "capricorn";
    
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

            displayHoroscope(compatibility, lucky_time, lucky_number, color, mood, description);
        })
    } 
}

//displays horoscope info in html
function displayHoroscope(compatibility, lucky_time, lucky_number, color, mood, description){
    let compatHead = document.createElement("h2").text = "Compatibility";
    let timeHead = document.createElement("h2").text = "Lucky Time";
    let numberHead = document.createElement("h2").text = "Lucky Number";
    let colorHead = document.createElement("h2").text = "Color";
    let moodHead = document.createElement("h2").text = "Mood";
    let descHead = document.createElement("h2").text = "Horoscope";
    
    let compatBody = document.createElement("h4");
    compatBody.textContent = compatibility;
    let timeBody = document.createElement("h4");
    timeBody.textContent = lucky_time;
    let numberBody = document.createElement("h4");
    numberBody.textContent = lucky_number;
    let colorBody = document.createElement("h4");
    colorBody.textContent = color;
    let moodBody = document.createElement("h4");
    moodBody.textContent = mood;
    let descBody = document.createElement("h4");
    descBody.textContent = description;

    horoscopeBody.appendChild(compatBody);
    horoscopeBody.appendChild(timeBody);
    horoscopeBody.appendChild(numberBody);
    horoscopeBody.appendChild(colorBody);
    horoscopeBody.appendChild(moodBody);
    horoscopeBody.appendChild(descBody);

}