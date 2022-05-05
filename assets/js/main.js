//Get JSON of portfolio works (async)
var requestWorks = new XMLHttpRequest();
requestWorks.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let parsedWorks = JSON.parse(requestWorks.responseText);
        //Create  list of all works
        var allWorks = '<ul>';
        parsedWorks.forEach(work => {
            allWorks += '<li><div class="lay"><h2>'+work.title+'</h2><p>'+work.categories[0]+'</p></div><img src="'+work.image+'" /></li>';
        });
        allWorks += '</ul>';
        document.getElementById('works-grid').innerHTML = allWorks;
    }
};
requestWorks.open("GET", "portfolio-works.json", true);
requestWorks.send();
//
//Get JSON of portfolio categories (async)
var requestCategories = new XMLHttpRequest();
requestCategories.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let parsedCategories = JSON.parse(requestCategories.responseText);
        //List of categories (tab control)        
        var item = '<ul>';
        parsedCategories.forEach(category => {
            item += '<li '+'id="'+category.title+'" onClick="filterWorks(event, this)" class="portfolio-tab">'+category.title+'</li>';
        });
        item += '</ul>'; 
        document.getElementById('categories-control').innerHTML = item;
        document.getElementById('all').classList.add('active');
    }
};
requestCategories.open("GET", "portfolio-categories.json", true);
requestCategories.send();
//
//Filter per categories (async)
function filterWorks(e, el){
    e = e || window.event;
    const pickedCategory = el.id;
    const clickedCategory = el;
    const alltabs = document.querySelectorAll('.portfolio-tab');
    alltabs.forEach(tab => {
        tab.classList.remove('active');
    });
    clickedCategory.classList.add('active');
    const worksContainer = document.getElementById('works-grid');
    if(pickedCategory === 'all'){
        worksContainer.classList.add('min-height');
    } else{
        worksContainer.classList.remove('min-height');
    }
    var requestFilteredWorks = new XMLHttpRequest();
    requestFilteredWorks.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let parsedWorks = JSON.parse(requestFilteredWorks.responseText);
            let filteredWorks = parsedWorks.filter(function(work){
                return work.categories.includes(pickedCategory);
            });
            //Create list of filtered works
            var worksByFilter = '<ul>';
            filteredWorks.forEach(work => {
                if(pickedCategory === 'all'){
                    worksByFilter += '<li><div class="lay"><h2>'+work.title+'</h2><p>'+work.categories[0]+'</p></div><img src="'+work.image+'" /></li>';
                }else{
                    worksByFilter += '<li><div class="lay"><h2>'+work.title+'</h2></div><img src="'+work.image+'" /></li>';
                }
                
            });
            worksByFilter += '</ul>';
            document.getElementById('works-grid').innerHTML = worksByFilter;
        }
    };
    requestFilteredWorks.open("GET", "portfolio-works.json", true);
    requestFilteredWorks.send();
}
//
//Open Mobile side menu
function openSideMenu(){
    const sideMenu = document.getElementById('main-nav');
    const mobileFade = document.getElementById('mobile-fade');
    sideMenu.classList.add('active');
    mobileFade.classList.add('active');
}
//
//Close Mobile side menu
function closeSideMenu(){
    const sideMenu = document.getElementById('main-nav');
    const mobileFade = document.getElementById('mobile-fade');
    sideMenu.classList.remove('active');
    mobileFade.classList.remove('active');

}


