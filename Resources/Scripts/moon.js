
// ------ VARIABLES ------ \\
const button = document.getElementById("date-button");

//create selects
const monthList = document.getElementById("month");
const dayList = document.getElementById("day");
const yearList = document.getElementById("year");


// ------ PROGRAM ------ \\
initializeDateSelect();

monthList.oninput = monthSelectOnInput;
yearList.oninput = yearSelectOnInput;


// ------ FUNCTIONS ------ \\