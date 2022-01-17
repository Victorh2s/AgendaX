
const mongoose = require('mongoose');
const validator = require('validator');


const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  telefone: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now },
});

    const ContatoModel = mongoose.model('Contato', ContatoSchema);

    class Contato{
        constructor(body){
            this.body = body
            this.error=[]
            this.contato = null
        }



    static async buscaPorId(id){
            if(typeof id !== 'string') return
            const user = await ContatoModel.findById(id)
            return user
    }

    async register() {
    this.valida();
    if(this.error.length > 0) return;
    this.contato = await ContatoModel.create(this.body);
    };

    valida() {
    this.cleanUp();

    // Validação
    // O e-mail precisa ser válido
    if(this.body.email && !validator.isEmail(this.body.email)) this.error.push('E-mail inválido');
    if(!this.body.nome) this.error.push('Nome é um campo obrigatório.');
    };

    cleanUp () {
    for(const key in this.body) {
        if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
        }
    }

    this.body = {
        nome: this.body.nome,
        sobrenome: this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone,
    };
    };

    async edit(id){
        if(typeof id !== 'string') return
        this.valida();
        if(this.error.length > 0) return
        this.contato = await  ContatoModel.findByIdAndUpdate(id,this.body, { new: true})
    }
    static async buscacontato(){
        const contatos = await ContatoModel.find()
        .sort({criadoEm: -1})
        return contatos
    }

    static async delete(id){
        if(typeof id !== 'string') return
        const contato = await ContatoModel.findOneAndDelete({_id: id})
        return contato
    }

}






module.exports = Contato