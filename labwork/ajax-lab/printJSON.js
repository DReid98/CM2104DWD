$(function() {
    //document ready
    alert("document ready");

    $('#searchform').submit(function(){
        var searchterms = $("#searchterms").val();
        // addItemToList(searchterms);
        getResultsFromOMDB(searchterms);
        return false;
    });

});

function getResultsFromOMDB(searchterms) {
    var url = "http://www.omdbapi.com/?apikey=cbd27b70&s=" + searchterms;
    //use jquery json shortcut
    $.getJSON(url, function(jsondata) {
        //handle the results
        printJSON(jsondata);
    })
}

function printJSON(jsondata) {
    //prints JSON to the screen
    var normal = JSON.stringify(jsondata);
    $('#resultsbox').append("<p>" + normal + "</p>");
}

function addItemToList (item) {
    $('#results').append("<li>" + item + "</li>");
}