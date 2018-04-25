/**
 * Created by 1603232 on 25/04/2018.
 */

function checkLogin() {

    var email = document.getElementById('login-email');
    var pword = document.getElementById('login-password');

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
