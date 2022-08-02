async function checkUserOnDatabase(user) {
    return await firebase.database().ref(`users/${user.uid}`).once("value").then(snapshot => {
        return snapshot.exists();
    });
}

function addNewUserToDatabase(userId, firstName, lastName, email, photoURL, school, grad, bio, phone, state, accountType) {
    const database = firebase.database();
    database.ref('users/' + userId).set({
        userData: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            photoURL: photoURL,
            school: school,
            grad: grad,
            bio: bio,
            phone: phone,
            state: state,
        },
        accountData: {
            accountType: accountType,
            price: 50,
            subjects: [
                'AP Calculus AB',
                'AP Computer Science Principles'
            ]
        },
    });
}

function addDataToAUser(userId, num) {
    const database = firebase.database();
    database.ref('users/' + userId).update({
        "number": num
    });
}