let _search = document.getElementById('search')

const $list = document.getElementById('list')

const $send = document.getElementById('send')

const apiKey = 'ef4699e893a830d6f2349dff08d46b7e'

$send.addEventListener('click', function () {
    _searchVAl = _search.value

    const $apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${_searchVAl}&appid=${apiKey}&units=metric`
    fetch($apiUrl)
        .then(res => res.json())
        .then(myData => {

            let now = new Date()
            let nDate = nowDate(now)

            $list.innerHTML = ''
            _search.value = ''
            _search.focus()

            const $des = `${myData.weather[0]["description"]}`
            const $icon = `https://openweathermap.org/img/wn/${myData.weather[0].icon}@2x.png`

            let $li = document.createElement('li')
            $li.classList.add('py-2', 'text-light')
            $li.innerHTML = `
         <div class='row justify-content-around px-0 mx-0 g-0'>
            <span class='d-flex col-12 justify-content-center display-6  text-light'>${nDate}</span>
            <h2 class='col-10 text-center text-light'><i class="bi bi-geo-alt-fill"></i>${myData.name}, ${myData.sys.country}</h2> 

            <div class='line'></div>

            <img class='col-3' src='${$icon}'>

            <h1 class='col-7 d-flex align-items-center justify-content-center text-light'>${Math.round(myData.main.temp_min)}°c</h1>

            <p class'col-4 text-light display-2'>${$des}</p>
            <div class='line'></div>

            <ul class='row px-0 mx-0 py-2'>
            <li class='col text-center'><i class="bi bi-wind"></i>windy ${myData.wind.speed} NE</li>
            <li class='col text-center'><i class="bi bi-droplet"></i> ${myData.main.humidity} % </li>
            <li class='col text-center'><i class="bi bi-speedometer"></i> ${Math.round(myData.main.pressure)} </li>
            </ul>
         
         `
            document.getElementById('list').appendChild($li)
        })
})

// ***/

function nowDate(today) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[today.getDay()]
    let month = months[today.getMonth()]
    let year = today.getFullYear()
    let date = today.getDate()

    return `${day} , ${date} ${month} ${year}`

}