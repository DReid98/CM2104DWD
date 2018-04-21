//If user logged in - show logout and profile nav buttons

$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "/getsession",
        success: function(sessdata)
        {
            if (sessdata) {
                //Hide Login button
                $('#nav-login').css("display","none");

                //Show profile and logout buttons
                $('#nav-profile').css("display","flex");
                $('#nav-logout').css("display","flex");
            }
            else {
                //Show Login button
                $('#nav-login').css("display","flex");

                //Hide profile and logout buttons
                $('#nav-profile').css("display","none");
                $('#nav-logout').css("display","none");
            }
        }
    })
});