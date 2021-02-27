const body=document.querySelector("body");
const IMG_NUMBER = 4;


function paintImage(imgNum){
    const img = new Image();
    img.src = `./bg/bg${imgNum + 1}.jpg`;
    img.classList.add("bg");
    body.appendChild(img);
}

function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER)
    return number;
}

function init(){
    const randomNum = genRandom();
    paintImage(randomNum);
}

init();