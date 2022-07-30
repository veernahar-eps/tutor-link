function logOut() {
    firebase.auth().signOut()
        .then(function () {
            window.location.href = '../index.html'
        })
        .catch(function (error) {

        });
}

firebase.auth().onStateChanged(function (user) {
    if (user) {
        console.log(user.uid);
        // return user data
    } else {
        console.log("user signed out");
        // redirect to homepage?
    }
})