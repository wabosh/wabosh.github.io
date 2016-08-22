var commands = Array();

$(document).ready(function() {
    commands.push("help");
});

$(document).keypress(function(e) {
    console.log(e.which);
    if(e.which == 8) {
        var text = $(".currentInput p").text();
        text = text.slice(0, -1);
        $(".currentInput p").text(text);
    }
    else if(e.which == 13) {
        var text = $(".currentInput p").text();
        executeTask(text, null, null);
    } else {
        $(".currentInput p").append(String.fromCharCode(e.which));
    }
});

function printLine(msg) {
    $('.inputs').find(' > li:last-child').before('<li><p>&gt;&gt; ' + msg + '</p></li>');
}

/**
 * Prints the issued command in a new <li> and inserts it before the currentInput, then it clears the currentInput.
 * @param fullText
 * @param command
 * @param args
 */
function executeTask(fullText) {
    $('.inputs').find(' > li:last-child').before('<li><p>&gt; ' + fullText + '</p></li>');
    $(".currentInput p").text("");
    $(".terminal").css({
        "height": $(document).height()
    });
    $(document).scrollTop($(document).height());

    // Task executing part
    if(fullText) {
        var strings = fullText.split(/[ ]+/);
        var fnstring = strings[0];

        

        var fnargs = Array();

        // include args
        for (var i = 1; i < strings.length; i++) {
            fnargs[i - 1] = strings[i];
        }

        // find function-object
        var fn = window[fnstring];

        if (typeof fn === "function") {
            fn.apply(null, fnargs);
        } else {
            printLine("\"" + fnstring + "\" not issued: command not found!");
        }
    }
}