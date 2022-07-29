async function checkUserOnDatabase(user) {

    await firebase.database().ref(`users/${user.uid}`).once("value").then(snapshot => {
        
    });
}