const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateIngredient(data) {

    data.name = !isEmpty(data.name) ? data.name : ''

    if (!Validator.isLength(data.name, { max: 100 }))
        return {
            errors: 'El nombre del ingrediente no puede tener más de 100 caracteres.',
            isValid: false
        }

    if (!Validator.isLength(data.name, { min: 1 })) 
        return {
            errors: 'El nombre del ingrediente no puede estar vacio.',
            isValid: false
        }

    if (!Validator.isLength(data.description, { max: 100 })) 
        return {
            errors: 'El nombre del ingrediente no puede tener más de 100 caracteres.',
            isValid: false
        }

    if (!Validator.isLength(data.description, { min: 1 })) 
        return {
            errors: 'El nombre del ingrediente no puede estar vacio.',
            isValid: false
        }

    if (!data.price || data.price < 0)
        return {
            errors: 'El precio del ingrediente debe ser mayor o igual a 0.',
            isValid: false
        }

    if (!data.zindex || data.zindex < 0) 
        return {
            errors: 'La posición Z debe ser definida.',
            isValid: false
        }

    return {
        errors: "",
        isValid: true
    }
}