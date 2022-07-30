const {Schema, model}= require('mongoose')

const UserSchema = new Schema({
    name:{type: String, unique:true, required: true},
    email:{type: String, unique:true, required: true},//тип стринг уникальный обязательный 
    password:{type: String,required: true },
    status:{type:String,default:"Не в сети"},
    isActivated:{type: Boolean,default: false},//подтвердил почту или нет
    activationLink:{type: String },//ссылка для активации
    friends:{type:Array,default:[]}

})
module.exports = model('User',UserSchema);