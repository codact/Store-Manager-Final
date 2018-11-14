let logoutbtn = document.getElementById("logout");
let logoutadmin = document.getElementById("logoutadmin");

if (logoutbtn) {
    logoutbtn.addEventListener("click", logoutFunc)
} else {
    logoutadmin.addEventListener("click", logoutFunc)
}

function logoutFunc() {
    fetch("https://store-manager-app.herokuapp.com/api/v2/auth/logout", {
        method: "POST",
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })
        .then((res) => res.json())
        .then((data) => {
            if (logoutadmin) {
                localStorage.clear();
                window.location.replace("../index.html");
            }
            else {
                localStorage.clear();
                window.location.replace("index.html");
            }
        });
}