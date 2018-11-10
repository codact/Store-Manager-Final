'use-strict';

let usercount = localStorage.getItem("usercount");

let count = `
<i class="dash-image fa fa-users"></i>
<h1>${usercount}</h1>
<h1>Store Attendants</h1>
<h2>View all store Attendants in the system and edit their details</h2>
`
document.getElementById("usertab").innerHTML = count;

let productcount = localStorage.getItem("productcount");

let prodcount = `
<i class="dash-image fa fa-shopping-bag"></i>
<h1>${productcount}</h1>
<h1>Products</h1>
<h2>View all products in stock and update them</h2>
`
document.getElementById("productab").innerHTML = prodcount;


let salecount = localStorage.getItem("recordcount");

let records = `
<i class="dash-image fa fa-database"></i>
<h1>${salecount}</h1>
<h1>Records</h1>
<h2>View all sales records, and manipulate them in any way!</h2>
`
document.getElementById("records").innerHTML = records;