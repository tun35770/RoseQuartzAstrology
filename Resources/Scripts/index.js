const myParent = document.body;

//create selects
const monthList = document.getElementById("month");
const dayList = document.getElementById("day");
const yearList = document.getElementById("year");

const months = ["January", "February", "March", "April", "May", "June", "July"
                    , "August", "September", "October", "November", "December"];
const days = new Array(31);
const years = new Array(100);

initializeBirthdateSelect();

monthList.onchange = function () {
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
        if(d29 != -1){
            dayList.remove(d29+1);
            days.splice(d29, 1);
        }
    }

    //31 days, add them back if needed
    else{
        let daysSize = days.length; //should be 31 for 31 days, otherwise add them back!
        if(daysSize < 30){  //only 28 days, add back 29 & 30
            days.push(29);
            days.push(30);
            //adding 29 & 30 options back to select
            for(let i = 29; i < 31; i++){
                let option = document.createElement("option");
                option.value = i;
                option.text = i;
                dayList.appendChild(option);
            }
        }
        if(daysSize < 31){   //either 28 or 30 days before adding, so add 28 29 30
            days.push(31);
            let option = document.createElement("option");
            option.value = 31;
            option.text = 31;
            dayList.appendChild(option);
        }
    }
};

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
