const db = require('../../database/db')
const User = require('../../models/User')

exports.index = (req,res) =>{
    res.render('Auth/login',{
        title:'Login User'
    })

}




// bcrypt.compare(someOtherPlaintextPassword, hash).then(function(result) {
//     // result == false
// });