
window.onload = () => {

    fetch("https://store-manager-app.herokuapp.com/api/v2/users", {
        headers: {
            'x-access-token': localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.Message == "Success") {
                let count = `
            <i class="dash-image fa fa-users"></i>
            <h1>${data.Users.length}</h1>
            <h1>Store Attendants</h1>
            <h2>View all store Attendants in the system and edit their details</h2>
            `
                document.getElementById("usertab").innerHTML = count;
            }
            else {
                let count2 = `
            <i class="dash-image fa fa-users"></i>
            <h1>0</h1>
            <h1>Store Attendants</h1>
            <h2>View all store Attendants in the system and edit their details</h2>
            `
                document.getElementById("usertab").innerHTML = count2;
            }
        })

    fetch("https://jemo-store-manager.herokuapp.com/api/v2/products", {
        headers: {
            'x-access-token': localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.products.length > 0) {
                let prodcount = `
                    <i class="dash-image fa fa-shopping-bag"></i>
                    <h1>${data.products.length}</h1>
                    <h1>Products</h1>
                    <h2>View all products in stock and update them</h2>
                    `
                document.getElementById("productab").innerHTML = prodcount;

            } else {
                let count3 = `
                <i class="dash-image fa fa-shopping-bag"></i>
                <h1>0</h1>
                <h1>Products</h1>
                <h2>View all products in stock and update them</h2>`
                document.getElementById("productab").innerHTML = count3;
            }
        })

    fetch("https://store-manager-app.herokuapp.com/api/v2/sales", {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem("token")
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.Message == "Success") {
                let records = `
                        <i class="dash-image fa fa-database"></i>
                        <h1>${data.Sales.length}</h1>
                        <h1>Records</h1>
                        <h2>View all sales records, and manipulate them in any way!</h2>
                        `
                document.getElementById("records").innerHTML = records;
            }
            else {
                let count4 = `
                <i class="dash-image fa fa-database"></i>
                <h1>0</h1>
                <h1>Records</h1>
                <h2>View all sales records, and manipulate them in any way!</h2>
            `
                document.getElementById("records").innerHTML = count4;
            }
        })
}