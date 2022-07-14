module.exports = class UserDto{
    email;
    id;
    isActivaited;
    constructor(model){
        this.email = model.email;
        this.id = model._id;
        this.isActivaited = model.isActivaited;

    }
}