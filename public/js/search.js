// TODO change later to get unique users
function printUsers() {
    console.log('hello')
    firebase.database().ref("users").orderByChild("accountType").equalTo("tutor").on('child_added', (snapshot) => {
        console.log(snapshot.val()['userData']['photoURL']);
        var newElement = document.createElement("tr");
        newElement.innerHTML = '\
        <tr>\
        <td>\
            <div class="widget-26-job-emp-img">\
                <img src="' + snapshot.val()['userData']['photoURL'] + '"\
                     alt="Company"/>\
            </div>\
        </td>\
        <td>\
            <div class="widget-26-job-title">\
                <a href="#">' + snapshot.val()['userData']['firstName'] + ' ' + snapshot.val()['userData']['lastName'] + '</a>\
                <p class="m-0"><a href="#" class="employer-name">AxiomUI Llc.</a>\
                <span class="text-muted time">2 days ago</span></p>\
            </div>\
        </td>\
        <td>\
            <div class="widget-26-job-info">\
                <p class="type m-0">Part-Time</p>\
                <p class="text-muted m-0">in <span class="location">New York, US</span>\
                </p>\
            </div>\
        </td>\
        <td>\
            <div class="widget-26-job-salary">$ 60/hr</div>\
        </td>\
        <td>\
            <div class="widget-26-job-category bg-soft-warning">\
                <i class="indicator bg-warning"></i>\
                <span>Subject</span>\
            </div>\
        </td>\
    </tr>\
    ';
        document.getElementById("tutor-list").appendChild(newElement);
    });
}

// function printUsers() {
//     firebase.database().ref("users").orderByChild("accountType").equalTo("tutor").on("child_added", (snapshot) => {
//         console.log(snapshot.val()['userData']['displayName']);
//         console.log(snapshot.val()['userData']['photoURL']);
//     });
// } 