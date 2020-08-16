const body = document.querySelector("body");


/* 배경이미지 개수 */
const IMG_NUMBER = 5;

function handleImageLoad() {
    console.log("finished loading");
}

function paintImage(imageNumber)
{
    const image = new Image();
    image.src = `images/${imageNumber+1}.JPG`;
    image.classList.add("backgroundImage");
    body.prepend(image);

    image.addEventListener("loaded", handleImageLoad);

}

function getRandom() 
{
    /* 이미지 개수 만큼만 랜덤숫자 생성 */
    const number = Math.floor(Math.random()*IMG_NUMBER);
    return number;
}

function init()
{
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();