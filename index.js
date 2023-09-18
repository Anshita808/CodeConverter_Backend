let closeDrawer = document.querySelector(".fa-xmark");
let hamburger = document.querySelector(".fa-bars");
let drawer = document.querySelector(".drawer");

hamburger.addEventListener("click",()=>{
  drawer.style.display = "block"

})

closeDrawer.addEventListener("click",()=>{
  drawer.style.display = "none" 
})

// 
let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  function generateCalendar(month, year) {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();
    
    document.getElementById("month-year").innerHTML = `${monthNames[month]} ${year}`;
    let calendarDays = document.getElementById("calendar-days");
    calendarDays.innerHTML = "";
    
    let dayOffset = (startingDay === 0) ? 6 : startingDay - 1;

    for (let i = 0; i < dayOffset; i++) {
      const emptyDay = document.createElement("li");
      if(emptyDay.innerText==""){
        emptyDay.style.border = "none"
      }
      calendarDays.appendChild(emptyDay);
    }
     
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement("li");
      dayElement.textContent = day;
      if (day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
    dayElement.classList.add("active");
  }
  calendarDays.appendChild(dayElement);
}
  }

  function prevMonth() {
    currentMonth -= 1;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear -= 1;
    }
    generateCalendar(currentMonth, currentYear);
  }

  function nextMonth() {
    currentMonth += 1;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear += 1;
    }
    generateCalendar(currentMonth, currentYear);
  }

  generateCalendar(currentMonth, currentYear);
