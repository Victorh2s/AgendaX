const contato = require('../models/Contatomodels')

exports.index = async (req,res)=>{
        // console.log(req.flash('error'),req.flash('success'),req.flash('info'))
        const contatos = await contato.buscacontato()
        res.render('index', {contatos})
        return
}

