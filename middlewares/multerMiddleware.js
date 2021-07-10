const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/storage/uploads')
    },
    
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    },
})

const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    },
    storage: storage
})

module.exports = upload