
// ------ VARIABLES ------ \\

//URI of folder containing astrological sign images
const signsURI = "./Resources/Signs/";

//HTML elements
const myParent = document.body;
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

// ------ PROGRAM ------ \\

initializeDateSelect();

button.onclick = sendAPIRequest;

// ------ FUNCTIONS ------ \\
monthList.oninput = monthSelectOnInput;
yearList.oninput = yearSelectOnInput;


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
        
        //append
        signBody.appendChild(signText);
        compatBody.appendChild(compatText);
        timeBody.appendChild(timeText);
        numberBody.appendChild(numberText);
        colorBody.appendChild(colorText);
        moodBody.appendChild(moodText);
        descBody.appendChild(descText);
    } 

    //set text contents
    signText.textContent = sign;
    compatText.textContent = compatibility;
    timeText.textContent = lucky_time;
    numberText.textContent = lucky_number;
    colorText.textContent = color;
    moodText.textContent = mood;
    descText.textContent = description;

    //add sign image
    let signSection = document.getElementById("sign");
    let signImage = document.getElementById("sign-image");

    //create signImage
    if(signImage == null){
        signImage = document.createElement("img");
        signImage.id = "sign-image";
        signImage.style.width = "30%";
        signImage.style.height = "auto";
        signSection.appendChild(signImage);
    }

    //change image path
    signImage.src = signsURI + sign + '.png';
}