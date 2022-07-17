const key = window.localStorage.key(0)
const data = window.localStorage.getItem(key)
console.log(data)

if (data) {
    const json = JSON.parse(data)

    const displayName = json['displayName']
    const photoURL = json['photoURL']

    console.log(displayName)
    console.log(photoURL)

    document.getElementById("logged_out").style.display = 'none'
    document.getElementById("profile").src = photoURL
    document.getElementById("display_name").innerText = displayName

} else {
    document.getElementById("logged_in").style.display = 'none'
}