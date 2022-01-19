exports.middleGlobal=(req,res,next)=>{
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    res.locals.user = req.session.user
    next()
}

exports.checkCsurfError = (err, req, res, next ) => {
    if(err){
        return res.render('404')
    }
    next()
}

exports.csrfMiddleware = (req, res, next)=>{
    res.locals.csrfToken = req.csrfToken()
    next()
}

exports.loginRequired = (req, res, next)=>{
    console.log('Ola mundo')
    if(!req.session.user){
        req.flash('error', 'Você precisa fazer login')
        req.session.save(()=> res.redirect('/'))
        return
    }
    next()
}

// PARA USAR MAIS DE UM MIDDLE DE EXPORTS.NOMEDOMIDDLE E LA NO SERVE USE CONST {NOME DOS MIDDLES } = REQUIRE('')