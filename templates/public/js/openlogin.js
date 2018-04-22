
//Open Login pop-up
function openLogin() {
    $('#login').css("display","block");
}
/*
//Close Login pop-up
function closeLogin() {
    $('#login').css("display","none");
}
*/

// Close Login/Register/Password Box
function closeBox(boxId) {
    $(boxId).css("display","none");
}

// Open Login/Register/Password Box
function openBox(boxId) {
    $(boxId).css("display","block");
}

/*
// Set modal for window click close function
var login = document.getElementById('login');
var reg = document.getElementById('register');
var pass = document.getElementById('forgottenPassword');

//Close Login Pop-up on window click
window.onclick = function(event) {
    closeBox(event.target.id);
};
    */