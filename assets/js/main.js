//Get JSON of portfolio works (async)
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let parsedJson = JSON.parse(xhttp.responseText);
        //List of categories        
        var item = '<ul>'
        parsedJson.forEach(type => {
            item += '<li '+'id="'+type.category+'">'+type.category+'</li>';
        });
        item += '</ul>'; 
        document.getElementById('categories-control').innerHTML = item;
        //Grid per category
        var newGrid = '';
        parsedJson.forEach(father => {
            const children = [];
            const getChildren = father.works;
            children.push(getChildren);
            newGrid += '<ul '+'id="grid-'+father.category+'">'+children+'</ul>'
            console.log(children);
        });
        newGrid = newGrid;
        document.getElementById('categories-grids').innerHTML = newGrid;
    }
};
xhttp.open("GET", "portfolio-works.json", true);
xhttp.send();

