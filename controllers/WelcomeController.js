exports.index = (req,res) =>{
    res.render('index',{
        title:'Welcome Page 3'
    })
}
exports.show = (req,res) =>{
    res.render('index',{
        title:'Welcome Page 2'
    })
}