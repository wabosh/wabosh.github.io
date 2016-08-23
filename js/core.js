var commands = Array();
var level = 1;
var busy = false;
var path = "files";
var commandStack = new Array();
var commandStackIndicator = commandStack.length;

$(document).ready(function() {
    $("#inputfield").focus();
    unloadAllJS();
    commands.push("help");
    commands.push("clear");
    commands.push("install");
    commands.push("ptask");
    commands.push("restart");
    commands.push("cms");
    ptask();
    printLine("type 'help' for further commands.");
    printLine("----------------------------------------------------------------------------------");
});

$(document).keydown(function(e) {
    if(!busy) {
        console.log(e.which);
        if (e.which == 8) {
            var text = $(".currentInput p").text();
            text = text.slice(0, -1);
            $(".currentInput p").text(text);
        }
        else if (e.which == 13) {
            var text = $(".currentInput p").text();
            executeTask(text, null, null);
        } else if((e.which >= 32 && e.which <= 126 && e.which != 38 && e.which != 40) || (e.which >= 127 && e.which <= 563)) {
            $(".currentInput p").append(e.key);
        } else if(e.which == 38 || e.which == 40) {
            controlCommandStack(e.which);
        } else if(e.which == 9) {
            var text = $(".currentInput p").text();
            completeCommand(text);
        }
    }
    return false;
});

/**
 * completes the current typed command-snippet
 */
function completeCommand(text) {
    var foundi = 0;
    var cmdFound = "";
    for(i = 0; i < commands.length; i++) {
        if(commands[i].match("^"+text)) {
            cmdFound = commands[i];
            foundi++;
        }
    }
    if(foundi==1) {
        $(".currentInput p").text(cmdFound);
    }
}

/**
 * Prints the given String on the command-line
 * @param msg
 */
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

    // Task executing part
    if(fullText) {
        commandStack.push(fullText);
        commandStackIndicator = commandStack.length;
        var strings = fullText.split(/[ ]+/);
        var fnstring = strings[0];
        fnstring = fnstring.toLowerCase();

        var commandFound = $.inArray(fnstring, commands) > -1;

        if(commandFound) {
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
        } else {
            printLine("\"" + fnstring + "\" not issued: command not found!");
        }
    }
    $(".terminal").css({
        "height": $(document).height()
    });
    $(document).scrollTop($(document).height());
}

/**
 * Controls the command stack by arrow up and down
 * @param e
 */
function controlCommandStack(e) {
    if(e==40) {
        if(commandStackIndicator < commandStack.length-1) {
            commandStackIndicator += 1;
            $(".currentInput p").text(commandStack[commandStackIndicator]);
            return;
        }
    } else {
        if(commandStackIndicator > 0) {
            commandStackIndicator -= 1;
            $(".currentInput p").text(commandStack[commandStackIndicator]);
            return;
        } else if(commandStackIndicator == 0) {
            $(".currentInput p").text(commandStack[commandStackIndicator]);
            return;
        }
    }
    $(".currentInput p").text("");
}

/**
 * Toggles the busy-boolean. (It determines whether or not input is accepted)
 */
function toggleBusy() {
    busy = !busy;
}

/**
 * Reads all filenames in the given directory.
 * @param dir
 * @returns {Array}
 */
function getFiles(dir){
    var fileList = new Array();
    $.ajax({
        //This will retrieve the contents of the folder if the folder is configured as 'browsable'
        url: '../../'+dir,
        success: function (data) {
            //List all png or jpg or gif file names in the page
            $(data).find().each(function () {
                var filename = this.href.replace(window.location.host, "").replace("http:///", "");
                fileList.push(filename);
            });
        }
    });
    return fileList;
}