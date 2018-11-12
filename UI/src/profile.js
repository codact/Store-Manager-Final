window.onload = () => {
    if (localStorage.getItem("role") == "true") {
        let output = `
    <i class="fa user-prof fa-users"></i></h1>
        <h1>Email:</h1>
        ${localStorage.getItem("email")}
        <h1>Role:</h1> Administrator(Store Owner)
    `
        document.getElementById("profile").innerHTML = output;

    }
    else {
        let output = `
        <i class="fa user-prof fa-users"></i></h1>
        <h1>Email:</h1>
        ${localStorage.getItem("email")}
        <h1>Role: </h1>Attendant(Store Attendant)
    `
        document.getElementById("profile").innerHTML = output;
    }
}