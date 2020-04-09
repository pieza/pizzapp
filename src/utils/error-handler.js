module.exports = function handleError(err, req, res, next) {
    return res.status(501).json({ message: err.message })
}