'use-strict';

window.onload = () => {

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
                let att = document.getElementById("attendants");
                let attendants = ``;
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
                    attendants += `<option>${sale.email}</option>`
                });
                if (att) {
                    document.getElementById("attendants").innerHTML = attendants;
                    document.getElementById("records").innerHTML = output + total;
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
                            if (data.Message == "Success") {
                                let total = `<tr><td>Total Sales:</td><td>Ksh.${data.Total}</td></tr>`
                                let output = `<tr>
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
                                data.Sales.forEach(sale => {
                                    if (sale.email == localStorage.getItem("email")) {
                                        output +=
                                            `<tr>
                                            <td>${sale.id}</td>
                                                <td>${sale.title}</td>
                                                <td>${sale.quantity}</td>
                                                <td>${sale.date}</td>
                                                <td>${sale.subtotals}</td>
                                            </tr>`

                                        document.getElementById("records").innerHTML = output + total;
                                    }
                                    else {
                                        document.getElementById("records").innerHTML = "You dont have any sales!";
                                    }
                                })
                            }
                        });

                }
                localStorage.setItem("recordcount", data.Sales.length);
            }
            else {
                alert(data.Message || data.message);
            }
        })
}