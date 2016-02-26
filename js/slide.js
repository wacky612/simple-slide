(function() {
    var slides = document.getElementsByTagName("section");

    var getSlideIndex = function() {
        return parseInt(location.hash.slice(1).split("/")[0]);
    };

    var setSlideIndex = function(slideIndex) {
        location.hash = slideIndex + "/0";
    };

    var getPauseIndex = function() {
        return parseInt(location.hash.slice(1).split("/")[1]);
    };

    var setPauseIndex = function(pauseIndex) {
        location.hash = getSlideIndex() + "/" + pauseIndex;
    };

    var pauses = function() {
        return slides[getSlideIndex()].getElementsByClassName("pause");
    };

    var activateSlide = function(slideIndex) {
        if (!slides[slideIndex].classList.contains("active")) {
            slides[slideIndex].classList.add("active");
        }
    };

    var inactivateSlide = function(slideIndex) {
        if (slides[slideIndex].classList.contains("active")) {
            slides[slideIndex].classList.remove("active");
        }
    };

    var activatePause = function(pauseIndex) {
        if (!pauses()[pauseIndex].classList.contains("pauseactive")) {
            pauses()[pauseIndex].classList.add("pauseactive");
        }
    };

    var inactivatePause = function(pauseIndex) {
        if (pauses()[pauseIndex].classList.contains("pauseactive")) {
            pauses()[pauseIndex].classList.remove("pauseactive");
        }
    };

    var activatePausesTo = function(pauseIndex) {
        for (var i = 0; i < pauseIndex; i++) {
            activatePause(i);
        }
    }

    var inactivateAllPauses = function() {
        for (var i = 0; i < pauses().length; i++) {
            inactivatePause(i);
        }
    };

    var nextSlide = function() {
        var slideIndex = getSlideIndex();
        if (slideIndex < slides.length - 1) {
            inactivateAllPauses();
            inactivateSlide(slideIndex);
            activateSlide(slideIndex + 1);
            setSlideIndex(slideIndex + 1);
        }
    };

    var previousSlide = function() {
        var slideIndex = getSlideIndex();
        if (slideIndex > 0) {
            inactivateAllPauses();
            inactivateSlide(slideIndex);
            activateSlide(slideIndex - 1);
            setSlideIndex(slideIndex - 1);
            setPauseIndex(pauses().length);
            activatePausesTo(pauses().length);
        }
    };

    var nextPause = function() {
        var pauseIndex = getPauseIndex();
        if (pauseIndex < pauses().length) {
            activatePause(pauseIndex);
            setPauseIndex(pauseIndex + 1);
        }
    };

    var previousPause = function() {
        var pauseIndex = getPauseIndex();
        if (pauseIndex > 0) {
            setPauseIndex(pauseIndex - 1);
            inactivatePause(pauseIndex - 1);
        }
    };

    var next = function() {
        if (getPauseIndex() == pauses().length) {
            nextSlide();
        } else {
            nextPause();
        }
    };

    var previous = function() {
        if (getPauseIndex() == 0) {
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
        var slideIndex = getSlideIndex();
        var pauseIndex = getPauseIndex();
        if (isNaN(slideIndex)) {
            slideIndex = 0;
            pauseIndex = 0;
            setSlideIndex(slideIndex);
        } else if (isNaN(pauseIndex)) {
            pauseIndex = 0;
            setPauseIndex(pauseIndex);
        }
        activateSlide(slideIndex);
        activatePausesTo(pauseIndex);
        setFontSize();
    };

    window.onresize = function() {
        setFontSize();
    };
}());
