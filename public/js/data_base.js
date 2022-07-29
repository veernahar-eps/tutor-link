async function checkUserOnDatabase(user) {
    return await firebase.database().ref(`users/${user.uid}`).once("value").then(snapshot => {
        return snapshot.exists();
    });
}