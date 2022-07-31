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

let displayNameArr = json['displayName'].split(" ")
const firstName = displayNameArr[0]
const lastName = displayNameArr[1]

const curUID = json['uid']
// get snapshot of current staet
// used uid to grab each peice
// snapshot.val().userData.email
firebase.database().ref('users/' + curUID).on('child_added', (snapshot) => {
    const bio = snapshot.val()['bio']
    const email = snapshot.val()['email']
    const state = snapshot.val()['state']
    const country = snapshot.val()['country']
    const phoneNumber = snapshot.val()['phone']
});

document.getElementById("profile_pic").src = photoURL
document.getElementById("display_name").innerText = displayName
document.getElementById("display_email").innerText = email
document.getElementById("first_name")[0].placeholder = firstName
document.getElementById("last_name")[0].placeholder = lastName
document.getElementById("phone_number")[0].placeholder = phoneNumber
document.getElementById("email")[0].placeholder = email
document.getElementById("country")[0].placeholder = country
document.getElementById("state")[0].placeholder = state