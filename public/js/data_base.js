async function checkUserOnDatabase(user) {
    await firebase.database().ref(`users/${user.uid}`).once("value").then(snapshot => {
        
    });
}

function addNewUserToDatabase(userId, name, email, imageUrl, school, grad, bio, accountType) {
    const database = firebase.database();
    database.ref('users/' + userId).set({
        userData: {
            displayName: name,
            photoURL: imageUrl,
            email: email,
            school: school,
            grad: grad,
            bio: bio,
        },
        accountType: accountType
    });
}