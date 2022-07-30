function logOut() {
    firebase.auth().signOut()
        .then(function () {
            window.location.href = '../index.html'
        })
        .catch(function (error) {

        });
}

const key = window.localStorage.key(1)
const data = window.localStorage.getItem(key)

const json = JSON.parse(data)

const displayName = json['displayName']
const photoURL = json['photoURL']

document.getElementById("profile_pic").src = photoURL
document.getElementById("display_name").innerText = displayName