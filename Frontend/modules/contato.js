
export default class login{
    constructor(formClass,){
        this.form = document.querySelector(formClass)
    }

    ini(){
        this.events()
    }

    events(){
        
  
        if(!this.form)return
        this.form.addEventListener('submit', e =>{
            e.preventDefault()
            this.validade(e)
        })
    }
   
    validade(e){
        
        for(let errorText of this.form.querySelectorAll('.Error')) {
            errorText.remove();
          }  
        const el = e.target
        const emailinput = el.querySelector('input[name = "email"]')
        const passowordinput = el.querySelector('input[name = "password"]')
        let error = false
        
        if(!validator.isEmail(emailinput.value)){
           this.MostrarErro(emailinput,'E-mail inválido')
            error = true
        }

        if(passowordinput.value.length < 5 || passowordinput.value.length > 25){
            this.MostrarErro(passowordinput, 'Senha precisa ter entre 5 a 50 caracteres')
            error = true
        }
        if(!error) el.submit()
    }


    MostrarErro(campo, msg){
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('Error')
        campo.insertAdjacentElement('beforebegin', div);
    }
}