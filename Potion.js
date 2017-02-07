function Potion(ingredients, effects) {
    if(typeof effects!="object" || !effects instanceof Array)
        effects = ingredient_shared_effects(ingredients);
    this.effect_names = [];
    // making copy of the array for safety
    this.effect_names.push.apply(this.effect_names, effects);
    this.ingredients = [];
    this.extensions = [];
    ingredients.forEach((ingr)=>{
        this.ingredients.pushUnique(ingr.name);
        if(ingr.extensions instanceof Array && ingr.extensions.length>0)
            this.extensions.pushUnique.apply(this.extensions, ingr.extensions);
    });
    this.value = effects_value(effects);
    
    this.effect_names.sort();
    this.ingredients.sort();
}
Potion.prototype.equals = function(potion) {
     if(this.value != potion.value)
         return false;
     if(potion.ingredients.length!=this.ingredients.length)
         return false;
     for(var i=0,l=this.ingredients.length; i<l; ++i) {
         if(!potion.hasIngredient(this.ingredients[i]))
             return false;
     }
     return true;
}
Potion.prototype.hasExtension = function() {
    return this.extensions.length>0;
}
Potion.prototype.hasIngredient = function(name) {
     return this.ingredients.indexOf(name)!=-1;
}
Potion.prototype.hasEffect = function(name) {
     return this.effect_names.indexOf(name)!=-1;
}
Potion.prototype.effectCount = function() {
     return this.effect_names.length;
}
Potion.prototype.asTableRow = function() {
    var tr = document.createElement("tr");
    var effects = document.createElement("td");
    this.effect_names.forEach(function(name) {
        var p = document.createElement("p");
        p.appendChild(new Text(name));
        effects.appendChild(p);
    });
    var ingredients = document.createElement("td");
    this.ingredients.forEach(function(name) {
        var p = document.createElement("p");
        p.appendChild(new Text(name));
        ingredients.appendChild(p);
    });
    var value = document.createElement("td");
    value.appendChild(new Text(this.value));
    
    var extensions = document.createElement("td");
    this.extensions.forEach(function(name) {
        var span = document.createElement("span");
        span.className = "extension";
        span.appendChild(new Text(name));
        extensions.appendChild(span);
    });
    tr.appendChild(effects);
    tr.appendChild(ingredients);
    tr.appendChild(value);
    tr.appendChild(extensions);
    return tr;
}
Potion.prototype.toJSON = function() {
    return {
        ingredients: this.ingredients,
        effects: this.effect_names,
        extensions: this.extensions,
        value: this.value 
    }

}