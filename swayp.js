/**
 * Author   : Adem ilter
 * Date     : 3/28/13
 * Time     : 11:09 PM
 * Twitter  : @ademilter
 * Github   : ademilter
 */

var body = document.getElementById("body"),
    tanO = .8,
    move = "",
    tan = 0,
    startX = 0,
    finishX = 0,
    diffX = 0,
    startY = 0,
    finishY = 0,
    diffY = 0,
    corner = 60;


document.body.addEventListener("touchstart", function (e) {
    onStart(e);
});

document.body.addEventListener("touchmove", function (e) {
    onMove(e);
});

document.body.addEventListener('touchend', function () {
    touchEnd()
});
document.body.addEventListener('touchcancel', function () {
    touchEnd()
});


function onStart(e) {
    startY = e.pageY;
    startX = e.pageX;
}

function onMove(e) {

    finishX = e.pageX;
    diffX = Math.abs(finishX - startX);
    finishY = e.pageY;
    diffY = Math.abs(finishY - startY);
    tan = diffY / diffX;

    // SWIPE
    if ((tan < tanO && move != "scroll") || move == "swipe") {

        move = "swipe";
        body.classList.add("drag");


        // RIGHT SWIPE
        if (finishX > startX) {
            if (!body.classList.contains('navigation-open')) {
                body.style.webkitTransform = 'translate3d(' + diffX + 'px, 0, 0)';
                e.preventDefault();
            }
            else move = "scroll"
        }
        // LEFT SWIPE
        else {
            if (diffX > window.innerWidth - corner) diffX = window.innerWidth - corner

            if (body.classList.contains('navigation-open')) {
                body.style.webkitTransform = 'translate3d(' + ((window.innerWidth - corner) - diffX) + 'px, 0, 0)';
                e.preventDefault();
            }
            else move = "scroll"
        }
    }
    // VERTICAL SCROLL
    else if (move != "swipe") {
        move = "scroll"
    }
}


function touchEnd() {
    body.classList.remove("drag");

    if (move == "swipe") {
        if (!body.classList.contains('navigation-open')) {
            if (diffX >= corner) navigationStatu(true)
            else navigationStatu(false)
        }
        else {
            if (diffX >= corner) navigationStatu(false)
            else navigationStatu(true)
        }
    }
    move = "";
}

// NAVIGATION SLIDE

function navigationStatu(statu) {
    if (statu) {
        body.classList.add("navigation-open");
        body.style.webkitTransform = 'translate3d(' + (window.innerWidth - corner) + 'px, 0, 0)';
    }
    else {
        body.classList.remove("navigation-open");
        body.style.webkitTransform = 'translate3d(0, 0, 0)';
    }
}