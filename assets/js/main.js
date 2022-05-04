//Get JSON of portfolio works (async)
var requestWorks = new XMLHttpRequest();
requestWorks.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let parsedWorks = JSON.parse(requestWorks.responseText);
        //Create  list of all works
        var allWorks = '<ul>';
        parsedWorks.forEach(work => {
            allWorks += '<li style="background-image: url('+work.image+');">'+work.title+'</li>';
        });
        allWorks += '</ul>';
        document.getElementById('works-grid').innerHTML = allWorks;
    }
};
requestWorks.open("GET", "portfolio-works.json", true);
requestWorks.send();
//Get JSON of portfolio categories (async)
var requestCategories = new XMLHttpRequest();
requestCategories.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let parsedCategories = JSON.parse(requestCategories.responseText);
        //List of categories (tab control)        
        var item = '<ul>';
        parsedCategories.forEach(category => {
            item += '<li '+'id="'+category.title+'">'+category.title+'</li>';
        });
        item += '</ul>'; 
        document.getElementById('categories-control').innerHTML = item;
    }
};
requestCategories.open("GET", "portfolio-categories.json", true);
requestCategories.send();
//

