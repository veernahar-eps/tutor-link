async function checkUserOnDatabase(user) {
<<<<<<<<< Temporary merge branch 1
    return await firebase.database().ref(`users/${user.uid}`).once("value").then(snapshot => {
        return snapshot.exists();
=========
    await firebase.database().ref(`users/${user.uid}`).once("value").then(snapshot => {
        
>>>>>>>>> Temporary merge branch 2
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