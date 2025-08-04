const btn = document.getElementById("btn");

var red = "hsl(0, 100%, 67%)";
var gray = "hsl(0, 1%, 44%)";
var borderGray = "hsl(0, 0%, 86%)";

const labels = document.querySelectorAll("label");
const inputs = document.querySelectorAll("input");

btn.addEventListener("click", function () {
  const day = document.getElementById("day");
  const dayLabel = document.getElementsByClassName("d")[0];

  const month = document.getElementById("month");
  const monthLabel = document.getElementsByClassName("p")[0];

  const year = document.getElementById("year");
  const yearLabel = document.getElementsByClassName("y")[0];

  const error = document.querySelectorAll(".error");

  const parseDay = parseInt(day.value);
  const parseMonth = parseInt(month.value);
  const parseYear = parseInt(year.value);

  const date = new Date();

  let err = false;

  resetErrors(error);

  if (day.value.trim() === "") {
    error[0].classList.remove("hidden");
    dayLabel.style.color = red;
    day.style.borderColor = red;
    day.classList.add("animate-shake");
    dayLabel.classList.add("animate-shake");
    error[0].classList.add("animate-shake");
    setTimeout(() => {
      day.classList.remove("animate-shake");
      dayLabel.classList.remove("animate-shake");
      error[0].classList.remove("animate-shake");
    }, 400);
    err = true;
  } else if (parseDay < 0 || parseDay > 31) {
    error[0].innerHTML = "Must be a valid day <br> <strong>(1–31)</strong>";
    error[0].classList.remove("hidden");
    dayLabel.style.color = red;
    day.style.borderColor = red;
    day.classList.add("animate-shake");
    dayLabel.classList.add("animate-shake");
    error[0].classList.add("animate-shake");
    setTimeout(() => {
      day.classList.remove("animate-shake");
      dayLabel.classList.remove("animate-shake");
      error[0].classList.remove("animate-shake");
    }, 400);
    err = true;
  }

  if (month.value.trim() === "") {
    error[1].classList.remove("hidden");
    monthLabel.style.color = red;
    month.style.borderColor = red;
    month.classList.add("animate-shake");
    monthLabel.classList.add("animate-shake");
    error[1].classList.add("animate-shake");
    setTimeout(() => {
      month.classList.remove("animate-shake");
      monthLabel.classList.remove("animate-shake");
      error[1].classList.remove("animate-shake");
    }, 400);
    err = true;
  } else if (parseMonth < 0 || parseMonth > 12) {
    error[1].innerHTML = "Must be a valid month <br> <strong>(1–12)</strong>";
    error[1].classList.remove("hidden");
    monthLabel.style.color = red;
    month.style.borderColor = red;
    month.classList.add("animate-shake");
    monthLabel.classList.add("animate-shake");
    error[1].classList.add("animate-shake");
    setTimeout(() => {
      month.classList.remove("animate-shake");
      monthLabel.classList.remove("animate-shake");
      error[1].classList.remove("animate-shake");
    }, 400);
    err = true;
  }

  if (year.value.trim() === "") {
    error[2].classList.remove("hidden");
    yearLabel.style.color = red;
    year.style.borderColor = red;
    year.classList.add("animate-shake");
    yearLabel.classList.add("animate-shake");
    error[2].classList.add("animate-shake");
    setTimeout(() => {
      year.classList.remove("animate-shake");
      yearLabel.classList.remove("animate-shake");
      error[2].classList.remove("animate-shake");
    }, 400);
    err = true;
  } else if (parseYear > date.getFullYear()) {
    error[2].innerHTML = " Year must be in the past";
    error[2].classList.remove("hidden");
    yearLabel.style.color = red;
    year.style.borderColor = red;
    year.classList.add("animate-shake");
    yearLabel.classList.add("animate-shake");
    error[2].classList.add("animate-shake");
    setTimeout(() => {
      year.classList.remove("animate-shake");
      yearLabel.classList.remove("animate-shake");
      error[2].classList.remove("animate-shake");
    }, 400);
    err = true;
  }

  const numberOfDaysinFeb = leapYearChecking(parseYear);

  if (parseMonth == 2) {
    if (parseDay > numberOfDaysinFeb) {
      error[0].innerHTML = `February has only ${numberOfDaysinFeb} days in ${parseYear}`;
      error[0].classList.remove("hidden");
      dayLabel.style.color = red;
      day.style.borderColor = red;
      day.classList.add("animate-shake");
      dayLabel.classList.add("animate-shake");
      error[0].classList.add("animate-shake");
      setTimeout(() => {
        day.classList.remove("animate-shake");
        dayLabel.classList.remove("animate-shake");
        error[0].classList.remove("animate-shake");
      }, 400);
      err = true;
    }
  }

  const months = [4, 6, 9, 11];

  if (months.includes(parseMonth) && parseDay > 30) {
    error[0].innerHTML = `${parseMonth} has only 30 days`;
    error[0].classList.remove("hidden");
    dayLabel.style.color = red;
    day.style.borderColor = red;
       day.classList.add("animate-shake");
    dayLabel.classList.add("animate-shake");
    error[0].classList.add("animate-shake");
    setTimeout(() => {
      day.classList.remove("animate-shake");
      dayLabel.classList.remove("animate-shake");
      error[0].classList.remove("animate-shake");
    }, 400);
    err = true;
  }

  if (!err) {
    calculateAge(parseYear, parseMonth, parseDay);
  }
});

