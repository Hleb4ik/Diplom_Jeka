$(function () {
	$(window).scroll(function() {
	    $('.top').each(function(){
	        var imagePos = $(this).offset().top;

	        var topOfWindow = $(window).scrollTop();
	        if (imagePos < topOfWindow+650) {
	            $(this).addClass("fadeInRight");
	        }
	    });
	});
	$(window).scroll(function() {
	    $('.bottom').each(function(){
	        var imagePos = $(this).offset().top;

	        var topOfWindow = $(window).scrollTop();
	        if (imagePos < topOfWindow+650) {
	            $(this).addClass("fadeInLeft");
	        }
	    });
	});
	$(window).scroll(function() {
	    $('.img-two').each(function(){
	        var imagePos = $(this).offset().top;

	        var topOfWindow = $(window).scrollTop();
	        if (imagePos < topOfWindow+650) {
	            $(this).addClass("fadeInRight");
	        }
	    });
	});
	$(window).scroll(function() {
	    $('.coach').each(function(){
	        var imagePos = $(this).offset().top;

	        var topOfWindow = $(window).scrollTop();
	        if (imagePos < topOfWindow+650) {
	            $(this).addClass("fadeInLeft");
	        }
	    });
	});
	$(window).scroll(function() {
	    $('.cards').each(function(){
	        var imagePos = $(this).offset().top;

	        var topOfWindow = $(window).scrollTop();
	        if (imagePos < topOfWindow+650) {
	            $(this).addClass("fadeInRight");
	        }
	    });
	});
	$(window).scroll(function() {
	    $('.yandex-map').each(function(){
	        var imagePos = $(this).offset().top;

	        var topOfWindow = $(window).scrollTop();
	        if (imagePos < topOfWindow+650) {
	            $(this).addClass("fadeInUp");
	        }
	    });
	});
	$(window).scroll(function() {
	    $('.rpc').each(function(){
	        var imagePos = $(this).offset().top;

	        var topOfWindow = $(window).scrollTop();
	        if (imagePos < topOfWindow+650) {
	            $(this).addClass("fadeInRight");
	        }
	    });
	});
	$(window).scroll(function() {
	    $('.form').each(function(){
	        var imagePos = $(this).offset().top;

	        var topOfWindow = $(window).scrollTop();
	        if (imagePos < topOfWindow+650) {
	            $(this).addClass("fadeInLeft");
	        }
	    });
	});
})

document.querySelector('#addForm').addEventListener('click', formValid)

function addInDB(event){
	event.preventDefault()
	const FIO = document.querySelector('#FIO').value,
	phone = document.querySelector('#phone').value,
	trener = document.querySelector('.select-trener').value,
	card = document.querySelector('.select-card').value
	return fetch(`https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/requests.json`, {
        method: 'POST',
        body: JSON.stringify({
            FIO, phone, trener, card
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
		document.querySelector('#FIO').value = ``
		document.querySelector('#phone').value = ``
		document.querySelector('.select-trener').value = ``
		document.querySelector('.select-card').value = ``
		alert('Ваша заявка в обработке!')
		console.log(response)
    })
}

function formValid(){
	var form = document.getElementById('formApplication')
	var isValid = form.reportValidity()
  
	if (isValid) {
		form.addEventListener('submit', addInDB, {once: true})
	}
}

// Form validation
(function (){
    var forms = document.querySelectorAll('.needs-validation');

    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
})()

getAbonData()

function getAbonData(){
    return fetch ('https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/abon.json')
    .then(response => response.json())
    .then(response => {
        Object.keys(response).map(key => {
            document.querySelector('.select-card').innerHTML += `
            <option value="${response[key].name}">${response[key].name}</option>`
        })
    })
}

// Auth in admin panel
function runOnKeys(func, ...codes) {
	let pressed = new Set()
  
	document.addEventListener('keydown', function(event) {
	  pressed.add(event.code)
  
	  for (let code of codes) { // все ли клавиши из набора нажаты?
		if (!pressed.has(code)) {
		  return;
		}
	  }
  
	  pressed.clear()
	  func()
	});
  
	document.addEventListener('keyup', function(event) {
	  pressed.delete(event.code)
	});
  }
  
  runOnKeys(
	() => document.querySelector('.admAuth').click(),
	"KeyA",
	"KeyD",
	"KeyM"
  );