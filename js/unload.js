function unloadJS(scriptName) {
    var head = document.getElementsByTagName("head").item(0);
    var js = document.getElementById(scriptName);
    js.parentNode.removeChild(js);
}

function unloadAllJS() {
    var jsArray = new Array();
    jsArray = document.getElementsByTagName("script");
    for(i=0; i < jsArray.length;i++) {
        if(jsArray[i].id) {
            unloadJS(jsArray[i].id)
        } else {
            jsArray[i].parentNode.removeChild(jsArray[i]);
        }
    }
}