 var table = document.querySelector("table.wikitable.sortable.jquery-tablesorter");
var ingredients = {};

for(var i=0, l=table.rows.length; i<l; ++i) {
    var tr = table.rows[i];
    var cells = tr.cells;
    var links = cells[1].querySelectorAll("a");
    if(links.length==0)
        continue;
    var ingredient_names = [];
    var last_ingredient;
    // Map ingredient name => list of extensions
    var extensions = {};
    for(var k=0, link_count=links.length; k<link_count; ++k) {
        var text = links[k].childNodes[0].data;
        if(text) {
            if(text.length>2) {
                ingredient_names.push(last_ingredient = text);
            }
            else if(text.length==2) {
                var link = links[k];
                if(link.parentNode.tagName.toLowerCase()=="sup") {
                     (extensions[last_ingredient] = extensions[last_ingredient] instanceof Array?extensions[last_ingredient]:[]).push(text);
                } else console.log(link, link.parentNode);
            }
        }
        
    }
    var value = cells[6].childNodes[0].data*1;
    var name = cells[0].querySelector("a").childNodes[0].data;

    for(var q=0, lq=ingredient_names.length; q<lq; ++q) {
        var ingredient_name = ingredient_names[q];
        var ingredient = ingredients[ingredient_name]!=null?ingredients[ingredient_name]:{name: ingredient_name, effects:{}, extensions: []};
        ingredient.effects[name] = {cost: value};
        ingredients[ingredient_name] = ingredient;
        if(extensions[ingredient_name]) {
            extensions[ingredient_name].forEach(function(extension_name) {
                if(ingredient.extensions.indexOf(extension_name)==-1) {
                    ingredient.extensions.push(extension_name);
                    console.log(ingredient_name, extension_name);
                }
            });
        }
    }
}
console.log(JSON.stringify(ingredients));