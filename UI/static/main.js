'use-strict';

function DomManipulation(){}
DomManipulation.prototype.init = function(){
  const form = document.createElement('form');
  const input = document.createElement('input')
  input.id = "eml"
  form.id="frm"
  form.appendChild(input);
  return {
    form
  }
}



function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const btn = document.getElementById("loginbtn");
const p = document.getElementsByClassName('message')[0];
const url = 'https://store-manager-app.herokuapp.com/api/v2/auth/login';

btn.onclick = function () {
    p.innerHTML = ''
    var email = document.getElementById('eml').value;

    var password = document.getElementById('pwd').value;

    let data = JSON.stringify({
        'email': email,
        'password': password
    })

    // Create our request constructor with all the parameters we need
    let request = new Request(url, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });


    fetch(request)
        .then((resp) => resp.json())
        .then(function (data) {
            span = createNode('span');
            span.innerHTML = `${data.message || data.Message}`;
            append(p, span);
            if (`${data.message}` == "Login success") {
                window.location.href = 'home.html';
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
}

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



