//import {GetToken} from '../html/js/app.js'
document.querySelector('.auth-btn').addEventListener('click', AutValid)
document.querySelector('#link').hidden = true

function AutValid(){
    var form = document.getElementById('formAut')
    var isValid = form.reportValidity()
  
    if (isValid) {
        form.addEventListener('submit', AuthFormHandler, {once: true})
    }
}

var login = null, pass = null

function AuthFormHandler(event){
    event.preventDefault()
  
    login = document.querySelector('#login').value
    pass = document.querySelector('#pass').value
  
    if (login != null && pass != null){
        authWithEmailAndPassword(login, pass)
        .then(IsToken)
    }
}

function authWithEmailAndPassword(email, password){
    const apiKey = 'AIzaSyD5rPbLqIhxX1RdUUJdsPOSqJCIZIjfV3o'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,{
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data.idToken)
}

function IsToken(token){
    if(token){
        sessionStorage.setItem('Token', token)
        document.querySelector('#link').click()
    }
    else{
        alert('Неверные данные для входа')
    }
}