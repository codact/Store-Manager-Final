
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
                    <div class="product" id="prod">
                        <h5 id="item-title">${product.title}</h5>
                        <h6 id="item-price">Ksh.&nbsp;${product.price}</h6>
                        <button id="add" class="button" onclick="openModal('${product.id}')">Sell&nbsp;<i class="fa fa-cart-plus"></i></button>
                    </div>
                    `
                    localStorage.setItem('product', JSON.stringify(data.products))
                    document.getElementById("products").innerHTML = oneproduct
                });
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
                    <div class="detail">
                    <span id="messager" style="color: red;"></span><br>
                        <table>
                            <tr>
                                <td>Category: </td>
                                <td id="categoryprod"> ${prod.category}</td>
                            </tr>
                            <tr>
                                <td>Quantity: </td>
                                <td id="quantityprod"> ${prod.quantity}</td>
                            </tr>
                            <tr>
                                <td>Minimum quantity:</td>
                                <td id="minimumprod">${prod.minimum_stock}</td>
                            </tr>
                            <tr>
                                <td>Price:</td>
                                <td id="priceprod">${prod.price}</td>
                            </tr>

                        </table>
                        <h5>Enter sale quantity</h5> <input id="quanty" type="search" size=10 placeholder="Quantity"><br><br><br>
                        <button class="button" onclick="makeSale()" id="proceed">Proceed&nbsp;<i class="fa fa-cart-plus"></i></button>
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

function makeSale() {
    let quantity = document.getElementById("quanty").value;
    if (localStorage.getItem("role") == "true") {
        alert("This function is preserved for attendants");
        details.style.display = "none";
    }
    else {
        let title = document.getElementById("titleprod").innerHTML;
        fetch('https://store-manager-app.herokuapp.com/api/v2/sales', {
            headers: {
                'x-access-token': localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                'title': title,
                'quantity': quantity
            })
        })
            .then(res => res.json())
            .then(data => {
                document.getElementById("messager").innerHTML = data.message || data.Message;
            })
    }
}

function searchProduct(){
    let input, filter, i;
  input = document.getElementById("input");
  filter = input.value.toUpperCase();
  products = document.getElementById("products");
  div = products.getElementsByTagName("div")
  for (i = 0; i < div.length; i++) {
      title = products.getElementsByTagName("h5");
      if (title) {
        if (title[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            div[i].style.display = "";
        } else {
            div[i].style.display = "none";
        }
        } 
    }

    }