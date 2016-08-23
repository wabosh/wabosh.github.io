var packages = {
    "ls.asd.org" : "ls"
};

/**
 * Restarts the game by refreshing the page.
 */
function restart() {
    location.reload();
}

/**
 * Clears all content on Screen
 */
function clear() {
    $('.inputs li:not(:last)').remove();
    $(".terminal").css({
        "height": $(window).height()
    });
}

/**
 * prints help for common commands
 */
function help() {
    printLine("Available commands:");
    printLine("-------------------");
    for(var i = 0; i < commands.length; i++) {
        printLine("| "+commands[i]);
    }
    printLine("-------------------");
}

/**
 * Prints the current task.
 */
function ptask() {
    switch(level) {
        case 1:
            printLine("-> 1. Task: Gain Access to the filesystem (note: It isn't a real filesystem)");
            break;
        default:
            printLine("-> -1. No current task.");
            break;
    }
}

/**
 * Installs a command by the given package-name
 * @param packageName
 */
function install(packageName) {
    if(packageName in packages) {
        commands.push(packages[packageName]);
        toggleBusy();
        setTimeout(function() {
            printLine("Package "+packageName+" successfully installed!");
            toggleBusy();
        }, 2000);

    } else {
        printLine("Package not found!");
    }
}

/**
 * Shows the content of the current directory in the fs
 */
function ls() {
    var files = getFiles(path);
    for(i = 0; i < files.length; i++) {
        printLine(files[i]);
    }
}

/**
 * Prints the content of the commandstack
 */
function cms() {
    for(i = 0; i < commandStack.length; i++) {
        printLine(commandStack[i]);
    }
}