function calculateAge(year, month, day) {
  const currentDate = new Date();
  const inputDate = new Date(year, month - 1, day);
  let y = currentDate.getFullYear() - inputDate.getFullYear();
  let m = currentDate.getMonth() - inputDate.getMonth();
  let d = currentDate.getDate() - inputDate.getDate();

  let ty = document.getElementById("ty");
  let tm = document.getElementById("tm");
  let td = document.getElementById("td");

  if (d < 0) {
    m--;
    let pm = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    // console.log(pm)
    d += pm.getDate();
  }

  if (m < 0) {
    y--;
    m += 12;
  }

  ty.innerHTML = y;
  tm.innerHTML = m;
  td.innerHTML = d;
}

function resetErrors(error) {
  error.forEach((element) => {
    element.classList.add("hidden");
    element.innerHTML = "This field is required";
  });
  labels.forEach((label) => {
    label.style.color = gray;
  });
  inputs.forEach((input) => {
    input.style.borderColor = borderGray;
  });
}

function leapYearChecking(year) {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 == 0) {
        return 29;
      } else {
        return 28;
      }
    } else {
      return 29;
    }
  } else {
    return 28;
  }
}

// Toggle Button

const t = document.getElementsByClassName("t");
const s = document.getElementsByClassName("s")[0];
const m = document.getElementsByClassName("m")[0];

s.addEventListener("click", function () {
  document.documentElement.classList.remove("dark");
  s.classList.add("tb");
  m.classList.remove("tb");
  localStorage.setItem("theme", "light");
});

m.addEventListener("click", function () {
  document.documentElement.classList.add("dark");
  m.classList.add("tb");
  s.classList.remove("tb");
  localStorage.setItem("theme", "dark");
});

const theme = localStorage.getItem("theme");
if (theme === "dark") {
  document.documentElement.classList.add("dark");
  m.classList.add("tb");
  s.classList.remove("tb");
  localStorage.setItem("theme", "dark");
} else if (theme === "light") {
  document.documentElement.classList.remove("dark");
  s.classList.add("tb");
  m.classList.remove("tb");
  localStorage.setItem("theme", "light");
}

// Loading

window.addEventListener("load", function () {
  const mainContent = document.getElementById("main");
  const loading = document.getElementsByClassName("loading")[0];

  setTimeout(() => {
    loading.classList.remove("flex");
    loading.classList.add("hidden");

    mainContent.classList.remove("hidden");
    mainContent.classList.add("flex");
  }, 1500);
});
