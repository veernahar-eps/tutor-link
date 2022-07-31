const key = window.localStorage.key(1)
const data = window.localStorage.getItem(key)

const json = JSON.parse(data)

const curUID = json['uid']
firebase.database().ref('users/' + curUID).once('value', (snapshot) => {
    const firstName = snapshot.val()['userData']['firstName']
    const lastName = snapshot.val()['userData']['lastName']
    const email = snapshot.val()['userData']['email']
    const school = snapshot.val()['userData']['school']
    const bio = snapshot.val()['userData']['bio']
    const phone = snapshot.val()['userData']['phone']
    const state = snapshot.val()['userData']['state']
    const grad = snapshot.val()['userData']['grad']

    document.getElementById("profile_pic").src = json['photoURL']
    document.getElementById("display_name").innerText = firstName + ' '+ lastName
    document.getElementById("display_email").innerText = email
    document.getElementById("first_name").placeholder = firstName
    document.getElementById("last_name").placeholder = lastName
    document.getElementById("phone_number").placeholder = phone
    document.getElementById("email").placeholder = email
    document.getElementById("state").placeholder = state
    document.getElementById("school").placeholder = school
    document.getElementById("bio").placeholder = bio
    document.getElementById("grad").placeholder = grad
});



let inputFields = ["first_name", "last_name", "email", "school", "grad", "bio", "phone_number", ["state"]]

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
                firstName: document.getElementById("first_name").value,
                lastName: document.getElementById("last_name").value,
                email: document.getElementById("email").value,
                school: document.getElementById("school").value,
                grad: document.getElementById("grad").value,
                bio: document.getElementById("bio").value,
                phone: document.getElementById("phone_number").value,
                state: document.getElementById("state").value,
            },
            accountType: accountType
        });
    } else {
        alert("Please do not leave any of the given fields.")
    }
}

function fieldsFull() {
    inputFields.forEach((elementID, curIndex) => {
        if (document.getElementById(elementID).value === null) {
            console.log("here")
        }
    });
    return true;
}