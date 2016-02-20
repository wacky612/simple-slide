(function() {
    var slides = document.getElementsByTagName("section");
    var slideIndex = 0;
    var pauseIndex = 0;

    var pauses = function() {
        return slides[slideIndex].getElementsByClassName("pause");
    };

    var activateSlide = function(index) {
        slides[index].classList.add("active");
    };

    var inactivateSlide = function(index) {
        slides[index].classList.remove("active");
    };

    var nextSlide = function() {
        if (slideIndex < slides.length - 1) {
            inactivateSlide(slideIndex);
            slideIndex = slideIndex + 1;
            activateSlide(slideIndex);
            pauseIndex = 0;
        }
    };

    var previousSlide = function() {
        if (slideIndex > 0) {
            inactivateSlide(slideIndex);
            slideIndex = slideIndex - 1;
            activateSlide(slideIndex);
            pauseIndex = pauses().length;
        }
    };

    var nextPause = function() {
        if (pauseIndex < pauses().length) {
            pauses()[pauseIndex].classList.add("pauseactive");
            pauseIndex = pauseIndex + 1;
        }
    };

    var previousPause = function() {
        if (pauseIndex > 0) {
            pauseIndex = pauseIndex - 1;
            pauses()[pauseIndex].classList.remove("pauseactive");
        }
    };

    var next = function() {
        if (pauseIndex == pauses().length) {
            nextSlide();
        } else {
            nextPause();
        }
    };

    var previous = function() {
        if (pauseIndex == 0) {
            previousSlide();
        } else {
            previousPause();
        }
    };

    var setFontSize = function() {
        var html = document.getElementsByTagName("html")[0];
        html.style.fontSize = (html.offsetHeight / 18) + "px";
    };

    document.onkeydown = function(e) {
        switch(e.keyCode) {
        case  8: // BackSpace
        case 37: // LeftArrow
            previous();
            break;
        case 13: // Enter
        case 39: // RightArrow
            next();
            break;
        }
    };

    window.onload = function() {
        activateSlide(slideIndex);
        setFontSize();
    };

    window.onresize = function() {
        setFontSize();
    };
}());
