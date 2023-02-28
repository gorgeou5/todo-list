let today = new Date();
let month = today.getMonth() + 1;
// 0~11이기 때문에 1을 더해줘야함
let date = today.getDate();
let dayDate = today.getDay();

function day() {
  let dayArr = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  return dayArr[dayDate];
}

document.querySelector("#date").innerHTML = month + "월 " + date + "일 " + day();
