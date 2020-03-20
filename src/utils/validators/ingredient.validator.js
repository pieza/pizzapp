const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateIngredient(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : ''

    if (!Validator.isLength(data.name, { max: 100 })) 
        errors.name = 'El nombre del ingrediente no puede tener más de 100 caracteres.'

    if (!Validator.isLength(data.name, { min: 1 })) 
        errors.name = 'El nombre del ingrediente no puede estar vacio.'

    if (!Validator.isLength(data.description, { max: 100 })) 
        errors.description = 'El nombre del ingrediente no puede tener más de 100 caracteres.'

    if (!Validator.isLength(data.description, { min: 1 })) 
        errors.description = 'El nombre del ingrediente no puede estar vacio.'

    return {
        errors,
        isValid: isEmpty(errors)
    }
}