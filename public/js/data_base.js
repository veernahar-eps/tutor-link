async function checkUserOnDatabase(user) {
    return await firebase.database().ref(`users/${user.uid}`).once("value").then(snapshot => {
        return snapshot.exists();
    });
}

function addNewUserToDatabase(userId, firstName, lastName, email, photoURL, school, grad, bio, phone, state, major, accountType) {
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
            major: major,
        },
        accountData: {
            accountType: accountType,
            price: 0,
            subjects: [
                // 'AP Calculus AB',
                // 'AP Computer Science Principles'
            ],
        },
        orders: []
    });
}

function sendOrder(tutorUserId, studentUserId) {
    console.log(tutorUserId)
    console.log(studentUserId)
    const database = firebase.database();
    database.ref('users/' + tutorUserId + '/orders').push({
        studentUserId
    });
}
