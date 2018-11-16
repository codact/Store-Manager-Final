let signup_section = document.getElementById("signup-section");
window.onload = () => {
    fetch("https://store-manager-app.herokuapp.com/api/v2/users", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.Message === "Success") {
                let output = `<tr>
                <th>
                    Id
                </th>
                <th>
                    Email
                </th>
                <th>
                    Is Admin?
                </th>
                <th>
                    Promote User
                </th>
                </tr>`;
                data.Users.forEach((user) => {
                    output += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.email}</td>
                        <td>${user.admin}</td>
                        <td><button class="button" onclick="promoteUser(${user.id})"><i class="fa fa-edit" id="updatebtn"></i></button></td>
                    </tr>
                `;
                    document.getElementById("usersrows").innerHTML = output;
                });
            }
            else {
                alert("Failed to fetch users");
            }
        });
};

function promoteUser(userId) {
    let currentuserId = userId;
    let option = confirm("Do you really want to promote this user?");
    if (option) {
        fetch("https://store-manager-app.herokuapp.com/api/v2/users/" + currentuserId, {
            method: "PUT",
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message || data.Message);
                window.location.reload();
            });
    }
}

function openSignupForm() {
    signup_section.style.display = "block";
    document.getElementById("closeDetails").onclick =
        function closeDetails() {
            signup_section.style.display = "none";
        }
    window.onclick = function (event) {
        if (event.target === signup_section) {
            signup_section.style.display = "none";
        }
    }
}
document.getElementById("signupfrm").onsubmit = function signupFunc(e) {
    e.preventDefault();
    let email = document.getElementById("email").value,
        password = document.getElementById("password").value,
        password2 = document.getElementById("password2").value,
        role = document.getElementById("role").value,
        token = localStorage.getItem("token");
    if (password !== password2) {
        let error = "Passwords must match";
        document.getElementById("message").innerHTML = error;
    }
    else {
        fetch("https://store-manager-app.herokuapp.com/api/v2/auth/signup", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "admin": String(role)
            })
        })
            .then(res => res.json())
            .then(data => {
                let message = document.getElementById("message");
                if (data.Message === "User registered") {
                    message.className = "success";
                    message.innerHTML = data.Message;
                    window.location.reload();
                }
                else {
                    message.className = "error";
                    message.innerHTML = data.message || data.Message;
                }
            })
    }
}