const myParent = document.body;

initializeBirthdateSelect();

function initializeBirthdateSelect(){

    //create selects
    const monthList = document.getElementById("month");
    
    const dayList = document.getElementById("day");

    const yearList = document.getElementById("year");
    

    //arrays containing option values
    const months = ["January", "February", "March", "April", "May", "June", "July"
                    , "August", "September", "October", "November", "December"];
    const days = new Array(32);
    const years = new Array(100);

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
    for(let i = 0; i <= 31; i++){
        days[i] = i;
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
