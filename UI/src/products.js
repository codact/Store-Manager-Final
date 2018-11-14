
window.onload = () => {
    document.getElementsByClassName("product-section")[0].style.width = "0%";
    fetch("https://store-manager-app.herokuapp.com/api/v2/products", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                let output = `<tr>
                <th>
                    Id
                </th>
                <th>
                    Name
                </th>
                <th>
                    Category
                </th>
                <th>
                    Price
                </th>
                <th>
                    Amount
                </th>
                <th>
                    Min_stock
                </th>
                <th>
                    Description
                </th>
                <th>
                </th>
                <th>
                </th>
            </tr>`;
                data.products.forEach((product) => {
                    output += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.title}</td>
                        <td>${product.category}</td>
                        <td>${product.price}</td>
                        <td>${product.quantity}</td>
                        <td>${product.minimum_stock}</td>
                        <td>${product.description}</td>
                        <td><button class="button" onclick = "openUpdateSection(${product.id})"><i class="fa fa-edit"></i></button></td>
                        <td><button class="button" onclick = "deleteProduct(${product.id})"><i class="fa fa-trash"></i></button></td>
                    </tr>
                `;
                    document.getElementById("productstable").innerHTML = output;
                });
                localStorage.setItem("allproducts", JSON.stringify(data.products));
            }
            else {
                alert("No products to fetch");
            }
        });
}

function deleteProduct(productId) {
    let thisproductId = productId
    let option = confirm("Do you really want to delete this product?");
    if (option) {
        fetch("https://store-manager-app.herokuapp.com/api/v2/products/" + thisproductId, {
            method: "DELETE",
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message || data.Message);
                window.location.reload();
            });
    }
}


let productfrm = document.getElementById("prodform");
let updatefrm = document.getElementById("updatefrm");

function openUpdateSection(productId) {
    document.getElementsByClassName("product-menu")[0].style.width = "66%";
    productfrm.style.display = "none";
    updatefrm.style.display = "block";
    updatefrm.style.width = "100%";
    document.getElementsByClassName("product-section")[0].style.width = "45%";
    let currentproductId = productId;
    localStorage.setItem("productId", productId);
    fetch("https://store-manager-app.herokuapp.com/api/v2/products/" + currentproductId, {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("ptitle").value = data.Product.title;
            document.getElementById("pcategory").value = data.Product.category;
            document.getElementById("pprice").value = data.Product.price;
            document.getElementById("pquantity").value = data.Product.quantity;
            document.getElementById("pminimum_stock").value = data.Product.minimum_stock;
            document.getElementById("pdescription").value = data.Product.description;
        });
}
if (updatefrm) {
    updatefrm.onsubmit =
        function updateProduct(e) {
            e.preventDefault();
            let title = document.getElementById("ptitle").value,
                category = document.getElementById("pcategory").value,
                price = document.getElementById("pprice").value,
                quantity = document.getElementById("pquantity").value,
                minimumStock = document.getElementById("pminimum_stock").value,
                description = document.getElementById("pdescription").value,
                productId = localStorage.getItem("productId");
            let option = confirm("Do you really want to update this product?");
            if (option) {
                fetch("https://store-manager-app.herokuapp.com/api/v2/products/" + productId, {
                    method: "PUT",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": localStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        "title": title,
                        "category": category,
                        "price": price,
                        "quantity": quantity,
                        "minimum_stock": minimumStock,
                        "description": description
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        document.getElementById("message-update").innerHTML = data.Message || data.message;
                        if (data.Message === "Successfully updated") {
                            window.location.reload();
                        }
                    })
            }
        }
}

function openProductForm() {
    document.getElementsByClassName("product-menu")[0].style.width = "66%";
    updatefrm.style.display = "none";
    productfrm.style.display = "block";
    productfrm.style.width = "100%";
    document.getElementsByClassName("product-section")[0].style.width = "45%";
}
if (productfrm) {
    productfrm.onsubmit = function productRegister(e) {
        e.preventDefault();
        let title = document.getElementById("title").value,
            category = document.getElementById("category").value,
            price = document.getElementById("price").value,
            quantity = document.getElementById("quantity").value,
            minimumstock = document.getElementById("minimum_stock").value,
            description = document.getElementById("description").value,
            token = localStorage.getItem("token");
        fetch("https://store-manager-app.herokuapp.com/api/v2/products", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                "title": title,
                "category": category,
                "price": price,
                "quantity": quantity,
                "minimum_stock": minimumstock,
                "description": description
            })
        })
            .then((res) => res.json())
            .then((data) => {
                let message = document.getElementById("message");
                message.innerHTML = "";
                message.innerHTML = data.message || data.Message;
                if (data.Message === "Successfully added") {
                    window.location.reload();
                }
            })
    }
}