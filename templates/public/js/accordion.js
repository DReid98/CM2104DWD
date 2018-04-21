function listenerEx(i) {
    if($("#checkBox" + i).is(":checked")) {
        $("#bMount" + i).show();
        // bagMunro(i);
    } else {
        $("#bMount" + i).hide();
        // removeMunro(i);
    }
}


function bagMunro(mName) {
    $.ajax({
        type: "POST",
        url: '/bagmunro',
        data: {
            id: i
        },
        success: function(response) {
            console.log(response);
        }
    })
}

function removeMunro(mName) {
    $.ajax({
        type: "POST",
        url: '/removemunro',
        data: {
            id: i
        },
        success: function(response) {
            console.log(response);
        }
    })
}



var entityMap = {
    "'": '&#39;'
};


function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}

function returnHtml(string) {
    return String(string).replace('&#39;', function(s) {
        return entityMap[s];
    })
}


/*
$(document).ready(function() {
    var displayMunros = $('#accordion');

    $.ajax({
      type: "GET",
      url: "/munros",
      success: function(result)
      {
        // console.log(result.munros);
          console.log(result);
        // var munros = result.munros;
          var munros = result;

        for(var i = 0; i < munros.length; i++)
        {
          var output = "<h4 class='munrotitle'>" + munros[i].name + "<img class='bMount' id='bMount" + i + "' src='/img/blueMnt.png' alt='Blue Mountain'>";

          output += "</h4><div class='whiteback'><table><tr><td>Description: </td><td>" + munros[i].description + "</td></tr><tr><td>Region: </td><td>" + munros[i].region + "</td></tr><tr><td>Height: </td><td>" + munros[i].height + "</td></tr><tr><td>Latitude: </td><td>" + munros[i].latitude + "</td></tr><tr><td>Longitude: </td><td>" + munros[i].longitude + "</td></tr><tr><td>Grid Reference: </td><td>" + munros[i].gridReference + "</td></tr><tr><td>Difficulty: </td><td>";

            var height = munros[i].height.substring(0,5);
            if(height.substring(4,5) == "m") {
                height = height.substring(0,4);
            }
            height = parseInt(height);
            
            if (height > 1219) {
                output += "<img src='/img/redMnt.png' alt='Red Mountain'><img src='/img/redMnt.png' alt='Red Mountain'><img src='/img/redMnt.png' alt='Red Mountain'>";
            } else if (height > 1067) {
                output += "<img src='/img/yellowMnt.png' alt='Yellow Mountain'><img src='/img/yellowMnt.png' alt='Yellow Mountain'>";
            } else if (height > 914) {
                output += "<img src='/img/greenMnt.png' alt='Green Mountain'>";
            }

          output += "</td></tr><tr><td>Climbed: </td><td><input type='checkbox' id='checkBox" + i + "' onclick='listenerEx(" + i + ")'></td></tr></table></div>";
            
            currentFunction = function() {
                if($("#checkBox" + i).is(":checked")) {
                    $("#bMount" + i).show();
                    console.log("checked");
                } else {
                    console.log("unchecked");
                    $("#bMount" + i).hide();
                }
            };
            
//            console.log("creating listener for " + i);
            $("#checkBox" + i).click(function() {
                currentFunction();
                console.log(i);
            });
            
          displayMunros.append(output);
        }
        $( "#accordion" ).accordion({collapsible:true, active: false});
        $(".bMount").hide();
      }
  });
});
*/


function getAccordion(list,session) {
    var displayMunros = $('#accordion');

    $.ajax({
        type: "GET",
        url: "/munros",
        success: function(result)
        {
            // console.log(result.munros);
            console.log(result);
            // var munros = result.munros;
            var munros = result;

            for(var i = 0; i < munros.length; i++)
            {
                var output = "<h4 class='munrotitle'>" + munros[i].name + "<img class='bMount' id='bMount" + i + "' src='/img/blueMnt.png' alt='Blue Mountain'>";

                output += "</h4><div class='whiteback'><table><tr><td>Description: </td><td>" + munros[i].description + "</td></tr><tr><td>Region: </td><td>" + munros[i].region + "</td></tr><tr><td>Height: </td><td>" + munros[i].height + "</td></tr><tr><td>Latitude: </td><td>" + munros[i].latitude + "</td></tr><tr><td>Longitude: </td><td>" + munros[i].longitude + "</td></tr><tr><td>Grid Reference: </td><td>" + munros[i].gridReference + "</td></tr><tr><td>Difficulty: </td><td>";

                var height = munros[i].height.substring(0,5);
                if(height.substring(4,5) == "m") {
                    height = height.substring(0,4);
                }
                height = parseInt(height);

                if (height > 1219) {
                    output += "<img src='/img/redMnt.png' alt='Red Mountain'><img src='/img/redMnt.png' alt='Red Mountain'><img src='/img/redMnt.png' alt='Red Mountain'>";
                } else if (height > 1067) {
                    output += "<img src='/img/yellowMnt.png' alt='Yellow Mountain'><img src='/img/yellowMnt.png' alt='Yellow Mountain'>";
                } else if (height > 914) {
                    output += "<img src='/img/greenMnt.png' alt='Green Mountain'>";
                }

                var safeName = escapeHtml(munros[i].name);

                output += "</td></tr><tr><td>Climbed: </td><td><input type='checkbox' id='checkBox" + i + "' onclick='listenerEx(" + i + ")'></td></tr></table></div>";

                currentFunction = function() {
                    if($("#checkBox" + i).is(":checked")) {
                        $("#bMount" + i).show();
                        console.log("checked");
                    } else {
                        console.log("unchecked");
                        $("#bMount" + i).hide();
                    }
                };

//            console.log("creating listener for " + i);
                $("#checkBox" + i).click(function() {
                    currentFunction();
                    console.log(i);
                });




                displayMunros.append(output);

                if (session && $.inArray(munros[i].name, list) != -1) {
                    console.log(munros[i].name);
                    $("#checkBox" + i).attr('checked',true);
                    // $("#bMount" + i).show();
                    currentFunction();
                }
                else {
                    currentFunction();
                }

            }
            $( "#accordion" ).accordion({collapsible:true, active: false});
            // $(".bMount").hide();
        }
    });
}



function getUserMunros(callback) {
    $.ajax({
        type: "GET",
        url: "/usermunros",
        success: function(result) {
            callback(result);
        }
    });
}

function getSession(callback) {
    $.ajax({
        type: "GET",
        url: "/getsession",
        success: function(result) {
            console.log(result);
            callback(result);
        }
    });
}

$(document).ready(function() {

    var mBagged;

    getSession(function(sessdata) {
        if (sessdata) {
            getUserMunros(function(data){
                mBagged = data;

                getAccordion(mBagged,sessdata);

            })
        }
        else {
            mBagged = ["unknown"];
            getAccordion(mBagged,sessdata);

        }
    })

});





function myFunction() {
    // Declare variables
    var input, filter, h4, div, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    h4 = document.getElementsByTagName("h4");
//    acc = document.getElementById("accordion");
    div = document.getElementsByClassName("whiteback");
//    table = div.getElementsByTagName("table");
    
    // Loop through all munros, and hide those that don't match the search query
    // DO NOT CHANGE
    for(i = 0; i < h4.length; i++) {
        a = h4[i];
        if(a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            h4[i].style.display = "";
        } else {
            h4[i].style.display = "none";
        }
    }
    // DO NOT CHANGE
}



function addToUserList() {

}