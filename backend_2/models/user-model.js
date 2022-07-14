const {Schema, model}= require('mongoose')

const UserSchema = new Schema({

    email:{type: String, unique:true, required: true},//тип стринг уникальный обязательный 
    password:{type: String,required: true },
    isActivated:{type: Boolean,default: false},//подтвердил почту или нет
    activationLink:{type: String }//ссылка для активации

})
module.exports = model('User',UserSchema);