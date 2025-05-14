document.getElementById('checkout-form').addEventListener("submit", function (e) {
    e.preventDefault()

    let nome = document.getElementById('nome')
    let email = document.getElementById('email')
    let whatsapp = document.getElementById('whatsapp')
    let botao = e.target.querySelector("button[type='submit']")

    let isValid = true

    if (nome.value.trim() === '') {
        nome.classList.add('is-invalid')
        isValid = false
    } else {
        nome.classList.remove('is-invalid')
    }

    const emailRegex = /^\S+@\S+\.\S+$/
    if (!emailRegex.test(email.value)) {
        email.classList.add('is-invalid')
        isValid = false
    } else {
        email.classList.remove('is-invalid')
    }

    const phoneDigits = whatsapp.value.replace(/\D/g, '')
    if (phoneDigits.length < 10) {
        whatsapp.classList.add('is-invalid')
        isValid = false
    } else {
        whatsapp.classList.remove('is-invalid')
    }

    if (isValid) {
        // Feedback visual de carregamento
        botao.disabled = true
        const originalText = botao.textContent
        botao.textContent = 'Carregando...'

        const templateParams = {
            nome: nome.value,
            email: email.value,
            whatsapp: whatsapp.value
        }

        emailjs.send(
            'service_gh8clpe',
            'template_r7vh6rk',
            templateParams,
            'RGF3EmnIiQ62BX9IH'
        )
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text)
                window.location.href = 'obrigado_page.html'
            }, function (error) {
                console.error('Erro ao enviar email:', error)
                alert('Erro ao enviar e-mail. Tente novamente.')
                // Reabilita botão
                botao.disabled = false
                botao.textContent = originalText
            })
    }
})

// Carrega EmailJS SDK
(function () {
    emailjs.init('RGF3EmnIiQ62BX9IH')
})()
