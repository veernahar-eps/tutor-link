import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDkL13QO-XpgMFNuZDwAZ1hF88Yu8w6N3c",
        authDomain: "react-app-70676.firebaseapp.com",
        projectId: "react-app-70676",
        storageBucket: "react-app-70676.appspot.com",
        messagingSenderId: "816550760594",
        appId: "1:816550760594:web:4967a33f72e300540d964b"
};

const app = initializeApp(firebaseConfig);

function addNewUserToDatabase(userId, name, email, imageUrl) {
    const database = getDatabase(app);
    set(ref(database, 'users/' + userId), {
        displayName: name,
        photoURL : imageUrl,
        email: email,
    });
}

function checkUserOnDatabase(userID) {
    const db = getDatabase();
    const ref = db.ref('users/' + userId);

    // Attach an asynchronous callback to read the data at our posts reference
    ref.on('value', (snapshot) => {
        console.log(snapshot.val());
    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
    }); 
}

document.querySelector('.button').addEventListener("click", addNewUserToDatabase('idksomesuperuniqueUIDhere', 'masonstuart', 'yourmom@yourmom.com', 'pranked.com/iamge/pranked.,comrpiejr'))