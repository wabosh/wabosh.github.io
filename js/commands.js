/**
 * Loads all commands into the commands Array.
 */
function setUpCommands() {
    commands.push("restart");
    commands.push("help");
}

/**
 * Reloads the site.
 */
function restart() {
    location.reload();
}

/**
 *
 */
function help(e) {
    if(descriptions.hasOwnProperty(e)) {
        printOut(descriptions[e]);
    } else {
        jQuery.each(descriptions, function(i, val) {
            printOut(i);
        });
    }
}

var descriptions = {
    "restart": "Restarts the whole site so you can start from the beginning.",
    "help": "'help arg' shows help about a certain command  'help' displays all commands"
}