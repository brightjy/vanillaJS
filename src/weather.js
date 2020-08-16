const weather = document.querySelector(".js-weather");

const API_KEY = "690241206d8a2036131c1a5bde107e18";
const COORDS = "coords";

/* 날씨정보 호출하는 함수 */
function getWeather(lat, lng)
{
    /*
        Fetch API : ES6의 비동기 통신
        fetch(url, {
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json'
            }
        }).then(function(response){
            // codes...
        }).catch(fucntion(error){
            // error...
        });
    */

    /* 날씨 API로 날씨 정보 받아오기 */
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then( function(response) {
        return response.json();
    }).then( function(json) {
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText = `${temp}ºC @${place}`;
    }).catch(function(error) {
        console.log("Can't get weather info");
    });
}
/* localStorage에 저장하는 함수*/
function saveCoords(coordsObj)
{
    // JSON -> String 바꿔서 COORDS란 이름으로 저장
    // localStorage에는 String으로 바꿔서 저장해야 한다.
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

/* 좌표값 얻어내기에 성공하는 경우*/
function handleGeoSuccess(position)
{
    // 좌표값에서 위도, 경도 가져와서 obj 객체(JSON)로 만들고 
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude, // name 과 값이 같으면, 그냥 latitude 만 써도 됨
        longitude : longitude
    };

    // localStorage에 저장한다.
    saveCoords(coordsObj);

    // 위도, 경도 값으로 날씨 정보 호출
    getWeather(latitude, longitude);
}

/* 좌표값 얻어내기에 실패하는 경우 */
function handleGeoFail()
{
    console.log("Can't access geolocation");
}

/* 좌표값 얻어내기(API) */
function getCoords()
{
    // geolocation API 활용
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFail);

}

/* 좌표 로딩 */
function loadCoords()
{
    // localStorage에서 COORDS 값 가져온다.
    const loadedCoords = localStorage.getItem(COORDS);

    if (loadedCoords === null)
    {   // 기존에 저장된 값이 없으면,
        // 좌표값 얻어내기(API)
        getCoords();
    }
    else
    {   // 기존에 저장된 값이 있으면,
        // 좌표를 String -> JSON
        const parsedCoords = JSON.parse(loadedCoords);
        // 위도, 경도값 뽑아내서 getWeather 함수 호출
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init()
{
    loadCoords();
}

init();