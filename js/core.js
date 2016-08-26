var currentProcess;
var message;
var commands = new Array();

/**
 * On startup.
 */
$(document).ready(function() {
    $(".main").css({
        "margin-top": $(".path").height() + "px"
    });
    // Add usable commands
    setUpCommands();
    // Sets username.
    waitInput("Login: ", function (e) {
        $(".user").text(e);
    });
});

/**
 * Sets a new Input-awaiting process.
 * @param message
 * @param process
 */
function waitInput(message, process) {
    currentProcess = process;
    this.message = message;
    println("");
}

/**
 * Prints a line with a given message in front.
 * @param msg
 */
function println(msg) {
    $(".current-line").text(message+msg);
}

/**
 * Copys the current line to an old one.
 */
function alterInput() {
    if($(".current-line").text()) {
        $(".current-line").before("<li>"+$(".current-line").text()+"</li>");
    }
}

function printOut(msg) {
    $(".current-line").before("<li>"+msg+"</li>");
}

/**
 * Registers key events and gives them to the active process.
 * @type {string}
 */
var input = "";
$(document).keydown(function(e) {
    if(e.which == 13) {
        if(currentProcess!=null) {
            currentProcess(input);
            input = "";
            currentProcess = null;
            message = "";
            if(currentProcess == null) {
                commandLine();
            }
        }
    } else {
        if(e.which >= 32 && e.which <= 111) {
            input+=e.key;
        } else if(e.which == 8) {
            input = input.slice(0, input.length-1);
        }
    }
    println(input);
});

/**
 * Runs the given command.
 */
function commandLine() {
    waitInput(">_ ", function(e) {
        executeTask(e);
    });
}

/**
 * Executes the command or gives an error if it wasn't found.
 * @param fullText
 */
function executeTask(e) {
    // Task executing part
    if(e) {
        alterInput();
        var strings = e.split(/[ ]+/);
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
                println("\"" + fnstring + "\" not issued: command not found!");
            }
        } else {
            println("\"" + fnstring + "\" not issued: command not found!");
        }
    }
    $(".terminal").css({
        "height": $(document).height()
    });
    $(document).scrollTop($(document).height());
}