// courtesy to myself: http://stackoverflow.com/a/14853974/607407

function extend_prototype_safe(proto, name, func) {
    if(typeof proto[name]!="undefined")
        console.warn("Overriding existing ",name," in ",proto,". Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
    // attach the .equals method to Array's prototype to call it on any array
    proto[name] = func;
    // Hide method from for-in loops
    Object.defineProperty(proto, "equals", {enumerable: false});
}

extend_prototype_safe(Array.prototype, "equals", function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
});
extend_prototype_safe(Array.prototype, "pushUnique", function (elm) {
    if(arguments.length>1) {
       for(var i=0,l=arguments.length; i<l; ++i) {this.pushUnique(arguments[i]);}
       return;
    }
    if(this.indexOf(elm)==-1) {
        this.push(elm);
    }
});
