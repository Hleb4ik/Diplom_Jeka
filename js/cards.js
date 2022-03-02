getAbonData()

function getAbonData(){
    return fetch ('https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/abon.json')
    .then(response => response.json())
    .then(response => {
        Object.keys(response).map(key => {
            document.querySelector('.club-cards').innerHTML += `
                <tr>
                    <td>${response[key].name}</td>
                    <td>${response[key].prem}</td>
                    <td>${response[key].price}</td>
                </tr>`
        })
    })
}