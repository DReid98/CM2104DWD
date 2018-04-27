/**
 * Created by 1603232 on 25/04/2018.
 */

// public/js/check-login.js

// NOT CURRENTLY IMPLEMENTED

// JS for live/client-side login checks

/*
function checkLogin() {

    var email = document.getElementById('login-username').innerText;
    var pword = document.getElementById('login-password').innerText;

    $.ajax({
        type: "GET",
        url: "/checklogin",
        data: {
            "email": email,
            "password": pword
        },
        success: function(result)
        {
            if(result) {
                document.getElementById('login-message').innerText = result;
            }
            else {
                document.getElementById('login-form').submit();
            }
        }
    })

}
*/

function checkUsername() {
    var uname = document.getElementById('login-username').value;

    $.ajax({
        type: "POST",
        url: "/checkusername",
        data: {
            "username": uname
        },
        success: function(result) {
            console.log("RESULT:" + result);
            if (result) {
                $('#login-message').innerHTML = result;
            }
            else {
                $('#login-message').innerHTML = "Username Accepted";
            }

        }
    })

}