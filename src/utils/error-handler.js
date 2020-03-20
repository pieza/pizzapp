module.exports = function handleError(err, req, res, next) {
    console.log(err)
    return res.status(501).json({errors: err})
}