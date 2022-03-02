document.querySelector('#link').hidden = true

if (!sessionStorage.getItem('Token')){
    document.querySelector('#link').click()
}else{
    document.querySelector('#pos-table').innerHTML = `
    <table class="table-pos">
        <tr>
            <td>ФИО</td>
            <td>Дата</td>
            <td>Время</td>
        </tr>
    </table>
    `
    document.querySelector('#abon-table').innerHTML = `
    <table class="table-abon">
        <tr>
            <td>Название</td>
            <td>Срок действия</td>
            <td>Преимущества</td>
            <td>Цена</td>
        </tr>
    </table>
    `
    document.querySelector('#cli-table').innerHTML = `
    <table class="table-cli">
        <tr>
            <td>ФИО</td>
            <td>Номер телефона</td>
            <td>Клубная карта</td>
            <td>Дата покупки</td>
            <td>Срок действия</td>
        </tr>
    </table>
    `
    getAbonData()
    getSmenData()
    getPosData()
    getClientsData()
    
    document.querySelector('#btn-addPos').addEventListener('click', function(){
        const dt = new Date()
        var date = null, time = null

        console.log(dt.getDate())
        console.log(dt.getMonth())

        if ((dt.getDate()) < 10 && (dt.getMonth()+1)<10){
            date = `0${dt.getDate()}.`+ `0${dt.getMonth()+1}.`+`${dt.getFullYear()}`
        }
        else if((dt.getDate()) > 10 && (dt.getMonth()+1)<10){
            date = `${dt.getDate()}.`+ `0${dt.getMonth()+1}.`+`${dt.getFullYear()}`
        }
        else if((dt.getDate()) < 10 && (dt.getMonth()+1)>10){
            date = `0${dt.getDate()}.`+ `${dt.getMonth()+1}.`+`${dt.getFullYear()}`
        }
        else{
            date = `${dt.getDate()}.`+ `${dt.getMonth()+1}.`+`${dt.getFullYear()}`
        }
        if (dt.getHours()<10 || dt.getMinutes()<10){
            if(dt.getMinutes()<10){
                time = `0${dt.getHours()}:`+`0${dt.getMinutes()}`
            }
            else{
                time = `0${dt.getHours()}:`+`${dt.getMinutes()}`
            }
        }
        else{
            time = `${dt.getHours()}:`+`${dt.getMinutes()}`
        }
        posWriteInDB('pos', document.querySelector('#FIO').value, date, time)

    })
    document.querySelector('#btn-addAbon').addEventListener('click', function(){
        abonWriteInDB('abon', 
        document.querySelector('#abon-name').value,
        document.querySelector('#abon-sda').value,
        document.querySelector('#abon-prem').value,
        document.querySelector('#price').value + 'BYN')
    })
    document.querySelector('#btn-addCli').addEventListener('click', function(){
        cliWriteInDB('clients', 
        document.querySelector('#pFIO').value,
        document.querySelector('#phone').value,
        document.querySelector('#pAbon').value,
        document.querySelector('#dsale').value,
        document.querySelector('#sda').value
        )
    })
    document.querySelector('.btn-exit').addEventListener('click', function(){
        sessionStorage.clear()
        document.querySelector('#link').click()
    })
    const btnclck = document.querySelector('.learn')
    btnclck.addEventListener('click', removeHandler)
    btnclck.addEventListener('click', editHandler)

}

