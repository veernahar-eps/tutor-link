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
            const uni = document.getElementById('school').value;
            const grad = document.getElementById('grad').value;
            const bio = document.getElementById('bio').value;

            addNewUserToDatabase(user.uid, user.displayName, user.email, user.photoURL, uni, grad, bio)
            window.location.href = "/html/dash.html"
        });
    }   
}

function addNewUserToDatabase(userId, name, email, imageUrl, school, grad, bio) {
    const database = firebase.database();
    database.ref('users/students/' + userId).set({
        displayName: name,
        photoURL: imageUrl,
        email: email,
        uni: school,
        grad: grad,
        bio: bio
    });
}

async function checkUserOnDatabase(user) {
    await firebase.database().ref(`users/students/${user.uid}`).once("value").then(snapshot => {
        handleUser(snapshot.exists(), user);
    });
}
