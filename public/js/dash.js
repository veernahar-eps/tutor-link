function logOut() {
    firebase.auth().signOut()
        .then(function () {
            window.location.href = '../index.html'
        })
        .catch(function (error) {

        });
}

function printUsers() {
    firebase.database().ref("users").orderByChild("accountType").equalTo("tutor").on("child_added", (snapshot) => {
        console.log(snapshot.val()['userData']['displayName']);
    });
}