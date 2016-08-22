/**
 * Echo : Prints the included params
 * @param msg The message to test with
 */
function echo(msg) {
    if( Object.prototype.toString.call( msg ) === '[object Array]' ) {
        var output = "echo: ";
        for(var i = 0; i < msg.length; i++) {
            output+=msg[i]+" ";
        }
        printLine(output);
    } else {
        printLine("echo: " + msg);
    }
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
 * Installs a command by the given package-name
 * @param packageName
 */
function install(packageName) {
    
}