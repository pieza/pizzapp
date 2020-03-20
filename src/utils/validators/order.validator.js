const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateOrder(data) {
    let errors = {};

    data.user_id = !isEmpty(data.user_id) ? data.user_id : ''

    if (Validator.isEmpty(data.user_id))
        errors.user_id = 'No se especificó el usuario.'

    if (!data.products)
        errors.products = 'La orden no contiene productos.'

    return {
        errors,
        isValid: isEmpty(errors)
    }
}