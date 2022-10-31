const key = window.localStorage.key(1)
const data = window.localStorage.getItem(key)

const json = JSON.parse(data)
console.log(json)

try {
    if (json) {
        handleUserexists(json)
        console.log('exists')
    } else {
        document.getElementById("profile_nav").style.display = 'none'
    }
} catch (error) {
    document.getElementById("profile_nav").style.display = 'none'
}

async function handleUserexists(user) {
    await firebase.database().ref(`users/${user.uid}`).once("value").then(snapshot => {
        if (!snapshot.exists()) {
            logOut();
        } else {
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
            window.location.href = '../home.html'
        })
        .catch(function (error) {

        });
    console.log('logging out');
}