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


