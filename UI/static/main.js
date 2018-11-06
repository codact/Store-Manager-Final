
//variables to get all html elements by their id
let details = document.getElementById("description");
let close = document.querySelector(".close");
let close_btn = document.querySelector(".close-btn");
let cart_items = document.getElementById("cart");

//function to set modal display to inline if button clicked
function openModal() {
    details.style.display = "inline";
}
//Function to run when an item is added to cart
function added() {
    alert("Added!!");
    details.style.display = "none";
}

//function to open the cart modal if button clicked
function openCart() {
    cart_items.style.display = "block";
}

//function to close modal if close button is clicked
close.onclick = function () {
    cart_items.style.display = "none";
}

//function for the close button in cart modal
close_btn.onclick = function () {
    details.style.display = "none";
}

//function to close modal if a person clicks outside its main body
window.onclick = function (event) {
    if (event.target == details || event.target == cart_items) {
        details.style.display = "none";
        cart_items.style.display = "none";
    }
}

//Deleting a sale record notification
function deleted() {
    alert("Successfully Deleted!");
}


const url = 'https://store-manager-app.herokuapp.com/api/v2';
    fetch(request)
        .then(function (data) {
            window.location.href = 'index.html';
        })
        .catch(function (error) {
            console.log(error.message);
        });

