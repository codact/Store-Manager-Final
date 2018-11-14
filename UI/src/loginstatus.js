
if (!localStorage.getItem("email")) {
    alert("login first");
    let dashboard = document.getElementById("dashboard");
    let adminproducts = document.getElementById("adminproducts");
    let adminsales = document.getElementById("adminsales");
    let adminusers = document.getElementById("adminusers");
    if (dashboard || adminproducts || adminusers || adminsales) {
        window.location.replace("../index.html");
    }
    else {
        window.location.replace("index.html");
    }
}