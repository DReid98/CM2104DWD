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
        addResultTitles(jsondata);
    })
}


function addResultTitles(jsondata) {
    //create string to contain HTML
    var htmlstring = "";
    //iterate through results
    for (var i = 0; i < 10; i++) {
        var title = jsondata.Search[i].Title;
        var link = jsondata.Search[i].Poster;
        htmlstring += "<li>" + title + " <a href='" + link + "'>Poster Link</a></li>";

    }

    $("#results").html(htmlstring);
}


/*
function printJSON(jsondata) {
    //prints JSON to the screen
    var pretty = JSON.stringify(jsondata, null, 4);
    $('#resultsbox').append("<pre>" + pretty + "</pre>");
}

/*
function addItemToList (item) {
    $('#results').append("<li>" + item + "</li>");
}
*/