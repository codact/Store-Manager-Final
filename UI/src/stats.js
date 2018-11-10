'use-strict';

usercount = localStorage.getItem("usercount");

count = `
<i class="dash-image fa fa-users"></i>
<h1>${usercount}</h1>
<h1>Store Attendants</h1>
<h2>View all store Attendants in the system and edit their details</h2>
`
document.getElementById("usertab").innerHTML = count;

productcount = localStorage.getItem("productcount");

prodcount = `
<i class="dash-image fa fa-shopping-bag"></i>
<h1>${productcount}</h1>
<h1>Products</h1>
<h2>View all products in stock and update them</h2>
`
document.getElementById("productab").innerHTML = prodcount;