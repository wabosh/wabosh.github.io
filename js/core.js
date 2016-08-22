var commands = Array();
var level = 1;
var busy = false;
var path = "files";
var commandStack = new Array();
var commandStackIndicator = commandStack.length + 1;

$(document).ready(function() {
    $("#inputfield").focus();
    unloadAllJS();
    commands.push("help");
    commands.push("clear");
    commands.push("install");
    commands.push("ptask");
    commands.push("restart");
    printLevelTask();
    printLine("type 'help' for further commands.");
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
        } else {
            $(".currentInput p").append(String.fromCharCode(e.which));
        }
    }
    return false;
});

/**
 * Prints the given String on the command-line
 * @param msg
 */
function printLine(msg) {
    $('.inputs').find(' > li:last-child').before('<li><p>&gt;&gt; ' + msg + '</p></li>');
}

/**
 * Prints the current Task
 */
function printLevelTask() {
    switch(level) {
        case 1:
            printLine("-> 1. Task: Gain Access to the filesystem (disclaimer: It isn't a real filesystem)");
            break;
        default:
            printLine("-> -1. No current task.");
            break;
    }
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
    fileList = [];

    var files = fs.readdirSync(dir);
    for(var i in files){
        if (!files.hasOwnProperty(i)) continue;
        var name = dir+'/'+files[i];
        if (!fs.statSync(name).isDirectory()){
            fileList.push(name);
        }
    }
    return fileList;
}