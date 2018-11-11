
window.onload = () => {
    if (localStorage.getItem("role") == "true") {
        fetch("https://store-manager-app.herokuapp.com/api/v2/sales", {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.Message == "Success") {
                    let total = `<tr><td>Total Sales:</td><td>Ksh.${data.Total}</td></tr>`
                    let output = `<tr>
                <th>
                    Id
                </th>
                <th>
                    Attendant
                </th>
                <th>
                    Product
                </th>
                <th>
                    Quantity
                </th>
                <th>
                    Date/Time
                </th>
                <th>
                    Subtotal (Ksh.)
                </th>
                <th>
                    Update
                </th>
                <th>
                    Delete
                </th>

            </tr>`
                    data.Sales.forEach(sale => {
                        output +=
                            `<tr>
                <td>${sale.id}</td>
                    <td>${sale.email}</td>
                    <td>${sale.title}</td>
                    <td>${sale.quantity}</td>
                    <td>${sale.date}</td>
                    <td>${sale.subtotals}</td>
                    <td><button class="button"><i class="fa fa-edit"></i></button></td>
                    <td><button class="button"><i class="fa fa-trash"></i></button></td>
                </tr>`
                    });

                    document.getElementById("records").innerHTML = output + total;
                }
            })
    }
    else {
        fetch("https://store-manager-app.herokuapp.com/api/v2/sales", {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem("token")
            }
        })
            .then(res => res.json())
            .then(data => {
                let display = `<tr>
                            <th>
                                Id
                            </th>
                            <th>
                                Product
                            </th>
                            <th>
                                Quantity
                                </th>
                                <th>
                                Date/Time
                                </th>
                                <th>
                                Subtotal (Ksh.)
                                </th>
                                </tr>`
                let finaltotal = 0
                data.Sales.forEach(onesale => {
                    if (data.Message != "Success") {
                        alert(data.Message || data.message)
                    }
                    if (onesale.email == localStorage.getItem("email")) {
                        finaltotal += onesale.subtotals
                        display +=
                            `<tr>
                                            <td>${onesale.id}</td>
                                                <td>${onesale.title}</td>
                                                <td>${onesale.quantity}</td>
                                                <td>${onesale.date}</td>
                                                <td>${onesale.subtotals}</td>
                                            </tr>`
                    }
                })
                let grandtotal = `<tr><td><b>Grand Total: </b></td><td>${finaltotal}</td></tr>`
                document.getElementById("attrecords").innerHTML = display + grandtotal;

            });
    }
}
