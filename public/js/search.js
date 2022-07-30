// TODO change later to get unique users
function printUsers() {
    firebase.database().ref("users").orderByChild("accountType").equalTo("tutor").on("child_added", (snapshot) => {
        console.log(snapshot.val()['userData']['displayName']);
        console.log(snapshot.val()['userData']['photoURL']);
    });
}