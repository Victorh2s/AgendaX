const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const LoginSchema = new mongoose.Schema({
    email:{type: String, required:true},
    password:{type: String, required:true} 
});

const Loginmodel = mongoose.model('Login',LoginSchema)

class login{
    constructor(body){
        this.body = body
        this.error=[]
        this.user = null
    }

    async logar(){
        this.valida()
        if(this.error.length > 0) return;

        this.user = await Loginmodel.findOne({email: this.body.email})
        
        if(!this.user){
            this.error.push('Usuário não existe.')
            return
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.error.push('Senha inválida')
            this.user = null
            return
        }
        
    }



    async register(){
        this.valida()
        if(this.error.length > 0) return;

        await this.userExists();
        if(this.error.length > 0) return;

        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)
        if(this.error.length > 0) return;
        this.user = await Loginmodel.create(this.body)
        
    }

    valida(){
        this.cleanUp()
        if(!validator.isEmail(this.body.email)){
            this.error.push('E-mail inválido')
        }
        if(this.body.password.length < 5 || this.body.password.length >20){
        this.error.push('A senha precisa ter entre 5 e 20 caracteres')
    }

    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }
        this.body ={
            email: this.body.email,
            password : this.body.password
        }
    }

    async userExists() {
        this.user = await Loginmodel.findOne({ email: this.body.email });
        if(this.user) this.error.push('Usuário já existe.');
      }
}

module.exports = login