async function checkUserOnDatabase(user) {
    return await firebase.database().ref(`users/${user.uid}`).once("value").then(snapshot => {
        return snapshot.exists();
    });
}

function addNewUserToDatabase(userId, name, email, imageUrl, school, grad, bio, phone, state, country, accountType) {
    const database = firebase.database();
    database.ref('users/' + userId).set({
        userData: {
            displayName: name,
            photoURL: imageUrl,
            email: email,
            school: school,
            grad: grad,
            bio: bio,
            phone: phone,
            state: state,
            country: country,
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