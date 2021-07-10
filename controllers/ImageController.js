const path = require('path')

exports.index = (req, res) => {
    return res.sendFile(path.join(__dirname, `../public/storage/uploads/${req.params.image}`))
}