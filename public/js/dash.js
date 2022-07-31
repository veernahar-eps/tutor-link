const key = window.localStorage.key(1)
const data = window.localStorage.getItem(key)

const json = JSON.parse(data)

const displayName = json['displayName']
const photoURL = json['photoURL']

let displayNameArr = json['displayName'].split(" ")
const firstName = displayNameArr[0]
const lastName = displayNameArr[1]

const curUID = json['uid']
firebase.database().ref('users/' + curUID).on('child_added', (snapshot) => {
    const bio = snapshot.val()['bio']
    const email = snapshot.val()['email']
    const state = snapshot.val()['state']
    const country = snapshot.val()['country']
    const phoneNumber = snapshot.val()['phone']
    const school = snapshot.val()['school']
});

document.getElementById("profile_pic").src = photoURL
document.getElementById("display_name").innerText = displayName
document.getElementById("display_email").innerText = email
document.getElementById("first_name").placeholder = firstName
document.getElementById("last_name").placeholder = lastName
document.getElementById("phone_number").placeholder = phoneNumber
document.getElementById("email").placeholder = email
document.getElementById("country").placeholder = country
document.getElementById("state").placeholder = state
document.getElementById("school").placeholder = school
document.getElementById("bio").placeholder = bio

let inputFields = ["first_name", "last_name", "phone_number", "email", "country", "state", "school", "bio"]

function logOut() {
    firebase.auth().signOut()
        .then(function () {
            window.location.href = '../index.html'
        })
        .catch(function (error) {

        });
}

function saveNewData() {
    if (fieldsFull()) {
        firebase.database().ref('users/' + userId).set({
            userData: {
                displayName: document.getElementById("first_name")[0].placeholder + ' ' + document.getElementById("last_name")[0].placeholder,
                email: document.getElementById("email")[0].placeholder,
                school: document.getElementById("school")[0].placeholder,
                grad: document.getElementById("grad")[0].placeholder,
                bio: document.getElementById("bio")[0].placeholder,
                phone: document.getElementById("phone_number")[0].placeholder,
                state: document.getElementById("state")[0].placeholder,
                country: document.getElementById("country")[0].placeholder,
            },
            accountType: accountType
        });
    } else {
        alert("Please do not leave any of the given fields")
    }
}

function fieldsFull() {
    inputFields.forEach((elementID, curIndex) => {
        if (document.getElementById("elementID")[0].placeholder = null) {
            return false;
        }
    });
    return true;
}