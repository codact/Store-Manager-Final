'use-strict';

window.onload = () => {
    document.getElementsByClassName("product-section")[0].style.width = "0%";
    fetch("https://store-manager-app.herokuapp.com/api/v2/products", {
        headers: {
            'x-access-token': localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(data => {
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
                    Quantity
                </th>
                <th>
                    Minimum_stock
                </th>
                <th>
                    Description
                </th>
                <th>
                    Update
                </th>
                <th>
                    Delete
                </th>
            </tr>`;
                data.products.forEach(product => {
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
                `
                    document.getElementById("productstable").innerHTML = output;
                });
                localStorage.setItem("allproducts", JSON.stringify(data.products))
                localStorage.setItem("productcount", data.products.length)
            }
            else {
                alert("No products to fetch");
            }
        });
}


let productfrm = document.getElementById("prodform");
productfrm.addEventListener("submit", productRegister);


function openProductForm() {
    document.getElementsByClassName("product-menu")[0].style.width = "66%";
    updatefrm.style.display = "none"
    productfrm.style.display = "block";
    productfrm.style.width = "100%";
    document.getElementsByClassName("product-section")[0].style.width = "45%";
}

function productRegister(e) {
    e.preventDefault();
    let title = document.getElementById("title").value,
        category = document.getElementById("category").value,
        price = document.getElementById("price").value,
        quantity = document.getElementById("quantity").value,
        minimum_stock = document.getElementById("minimum_stock").value,
        description = document.getElementById("description").value,
        token = localStorage.getItem("token");
    fetch("https://store-manager-app.herokuapp.com/api/v2/products", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify({
            "title": title,
            "category": category,
            "price": price,
            "quantity": quantity,
            "minimum_stock": minimum_stock,
            "description": description
        })
    })
        .then(res => res.json())
        .then(data => {
            let message = document.getElementById("message");
            if (data.message == "token invalid") {
                alert("You have been logged out for security purposes. Kindly login again")
                window.location.replace("../index.html");
            }
            message.innerHTML = '';
            message.innerHTML = data.message || data.Message;
        })
}