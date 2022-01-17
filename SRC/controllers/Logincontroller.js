const Loogin = require("../models/loginmodel");

exports.index = (req, res)=>{
  if(req.session.user) return res.render('login-logado')
    res.render('login')
}

exports.register = async (req, res)=> { 
  try{
    const login = new Loogin(req.body)
    await login.register()
    if(login.error.length > 0){
      req.flash('error',login.error)
      req.session.save(()=>{
      return  res.redirect('/login/index')
      })
    return
    }
    req.flash('success','Seu usuário foi criado com sucesso')
    req.session.save(()=>{
    return  res.redirect('/login/index')
    })
  }catch(e){
    console.log(e)
    res.render('404')
  }
}

  exports.logiin = async (req, res)=> { 
    try{
      const login = new Loogin(req.body)
      await login.logar()

      if(login.error.length > 0){
        req.flash('error',login.error)
        req.session.save(()=>{
        return  res.redirect('/login/index')
        })
      return
      }
      

      req.flash('success','Bem vindo a agenda')
      req.session.user = login.user
      req.session.save(()=>{
      return  res.redirect('/login/index')
      })
    }catch(e){
      console.log(e)
      res.render('404')
    }
};

exports.logout = (req, res)=>{
  req.session.destroy()
  res.redirect('/')
}