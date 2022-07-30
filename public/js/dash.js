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
const bio = json['bio']
const arr = json['displayName'].split(" ")
const firstName = arr[0]
const lastName = arr[1]
const email = json['email']
const phone = json['phone']
const state = json['state']
const country = json['country']

document.getElementById("profile_pic").src = photoURL
document.getElementById("display_name").innerText = displayName