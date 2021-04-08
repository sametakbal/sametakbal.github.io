console.log('Its working')

let theme = localStorage.getItem('theme')

if (theme == null) {
	setTheme('light')
} else {
	setTheme(theme)
}

let themeDots = document.getElementsByClassName('theme-dot')


for (var i = 0; themeDots.length > i; i++) {
	themeDots[i].addEventListener('click', function () {
		let mode = this.dataset.mode
		console.log('Option clicked:', mode)
		setTheme(mode)
	})
}

function setTheme(mode) {
	if (mode == 'light') {
		document.getElementById('theme-style').href = 'default.css'
	}

	if (mode == 'blue') {
		document.getElementById('theme-style').href = 'blue.css'
	}

	if (mode == 'green') {
		document.getElementById('theme-style').href = 'green.css'
	}

	if (mode == 'purple') {
		document.getElementById('theme-style').href = 'purple.css'
	}

	localStorage.setItem('theme', mode)
}

function sendMail() {
	document.getElementById("submit-btn").disabled = true;
	var fullName = document.getElementById("name");
	var subject = document.getElementById("subject");
	var email = document.getElementById('email');
	var message = document.getElementById("message");
	if (fullName.value == "" || subject.value == "" || email.value == "" || message.value == "") {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Lütfen tüm alanları doldurunuz!'
		})
	} else {
		let timerInterval
		Swal.fire({
			title: 'Mesajınız iletiliyor!',
			html: 'Bu mesaj <b></b> mili saniye sonra kapanacaktır.',
			timer: 2000,
			timerProgressBar: true,
			willOpen: () => {
				Swal.showLoading()
				timerInterval = setInterval(() => {
					const content = Swal.getContent()
					if (content) {
						const b = content.querySelector('b')
						if (b) {
							b.textContent = Swal.getTimerLeft()
						}
					}
				}, 100)
			},
			willClose: () => {
				clearInterval(timerInterval)
			}
		}).then((result) => {
			/* Read more about handling dismissals below */
			if (result.dismiss === Swal.DismissReason.timer) {
				console.log('I was closed by the timer')
			}
		});
		var tmp = { fullName: fullName.value, subject: subject.value, email: email.value, content: message.value };
		var dataJson = JSON.stringify(tmp);
		console.log(dataJson);
		fetch('https://www.netlabsoft.com/Mail/send', {
			method: 'POST', body: dataJson, headers: {
				'Content-Type': 'application/json'
			},
		})
			.then(res => res.json())
			.then(result => {
				Swal.fire(
					'Tamamdır!',
					'En kısa zamanda sizinle iletişime geçeceğim!',
					'success'
				);
				fullName.value = '';
				subject.value = '';
				email.value = '';
				message.value = '';
			});
	}
	document.getElementById("submit-btn").disabled = false;
}
