const validators = {
    ingredient: require('./ingredient.validator'),
    user: require('./user.validator'),
    order: require('./order.validator')
}

const validate = (validator, data) => {
    const { errors, isValid } = validators[validator.toLowerCase()](data)  

    if(!isValid)
        throw new Error(errors)
}
 
module.exports = {
    validators,
    validate
}
