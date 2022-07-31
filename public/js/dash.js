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
    const firstName = valueOf("first_name")
    const lastName = valueOf("last_name")
    const email = valueOf("email")
    const school = valueOf("school")
    const grad = valueOf("grad")
    const bio = valueOf("bio")
    const phone = valueOf("phone_number")
    const state = valueOf("state")

    if (fieldsFull()) {
        firebase.database().ref('users/' + curUID).set({
            userData: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                photoURL: json['photoURL'],
                school: school,
                grad: grad,
                bio: bio,
                phone: phone,
                state: state,
            },
            accountType: 'tutor'
        });
    } else {
        alert("Please do not leave any of the given fields.")
    }
}

function valueOf(elementID) {
    try {
        if (document.getElementById(elementID).value.length == 0) {
            return document.getElementById(elementID).placeholder
        } else {
            return document.getElementById(elementID).value
        }
    } catch (error) {
        alert('error')
    }
    
}

function fieldsFull() {
    return true
}