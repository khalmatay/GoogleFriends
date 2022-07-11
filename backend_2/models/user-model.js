import { Schema, model } from 'mongoose';

const UserSchema = new Schema({

    email:{type: String, unique:true, required: true},
    password:{type: String,required: true },
    isActivated:{type: Boolean,default: false},//подтвердил почту или нет
    activationLink:{type: String }//ссылка для активации

})
module.exports = model('User',UserSchema);