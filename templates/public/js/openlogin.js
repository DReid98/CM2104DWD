
//Open Login pop-up
function openLogin() {
    $('#login').css("display","block");
}

//Close Login pop-up
function closeLogin() {
    $('#login').css("display","none");
}



// Set modal for window click close function
var modal = document.getElementById('login');

//Close Login Pop-up on window click
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};