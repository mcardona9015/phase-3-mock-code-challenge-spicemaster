// write your code here
url = 'http://localhost:3000/spiceblends'

fetchSpiceBlends()

let spiceBlends
function fetchSpiceBlends() {
    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
}

