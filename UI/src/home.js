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
            if (data.Message == "token invalid"){
                window.location.replace("index.html");
            }
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

//function to set modal display to inline if button clicked
function openModal(product_id) {
    details.innerHTML = '';
    let prod_id = product_id;
    details.style.display = "inline";
    let token = localStorage.getItem('token')
    let product = JSON.parse(localStorage.getItem("product"));
    fetch(`https://store-manager-app.herokuapp.com/api/v2/products/`+prod_id, {
        headers: { 'x-access-token': token }
    })
        .then(res => res.json())
        .then(data => {
            let prod = data.Product
            let modalcontent = ``;
            modalcontent += `
                <div class="modal-content">
                <div class="modal-title">
                    <h1>${prod.title}</h1>
                </div>
                <div class="container">
                    <div class="pic">
                        <img class="product-image" src="images/product1.jpg" />
                    </div>
                    <div class="detail">
                        <table>
                            <tr>
                                <td>Category: </td>
                                <td> ${prod.category}</td>
                            </tr>
                            <tr>
                                <td>Quantity: </td>
                                <td> ${data.Product.quantity}</td>
                            </tr>
                            <tr>
                                <td>Minimum quantity:</td>
                                <td>${prod.minimum_stock}</td>
                            </tr>
                            <tr>
                                <td>Price:</td>
                                <td>${prod.price}</td>
                            </tr>

                        </table>
                        <p>Description</p> ${prod.description}<br><br><br>
                        <button class="button" id="proceed">Proceed&nbsp;<i class="fa fa-cart-plus"></i></button>
                    </div>
                </div>
            </div>`
                    details.innerHTML = modalcontent;
                })

    //function to close modal if a person clicks outside its main body
    window.onclick = function (event) {
        if (event.target == details || event.target == cart_items) {
            details.style.display = "none";
            cart_items.style.display = "none";
        }
    }

}

