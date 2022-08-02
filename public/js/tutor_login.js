document.getElementById("sign_up").style.display = 'none'

let provider = new firebase.auth.GoogleAuthProvider();
let fieldIDs = ["uni", "grad", "bio", "phone_number", "state"]

console.log(document.getElementById("email").value.length)
console.log(document.getElementById("email").placeholder.length)

function signIn() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user.uid);
            document.getElementById("signed_out").style.display = 'none'

            checkUserOnDatabase(user);
        } else {
            firebase.auth().signInWithPopup(provider);
        }
    });
}

function handleUser(exists, user) {
    if (exists) {
        window.location.href = "/html/tutor_dash.html"
    } else {
        document.getElementById('display_name').innerText = user.displayName;
        document.getElementById('profile_pic').src = user.photoURL;
        document.getElementById('display_email').innerText = user.email;

        let displayNameArr = user.displayName.split(' ')

        document.getElementById('first_name').placeholder = displayNameArr[0]
        document.getElementById('last_name').placeholder = displayNameArr[1]
        document.getElementById('email').placeholder = user.email

        document.getElementById("sign_up").style.display = 'block'
        document.getElementById('login-button').addEventListener('click', function (e) {
            console.log('Click happened for: ' + e.target.id);
            if (fieldsFull()) {
                const uni = document.getElementById('uni').value;
                const grad = document.getElementById('grad').value;
                const bio = document.getElementById('bio').value;
                const phone = document.getElementById('phone_number').value;
                const state = document.getElementById('state').value;
                const email = valueOf("email")
                const firstName = valueOf("first_name")
                const lastName = valueOf("last_name")

                addNewUserToDatabase(user.uid, firstName, lastName, email, user.photoURL, uni, grad, bio, phone, state, 'tutor')
                window.location.href = "/html/tutor_dash.html"
            }
        });
    }
}

async function checkUserOnDatabase(user) {
    await firebase.database().ref(`users/${user.uid}`).once("value").then(snapshot => {
        handleUser(snapshot.exists(), user);
    });
}

function valueOf(elementID) {
    if (document.getElementById(elementID).value.length === 0) {
        return document.getElementById(elementID).placeholder
    } else {
        return document.getElementById(elementID).value
    }
}

function fieldsFull() {
    fieldState = true
    fieldIDs.forEach((val, index) => {
        if (document.getElementById(val).value.length === 0) {
            console.log('EMPTY ' + val)
            document.getElementById(val).style.border = 'solid 1px red'
            fieldState = false
        } else {
            document.getElementById(val).style.border = 'solid 1px lightgray'
        }
    });
    return fieldState
}