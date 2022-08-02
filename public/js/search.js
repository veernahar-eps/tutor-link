// TODO change later to get unique users
printUsers(0)
let arrSelected = [];
const sortType = document.getElementById("sortingType")
sortType.onchange = (event) => {
    search()
}

$('#multiple-select').on('change', function () {
    const selected = $(this).find("option:selected");
    arrSelected = [];

    selected.each((idx, val) => {
        arrSelected.push(val.value);
    });

    console.log(arrSelected)
});

function search() {
    printUsers(document.getElementById("sortingType").selectedIndex).then(() => check())
}

function check() {
    if (document.getElementById("tutor-list").innerHTML === '') {
        document.getElementById("tutor-list").innerHTML = 'No results'
    }
}

async function printUsers(sortingType) {
    document.getElementById("tutor-list").innerHTML = ''
    switch (sortingType) {
        // price = low to high
        case 0:
            return await firebase.database().ref("users").orderByChild("accountData/price").on('child_added', (snapshot) => {
                const tutor = snapshot.val()['accountData']['accountType'] === 'tutor';
                if (tutor && arrSelected.length === 0) {
                    injectTutorData(snapshot)
                }
                for (let i = 0; i < arrSelected.length; i++) {
                    if (tutor && snapshot.val()['accountData']['subjects'].includes(arrSelected[i])) {
                        injectTutorData(snapshot)
                        break;
                    }
                }
            });
        // price = high to low
        case 1:
            return await firebase.database().ref("users").orderByChild("accountData/price").on('child_added', (snapshot) => {
                const tutor = snapshot.val()['accountData']['accountType'] === 'tutor';
                if (tutor && arrSelected.length === 0) {
                    injectTutorData(snapshot, false)
                }
                for (let i = 0; i < arrSelected.length; i++) {
                    if (tutor && snapshot.val()['accountData']['subjects'].includes(arrSelected[i])) {
                        injectTutorData(snapshot, false)
                        break;
                    }
                }
            });
    }

}

function injectTutorData(snapshot, end = true) {
    console.log(snapshot.key)

    var newElement = document.createElement("tr");

    const subjects = snapshot.val()['accountData']['subjects']
    let string = ''
    subjects.forEach((val) => {
        string += '\
            <div class="widget-26-job-category bg-soft-warning">\
            <i class="indicator bg-warning"></i>\
        <span>' + val + '</span>\
    </div>\
        ';
    })

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
                <p class="m-0"><a href="#" class="employer-name">' + snapshot.val()['userData']['major'] + '</a>\
            </div>\
        </td>\
        <td>\
            <div class="widget-26-job-info">\
                <p class="type m-0">' + snapshot.val()['userData']['school'] + '</p>\
                </p>\
            </div>\
        </td>\
        <td>\
            <div class="widget-26-job-salary">' + 'Price/hr: $' + snapshot.val()['accountData']['price'] + '</div>\
        </td>\
        <td>\
            ' + string + '\
        </td>\
        \<td>\
            <div class="widget-26-see-profile">\
                 <button type="button" class="form-control"\
                        data-toggle="modal"\
                        data-target="#exampleModalCenter' + snapshot.key + '">\
                                                                                See Profile\
                                                                           </button>\
                                                                       </div>\
                                                                    </td>\
    </tr>\
    ';

    if (end) {
        document.getElementById("tutor-list").appendChild(newElement);

    } else {
        document.getElementById("tutor-list").innerHTML = newElement.innerHTML + document.getElementById("tutor-list").innerHTML;
    }

    var element = document.createElement("div");
    element.innerHTML = '<div class="modal fade" id="exampleModalCenter' + snapshot.key + '" tabIndex="-1" role="dialog"\
                                    aria-labelledby="exampleModalCenterTitle"\
                                    aria-hidden="true">\
            <div class="modal-dialog modal-lg" role="document" style="top: 25%">\
                <div class="container mt-5">\
                    <div class="row d-flex justify-content-center">\
                        <div class="col-md-7">\
                            <div class="card p-3 py-4">\
                                <div class="text-center">\
                                    <img referrerPolicy="no-referrer" src="' + snapshot.val()['userData']['photoURL'] + '" width="100"\
                                         class="rounded-circle">\
                                </div>\
\
                                <div class="text-center mt-3">\
                                    <h5 class="mt-2 mb-0" style="color: black">' + snapshot.val()['userData']['firstName'] + ' ' + snapshot.val()['userData']['lastName'] + '</h5>\
                                    <span style="color: darkgrey">' + snapshot.val()['userData']['school'] + '</span>\
    \
                                    <div class="px-4 mt-1">\
                                        <p class="fonts">' + snapshot.val()['userData']['bio'] + '</p>\
                                    </div>\
    \
                                    <div class="buttons">\
                                        <button type="button" class="btn btn-primary px-4 ms-3">Contact</button>\
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
        ';

    document.body.appendChild(element)
}