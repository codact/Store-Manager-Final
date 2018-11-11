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
            if (data.products) {
                data.products.forEach(product => {
                    oneproduct += `
                <div class="product" id="prod>
                        <img class="product-image" src="./images/product1.jpg" alt="product1" />
                        <h5 id="item-title">${product.title}</h5>
                        <h5 id="item-price">Ksh.&nbsp;${product.price}</h5>
                        <button id="add" class="button" onclick="openModal('${product.id}')">Add&nbsp;<i class="fa fa-cart-plus"></i></button>
                    </div>
                    `
                    localStorage.setItem('product', JSON.stringify(data.products))
                    document.getElementById("products").innerHTML = oneproduct
                });
            }
            else {
                alert(data.Message || data.message);
                window.location.replace("./admin/manage_products.html")
            }
        })
        .catch((err) => {
            console.log(err);
        })
}



//variables to get all html elements by their id
let details = document.getElementById("description");
let cart_items = document.getElementById("carticon");


//function to set modal display to inline if button clicked
function openModal(product_id) {
    details.innerHTML = '';
    let prod_id = product_id;
    details.style.display = "inline";
    let token = localStorage.getItem('token')
    fetch(`https://store-manager-app.herokuapp.com/api/v2/products/` + prod_id, {
        headers: { 'x-access-token': token }
    })
        .then(res => res.json())
        .then(data => {
            let prod = data.Product
            let modalcontent = ``;
            modalcontent += `
                <div class="modal-content">
                <h1><span id="closeDetails" class="close">&times;</span></h1>
                <div class="modal-title">
                    <h1 id="titleprod">${prod.title}</h1>
                </div>
                <div class="container">
                    <div class="pic">
                        <img class="product-image" src="images/product1.jpg" />
                    </div>
                    <div class="detail">
                        <table>
                            <tr>
                                <td>Category: </td>
                                <td id="categoryprod"> ${prod.category}</td>
                            </tr>
                            <tr>
                                <td>Quantity: </td>
                                <td id="quantityprod"> ${data.Product.quantity}</td>
                            </tr>
                            <tr>
                                <td>Minimum quantity:</td>
                                <td id="minimumprod">${prod.minimum_stock}</td>
                            </tr>
                            <tr>
                                <td>Price:</td>
                                <td id="priceprod">${prod.price}</td>
                            </tr>

                        </table><hr>
                        <h5>Enter sale quantity</h5> <input required id="quanty" type="text" size=10 placeholder="Quantity"><br><br><br>
                        <button class="button" onclick="addToCart()" id="proceed">Proceed&nbsp;<i class="fa fa-cart-plus"></i></button>
                    </div>
                </div>
            </div>`
            details.innerHTML = modalcontent;
            document.getElementById("closeDetails").addEventListener("click", closeDetails);
            function closeDetails() {
                details.style.display = "none";
            }
        })

    //function to close modal if a person clicks outside its main body
    window.onclick = function (event) {
        if (event.target == details) {
            details.style.display = "none";
        }
    }

}

function addToCart() {
    let quantity = document.getElementById("quanty").value;
    if (localStorage.getItem("role") == "true") {
        alert("This function is preserved for attendants");
        details.style.display = "none";
    }
    else if (quantity == "") {
        alert("Enter the quantity to sell");
    }
    else {
        let title = document.getElementById("titleprod").innerHTML;
        let priceprod = document.getElementById("priceprod").innerHTML;
        let items = document.getElementById("items");

        item = `
            <li>${title}
            <span class="price"> Price: ${priceprod}&nbsp;&nbsp;&nbsp;
            <span class="quantity"> Quantity: ${quantity}&nbsp;&nbsp;&nbsp;
            <span class="remove-item">x</span>
            </li>
            `

        items.innerHTML = item;
        localStorage.setItem("cartitem", item);
        alert("Success");
        details.style.display = "none";
    }
}

function openCart() {
    let cart = document.getElementById("cart");
    cart.style.display = "block";
    window.onclick = function (event) {
        if (event.target == cart) {
            cart.style.display = "none";
        }
    }

    document.getElementById("closecart").addEventListener("click", closeCart);
    function closeCart() {
        cart.style.display = "none";
    }
}
