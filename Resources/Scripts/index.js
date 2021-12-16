const myParent = document.body;

initializeBirthdateSelect();

function initializeBirthdateSelect(){
    const monthList = document.getElementsByName("month");
    const dayList = document.getElementsByName("day");
    const yearList = document.getElementsByName("year");
    
    const months = ["January", "February", "March", "April", "May", "June", "July"
                    , "August", "September", "October", "November", "December"];
    const days = new Array(31);
    const years = new Array(100);

    //initialize days[] with 1-31
    for(let i = 1; i <= 31; i++){
        days[i] = i;
    }

    //initialize years[] with 1922-2021
    for(let i = 0; i < 100; i++){
        years[i] = i + 1922;
    }

    //create option elements
    let monthOption = document.createElement("option");
    let dayOption = document.createElement("option");
    let yearOption = document.createElement("option");

    //set their values
    monthOption.value = months;
    dayOption.value = days;
    yearOption.value = years;

    //append them to respective selects
    monthList.appendChild(monthOption);
    dayList.appendChild(dayOption);
    yearList.appendChild(yearOption);
}
