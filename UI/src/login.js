
let loginform = document.getElementById("loginfrm");

loginform.onsubmit = function loginUser(e) {

    let email = document.getElementById("eml").value;
    let password = document.getElementById("pwd").value;
    let message = document.getElementById("message");

    e.preventDefault();

    fetch("https://store-manager-app.herokuapp.com/api/v2/auth/login", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.message === "Login success") {
                message.className = "success";
                message.innerHTML =
                    `<p>${data.message}</p>`;
                localStorage.setItem("token", data.token);
                fetch("https://store-manager-app.herokuapp.com/api/v2/users", {
                    headers: {
                        "x-access-token": data.token
                    }
                })
                    .then((res) => res.json())
                    .then((data) => {
                        data.Users.forEach((user) => {
                            if (user.email === email) {
                                localStorage.setItem("role", user.admin);
                                localStorage.setItem("email", user.email);
                                window.location.href = "home.html";
                            }
                        });
                    })
            }
            else{
                message.className = "error";
                console.log(message)
                message.innerHTML =
                    `<p>${data.message || data.Message}</p>`;
            }
        })
}
