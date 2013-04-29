/**
 * Created with JetBrains WebStorm.
 * User: iAdem
 * Date: 4/28/13
 * Time: 11:09 PM
 * To change this template use File | Settings | File Templates.
 */

// SWIPE MENU

var body = document.getElementById("body"),
    tanO = .8,
    move = "",
    tan = 0,
    startX = 0,
    finishX = 0,
    diffX = 0,
    startY = 0,
    finishY = 0,
    diffY = 0;


// TOUCH START

document.body.addEventListener("touchstart", function (e) {
    onStart(e);
});

function onStart(e) {
    startY = e.pageY;
    startX = e.pageX;
}

// TOUCH MOVE

document.body.addEventListener("touchmove", function (e) {
    onMove(e);
});

function onMove(e) {

    finishX = e.pageX;
    diffX = Math.abs(finishX - startX);
    finishY = e.pageY;
    diffY = Math.abs(finishY - startY);
    tan = diffY / diffX;

    // SWIPE
    if (tan < tanO || move != "scroll") {

        e.preventDefault();
        move = "swipe";
        body.classList.add("drag");

        if (diffX > window.innerWidth - 96) diffX = window.innerWidth - 96
        //$("h2").html(diffX)

        // RIGHT SWIPE
        if (finishX > startX) {
            if (!body.classList.contains('navigation-open'))
                body.style.webkitTransform = 'translate3d(' + diffX + 'px, 0, 0)'
            else move = ""
        }
        // LEFT SWIPE
        else {
            if (body.classList.contains('navigation-open'))
                body.style.webkitTransform = 'translate3d(' + ((window.innerWidth - 96) - diffX) + 'px, 0, 0)';
            else move = ""
        }
    }

    // VERTICAL SCROLL
    else if (move != "swipe") {
        move = "scroll"
    }
}


// TOUCH END


document.body.addEventListener('touchend', function () {
    touchEnd()
});
document.body.addEventListener('touchcancel', function () {
    touchEnd()
});

function touchEnd() {
    body.classList.remove("drag");

    if (move == "swipe") {
        if (!body.classList.contains('navigation-open')) {
            if (diffX >= 123) navigationStatu(true)
            else navigationStatu(false)
        }
        else {
            if (diffX >= 123) navigationStatu(false)
            else navigationStatu(true)
        }
    }

    move = "";
}

// NAVIGATION SLIDE

function navigationStatu(statu) {
    if (statu) {
        body.classList.add("navigation-open");
        body.style.webkitTransform = 'translate3d(' + (window.innerWidth - 96) + 'px, 0, 0)';
    }
    else {
        body.classList.remove("navigation-open");
        body.style.webkitTransform = 'translate3d(0, 0, 0)';
    }
}