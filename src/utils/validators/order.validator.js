const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateOrder(data) {

    data.user_id = !isEmpty(data.user_id) ? data.user_id : ''

    if (Validator.isEmpty(data.user_id))
        return {
            errors: 'No se especificó el usuario.',
            isValid: false
        }

    if (!data.products)
        return {
            errors: 'La orden no contiene productos.',
            isValid: false
        }

    return {
        errors: '',
        isValid: true
    }
}