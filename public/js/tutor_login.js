document.getElementById("sign_up").style.display = 'none'

let provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user.uid);

        checkUserOnDatabase(user);
    } else {
        firebase.auth().signInWithPopup(provider);
    }
});

function handleUser(exists, user) {
    if (exists) {
        window.location.href = "/html/dash.html"
    } else {
        document.getElementById("sign_up").style.display = 'block'
        document.getElementById('login-button').addEventListener('click', function (e) {
            console.log('Click happened for: ' + e.target.id);
            const uni = document.getElementById('uni').value;
            const grad = document.getElementById('grad').value;
            const stuff = document.getElementById('stuff').value;

            console.log([uni, grad, stuff])
            addNewUserToDatabase(user.uid, user.displayName, user.email, user.photoURL, uni, grad, stuff)
            window.location.href = "/html/dash.html"
        });
    }
}

function addNewUserToDatabase(userId, name, email, imageUrl, uni, grad, bio) {
    const database = firebase.database();
    database.ref('users/' + userId).set({
        userData: {
            displayName: name,
            photoURL: imageUrl,
            email: email,
            uni: uni,
            grad: grad,
            bio: bio,
        },
        accountType: 'tutor'
    });
}

async function checkUserOnDatabase(user) {
    await firebase.database().ref(`users/${user.uid}`).once("value").then(snapshot => {
        handleUser(snapshot.exists(), user);
    });
}
