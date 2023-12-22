var BASE_URL = 'https://hn.algolia.com/api/v1/';

function doSearch(query){
    var url = BASE_URL + 'search?query=' + query + '&hitsPerPage=200';
    return fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            return data.hits;
        });
}
function addButtonEvent(){
    document.getElementById("searchButton").addEventListener('click',onSearch );
}
addButtonEvent();

function onSearch(){
    removeList();
    doSearch(getValueFromElementById("searchInput"))
        .then(appendList);
}
function appendList(list){
    var listNode = document.createElement('div')
    listNode.setAttribute("id","list");
    document.getElementById('app').appendChild(listNode);
    
    list.forEach(appendItem(listNode))
};

function appendItem(listNode){
    return function (item){
        var itemNode = document.createElement('div');
        var linkNode = document.createElement('a');
        linkNode.setAttribute("href",item.url);
        linkNode.appendChild(document.createTextNode(item.title));
        itemNode.appendChild(linkNode);
        listNode.appendChild(itemNode);
    }
}
function getValueFromElementById(id){
    return document.getElementById(id).value;
}
function removeList(){
    var list = document.getElementById('list');
    if(list){
        list.remove();
    }
}
