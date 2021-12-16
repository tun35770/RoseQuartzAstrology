const myParent = document.body;

//create selects
const monthList = document.getElementById("month");
const dayList = document.getElementById("day");
const yearList = document.getElementById("year");

const months = ["January", "February", "March", "April", "May", "June", "July"
                    , "August", "September", "October", "November", "December"];
const days = new Array(31);
const years = new Array(100);

let isLeapYear = false;

initializeBirthdateSelect();

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

function initializeBirthdateSelect(){
    
    //arrays containing option values
    

    /* let monthTitleOption = document.createElement("option");
    monthTitleOption.value = "Month";
    monthTitleOption.text = "Month";

    let dayTitleOption = document.createElement("option");
    dayTitleOption.value = "Day";
    dayTitleOption.text = "Day";

    let yearTitleOption = document.createElement("option");
    yearTitleOption.value = "Year";
    yearTitleOption.text = "Year"; */

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
