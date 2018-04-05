'use strict'
window.onload = function () {
    let elementsByTagName = document.getElementsByTagName("li");

    console.log(elementsByTagName);

    let bigImg = document.getElementById("bigImg");
    var onHover = function (position) {
        bigImg.src = "images/0" + position + "big.jpg";
    };

    elementsByTagName[0].onmouseover = function () {
        onHover(1)
    };
    elementsByTagName[1].onmouseover = function () {
        onHover(2)
    };
    elementsByTagName[2].onmouseover = function () {
        onHover(3)
    };
    elementsByTagName[3].onmouseover = function () {
        onHover(4)
    };
    elementsByTagName[4].onmouseover = function () {
        onHover(5)
    };

};