const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateOrder(data) {
    let { name, email, password, password2, tel } = data
    //Required Fields
    if (!name || !email || !password || !password2 || !tel)
        return {
            errors: 'Por favor complete todos los campos solicitados.',
            isValid: false
        }

    //Check password match
    if (password !== password2)
        return {
            errors: 'Las contraseñas no coinciden.',
            isValid: false
        }

    //Check password length
    if (password.length < 6) {
        return {
            errors: 'La contraseña debe contener al menos 6 caracteres.',
            isValid: false
        }
    }

    return {
        errors: '',
        isValid: true
    }
}