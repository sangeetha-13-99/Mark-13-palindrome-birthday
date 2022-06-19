function isPalindrome(date) {
  if (date == date.split("").reverse().join("")) {
    return true;
  }
  return false;
}
function checkLeapYear(year){
  if((year%400)==0){
    return true
  }
  if((year%100)==0){
    return false
  }
  if((year%4)==0){
    return true
  }
  return false
}
var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
function getNextDate(yy,mm,day){
  day+=1;
  if(day>daysInMonth[mm-1] && mm<12){
    if(mm==2){
      if((checkLeapYear(yy) && day>29) || !checkLeapYear(yy)){
        mm+=1;
        day=1;
      }
    }
    else{
      mm+=1
      day=1
    }
  }
  else if(day>daysInMonth[mm-1] && mm==12){
    day=1;
    mm=1;
    yy+=1;
  }
  return [yy,mm,day];

}
function getPrevDate(yy,mm,day){
  day-=1;
  if(day==0 && mm>1){
      if(mm==3){
        if(checkLeapYear(yy)){
          day=29;
          mm-=1
        }
        else{
          mm-=1
          day=daysInMonth[mm-1]
        }
      }
      else{
        mm-=1
        day=daysInMonth[mm-1]
      }
  }
  else if(day==0 && mm==1){
      day=31
      mm=12
      yy-=1
  }
  return [yy,mm,day];
}
function checkPrevPalindrome(dateObject) {
  let [yy,mm,day]=getPrevDate(Number(dateObject.year),Number(dateObject.month),Number(dateObject.day));
  let count=0;
  while(1){
    if(checkPalindromeForBirthDate(''+yy,''+mm,''+day)){
      return [count,''+day+'-'+mm+'-'+yy];
    }
    count+=1;
    [yy,mm,day]=getPrevDate(yy,mm,day);
  }
}
function checkNextPalindrome(dateObject) {
  let [yy,mm,day]=getNextDate(Number(dateObject.year),Number(dateObject.month),Number(dateObject.day));
  let count=0;
  while(1){
    if(checkPalindromeForBirthDate(''+yy,''+mm,''+day)){
      return [count,''+day+'-'+mm+'-'+yy];
    }
    count+=1;
    [yy,mm,day]=getNextDate(yy,mm,day);
  }
}
function checkPalindromeForBirthDate(year, month, day) {
  day=day.length==1?'0'+day:day;
  month=month.length==1?'0'+month:month;
  let dates = [
    year + month + day,
    month + day + year,
    day + month + year,
    day + month + year.slice(-2),
    month+ day + year.slice(-2),
    year.slice(-2) + month +day
  ];
  for (let date of dates) {
    if (isPalindrome(date)) {
      return true;
    } 
  }
  return false;
}

function checkBirthDayPalindrome(date) {
  let output = document.querySelector(".output");
  let dateObj = {
    year: date[0],
    month: date[1],
    day: date[2]
  };
 
  if(checkPalindromeForBirthDate(dateObj.year, dateObj.month, dateObj.day)){
      output.textContent='yay! your birthday is a palindrome 🥳🎉'
  }
  else{
    let [count1,date1]=checkNextPalindrome(dateObj);
    let [count2,date2]=checkPrevPalindrome(dateObj);
    output.textContent=`The nearest palindrome date is ${count2<count1?date2:date1}, You Missed By ${count2<count1?count2+1:count1+1} ${(count2<count1?count2+1:count1+1)==1?'day':'days'} 😖`
  }
}

export default function Main() {
  function clickHandler() {
    let date = document.getElementById("date").value;
    let output = document.querySelector(".output");
    if (date == "") {
      output.textContent = "enter your Birthday";
    } else {
      date = date.split("-");
      checkBirthDayPalindrome(date);
    }
  }

  return (
    <div className="mainContainer">
      <div className="inputFields">
        <label htmlFor="date">Enter Date :</label>
        <input type="date" id="date" />
      </div>
      <button className="submitButton" onClick={clickHandler}>
        Show
      </button>
      <p className="output"></p>
    </div>
  );
}
