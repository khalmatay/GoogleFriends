const {Schema, model}= require('mongoose')
const TokenSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},//айдишник пользлователя достаем из схемы поля types ссылка для пользователя
    refreshToken: {type:String, required: true}//рефреш токен

})
module.exports = mongoose.model('Token',TokenSchema);