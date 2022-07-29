const key = window.localStorage.key(1)
const data = window.localStorage.getItem(key)

if (data.user) {
    handleUserExists(data.user)
} else {
    document.getElementById("profile_nav").style.display = 'none'
}

async function handleUserExists(user) {
    await firebase.database().ref(`users/${user.uid}`).once("value").then(snapshot => {
        if (!snapshot.exists()) {
            logOut();
        } else {
            const json = JSON.parse(data)

            const displayName = json['displayName']
            const photoURL = json['photoURL']

            console.log(displayName)
            console.log(photoURL)

            document.getElementById("student_login").style.display = 'none'
            document.getElementById("tutor_login").style.display = 'none'
            document.getElementById("profile_pic").src = photoURL
            document.getElementById("display_name").innerText = displayName
        }
    });
}

function logOut() {
    firebase.auth().signOut()
        .then(function () {
            window.location.href = '../index.html'
        })
        .catch(function (error) {

        });
    console.log('logging out');
}