document.addEventListener("DOMContentLoaded", function () {
    new Typed('#typed-text2', {
        strings: [
            "Moudud Hoq",
        ],
        typeSpeed: 80,
        backSpeed: 80,
        backDelay: 1000,
        loop: true
    });
});


$(document).ready(function () {
    $('.counter').counterUp({
        delay: 10, // delay in ms
        time: 1000 // total time in ms
    });
});