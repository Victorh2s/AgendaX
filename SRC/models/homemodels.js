const mongoose = require('mongoose')

const HomeSchema = new mongoose.Schema({
    titulo:{type: String, required:true},
    descricao: String
});

const Homemodel = mongoose.model('Home',HomeSchema)

