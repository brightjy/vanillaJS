const clockContainer = document.querySelector(".js-clock"),
    clock = clockContainer.querySelector("h1");

function getTime()
{
    // 오늘 날짜 객체 생성
    const date = new Date();
    // 분
    const minutes = date.getMinutes();
    // 시간
    const hours = date.getHours();
    // 초
    const seconds = date.getSeconds();
    
    clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}`;

}

function init()
{
    getTime();
    // 1초 마다 getTime 반복
    setInterval(getTime, 1000);
}

init();