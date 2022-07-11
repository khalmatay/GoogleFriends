import { Schema, model } from 'mongoose';

const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},//айдишник пользлователя достаем из схемы поля types ссылка для пользователя
    refreshToken: {type:String, required: true}//рефреш токен

})
module.exports = model('Token',TokenSchema);