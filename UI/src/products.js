'use-strict';

window.onload = function getProducts(e) {
    fetch('https://store-manager-app.herokuapp.com/api/v2/products', {
        headers: {
            'x-access-token': localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(data => {
            let oneproduct = ''
            data.products.forEach(product => {
                oneproduct += `
                <div class="product">
                        <img class="product-image" src="images/product1.jpg" alt="product1" />
                        <h5 id="item-title">${product.title}</h5>
                        <h5 id="item-price">${product.price}</h5>
                        <button id="add" class="button" onclick="openModal()">Add&nbsp;<i class="fa fa-cart-plus"></i></button>
                    </div>
                    `
                localStorage.setItem('product', JSON.stringify(data.products))
                document.getElementById("products").innerHTML = oneproduct
            });
        })
        .catch((err) => {
            console.log(err);
        })
}



//variables to get all html elements by their id
let details = document.getElementById("description");

//function to set modal display to inline if button clicked
function openModal() {
    details.style.display = "inline";
    let product = JSON.parse(localStorage.getItem("product"));

    let prodtitle = document.getElementById("item-title").innerHTML;

    console.log(prodtitle)
    for (i = 0; i < product.length; i++) {
        if (product[i].title == prodtitle) {
            token = localStorage.getItem("token")
            fetch(`https://store-manager-app.herokuapp.com/api/v2/products/${product[i].id}`, {
                headers: { 'x-access-token': token }
            })
                .then(res => res.json())
                .then(data => {

                    let modalcontent = `
                <div id="closer" class="close-btn">&times;</div>
                <div class="modal-content">
                <div class="modal-title">
                    <h1>${data.Product.title}</h1>
                </div>
                <div class="container">
                    <div class="pic">
                        <img class="product-image" src="images/product1.jpg" />
                    </div>
                    <div class="detail">
                        <table>
                            <tr>
                                <td>Category: </td>
                                <td> ${data.Product.category}</td>
                            </tr>
                            <tr>
                                <td>Quantity: </td>
                                <td> ${data.Product.quantity}</td>
                            </tr>
                            <tr>
                                <td>Minimum quantity:</td>
                                <td>${data.Product.minimum_stock}</td>
                            </tr>
                            <tr>
                                <td>Price:</td>
                                <td>${data.Product.price}</td>
                            </tr>
                            
                        </table><br><br><br>
                        Description: ${data.Product.description}<br><br><br>
                        <button class="button" onclick="added()">Proceed&nbsp;<i class="fa fa-cart-plus"></i></button>
                    </div>
                </div>
            </div>`
                    details.innerHTML = modalcontent;
                })
        }
    }




let close = document.querySelector(".close");
// let closebtn = document.getElementById("closer");
let cart_items = document.getElementById("cart");

// closebtn.addEventListener("click", closeModal)

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

// function for the close button in cart modal
// function closeModal() {
//     details.style.display = "none";
// }

//function to close modal if a person clicks outside its main body
window.onclick = function (event) {
    if (event.target == details || event.target == cart_items) {
        details.style.display = "none";
        cart_items.style.display = "none";
    }
}

}


