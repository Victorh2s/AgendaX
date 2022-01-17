const express = require('express')
const route = express.Router()
const homecontroller = require('./SRC/controllers/homecontroller')
const loogincontroller = require('./SRC/controllers/logincontroller')
const contatocontroller = require('./SRC/controllers/contatocontroller')
const { loginRequired } = require('./SRC/Middlewares/Middleware')



//ROTAS DA HOME
route.get('/',  homecontroller.index)

//ROTAS DE LOGIN

route.get('/login/index', loogincontroller.index)
route.post('/login/register', loogincontroller.register)
route.post('/login/login', loogincontroller.logiin)
route.get('/login/logout', loogincontroller.logout)

//ROTAS DE CONTATO 

route.get('/contato/index', loginRequired, contatocontroller.index)
route.post('/contato/register', loginRequired, contatocontroller.register)
route.get('/contato/index/:id', loginRequired, contatocontroller.editindex)
route.post('/contato/edit/:id', loginRequired, contatocontroller.edit)
route.get('/contato/delete/:id', loginRequired, contatocontroller.delete)



module.exports = route