const validators = {
    ingredient: require('./ingredient.validator'),
    order: require('./order.validator')
}

const validate = (validator, data) => {
    const { errors, isValid } = validators[validator.toLowerCase()](data)  

    if(!isValid)
        throw errors
}
 
module.exports = {
    validators,
    validate
}
