// TODO change later to get unique users
printUsers()

function printUsers() {
    firebase.database().ref("users/accountData").orderByChild("accountType").equalTo("tutor").on('child_added', (snapshot) => {
        var newElement = document.createElement("tr");
        newElement.innerHTML = '\
        <tr>\
        <td>\
            <div class="widget-26-job-emp-img">\
                <img referrerpolicy="no-referrer" src="' + snapshot.val()['userData']['photoURL'] + '"\
                     alt="Company"/>\
            </div>\
        </td>\
        <td>\
            <div class="widget-26-job-title">\
                <a href="#">' + snapshot.val()['userData']['firstName'] + ' ' + snapshot.val()['userData']['lastName'] + '</a>\
                <p class="m-0"><a href="#" class="employer-name">MAJOR</a>\
            </div>\
        </td>\
        <td>\
            <div class="widget-26-job-info">\
                <p class="type m-0">' + snapshot.val()['userData']['school'] + '</p>\
                <p class="text-muted m-0">in <span class="location">LOCATION OF MAJOR</span>\
                </p>\
            </div>\
        </td>\
        <td>\
            <div class="widget-26-job-salary">PRICE OF TUTOR SESSION</div>\
        </td>\
        <td>\
            <div class="widget-26-job-category bg-soft-warning">\
                <i class="indicator bg-warning"></i>\
                <span>SUBJECT</span>\
            </div>\
        </td>\
    </tr>\
    ';
        document.getElementById("tutor-list").appendChild(newElement);
    });
}