function editClient(link, name, FIO, phone, abon, dsale, sda){
    return fetch(`https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/${link}/${name}.json`, {
        method: 'PATCH',
        body: JSON.stringify({
            FIO, phone, abon, dsale, sda
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => location.reload())
}

function editHandler(event){
    if (!event.target.dataset.edit || !event.target.dataset.name) {
        return
    }
    const {name} = event.target.dataset
    //console.log(name)

    return fetch (`https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/clients/${name}.json`)
    .then(response => response.json())
    .then(response => {
        //console.log(response)
        document.querySelector('#EpFIO').value = response.FIO
        document.querySelector('#Ephone').value = response.phone
        document.querySelector('#EpAbon').value = response.abon
        document.querySelector('#Edsale').value = response.dsale
        document.querySelector('#Esda').value = response.sda

        document.querySelector('#btn-edtCli').addEventListener('click', function(){
            editClient('clients', name,
                document.querySelector('#EpFIO').value,
                document.querySelector('#Ephone').value,
                document.querySelector('#EpAbon').value,
                document.querySelector('#Edsale').value,
                document.querySelector('#Esda').value
            )
        })
    })
}

function removeHandler(event) {
    if (!event.target.dataset.name || !event.target.dataset.link) {
        return
    }
    const {name} = event.target.dataset
    const {link} = event.target.dataset
    delData(link, name)
}

function cliWriteInDB(link, FIO, phone, abon, dsale, sda){
    return fetch(`https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/${link}.json`, {
        method: 'POST',
        body: JSON.stringify({
            FIO, phone, abon, dsale, sda
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        //console.log(response)
        document.querySelector('#pFIO').value = null
        document.querySelector('#phone').value = null
        document.querySelector('#pAbon').value = null
        document.querySelector('#dsale').value = null
        document.querySelector('#sda').value = null
        location.reload()
    })
}

function abonWriteInDB(link, name, sda, prem, price){
    return fetch(`https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/${link}.json`, {
        method: 'POST',
        body: JSON.stringify({
            name, sda, prem, price
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        //console.log(response)
        document.querySelector('#abon-name').value = null
        document.querySelector('#price').value = null
        location.reload()
    })
}

function posWriteInDB(link, FIO, date, time){
    return fetch(`https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/${link}.json`, {
        method: 'POST',
        body: JSON.stringify({
            FIO, date, time
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        //console.log(response)
        document.querySelector('#FIO').value = null
        location.reload()
    })
}

function getAbonData(){
    return fetch ('https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/abon.json')
    .then(response => response.json())
    .then(response => {
        Object.keys(response).map(key => {
            document.querySelector('.table-abon').innerHTML += `
                <tr>
                    <td>${response[key].name}</td>
                    <td>${response[key].sda}</td>
                    <td>${response[key].prem}</td>
                    <td>${response[key].price}</td>
                    <td><button class="btn-del" data-name="${key}" data-link="abon">&#10060;</button></td>
                </tr>
            `
        })
    })
}

function getSmenData(){
    return fetch ('https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/smen.json')
    .then(response => response.json())
    .then(response => {
        Object.keys(response).map(key => {
            console.log(key)
        })
    })
}

function getPosData(){
    return fetch ('https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/pos.json')
    .then(response => response.json())
    .then(response => {
        Object.keys(response).map(key => {
            document.querySelector('.table-pos').innerHTML += `
                <tr>
                    <td>${response[key].FIO}</td>
                    <td>${response[key].date}</td>
                    <td>${response[key].time}</td>
                    <td><button class="btn-del" data-name="${key}" data-link="pos">&#10060;</button></td>
                </tr>
            `
        })
    })
}

function getClientsData(){
    return fetch ('https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/clients.json')
    .then(response => response.json())
    .then(response => {
        Object.keys(response).map(key => {
            document.querySelector('.table-cli').innerHTML += `
                <tr>
                    <td>${response[key].FIO}</td>
                    <td>${response[key].phone}</td>
                    <td>${response[key].abon}</td>
                    <td>${response[key].dsale}</td>
                    <td>${response[key].sda}</td>
                    <td><button class="btn-del" data-edit="true" type="button" data-bs-toggle="modal" data-bs-target="#exampleModalEdt-cli" data-name="${key}">&#9998;</button></td>
                    <td><button class="btn-del" data-name="${key}" data-link="clients">&#10060;</button></td>
                </tr>
            `
        })
    })
}

function delData(link, name){
    return fetch(`https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/${link}/${name}.json`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(response => location.reload())
}