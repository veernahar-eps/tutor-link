document.getElementById("sign_up").style.display = 'none'

let provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        const userExists = true; // TODO: MASON I NEED THE DATABASE CODE EEEE
        if (userExists) {
            window.location.href = "/html/dash.html"
        } else {
            document.getElementById("sign_up").style.display = 'block'
        }
    } else {
        firebase.auth().signInWithPopup(provider);
    }
});