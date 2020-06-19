function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getSavedValue(v) {
    if (localStorage.getItem(v) === null) {
        return "";
    }
    return localStorage.getItem(v);
}

function leadingZero(number) {
    if (Number(number) < 10) {
        number = "0" + number;
    }
    return number;
}

function toggleVisibilityHeight(DOM) {
    if ($(DOM).css("display") === "none") {
        $(DOM).animate({
            opacity: 1,
            height: "toggle"
        }, 700);
    } else {
        $(DOM).animate({
            opacity: 0,
            height: "toggle"
        }, 500);
    }
}

function toggleVisibilityWidth(DOM) {
    if ($(DOM).css("display") === "none") {
        $(DOM).animate({
            opacity: 1,
            width: "toggle"
        }, 700);
    } else {
        $(DOM).animate({
            opacity: 0,
            width: "toggle"
        }, 500);
    }
}

function addText(value) {
    $("#toSend").val(`${$("#toSend").val()}${value} `);
}

function tempChange(DOM, text, time) {
    let newText = `${$(DOM).text().replace(text, "")} ${text}`;

    $(DOM).html(newText);
    
    setTimeout(() => {
        $(DOM).html(newText.replace(text, ""));
    }, time);
}