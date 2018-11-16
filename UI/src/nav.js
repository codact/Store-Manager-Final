if (localStorage.getItem("role") === "true") {
    let adminopt = document.getElementById("adminopt");
    let admin = `<a href="admin/dashboard.html">
    Admin&nbsp;<i class="fa fa-sign-in-alt"></i></a>`;
    adminopt.innerHTML = admin;
    let salerecs = document.getElementById("salerecs");
    salerecs.style.display = "none";
}

