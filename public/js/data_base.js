async function checkUserOnDatabase(user) {
    return await firebase.database().ref(`users/${user.uid}`).once("value").then(snapshot => {
        return snapshot.exists();
    });
}

function addNewUserToDatabase(userId, firstName, lastName, email, photoURL, uni, grad, bio, phone, state, accountType) {
    const database = firebase.database();
    database.ref('users/' + userId).set({
        userData: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            photoURL: photoURL,
            uni: uni,
            grad: grad,
            bio: bio,
            phone: phone,
            state: state,
        },
        accountType: accountType
    });
}

function addDataToAUser(userId, num) {
    const database = firebase.database();
    database.ref('users/' + userId).update({
        "number": num
    });
}