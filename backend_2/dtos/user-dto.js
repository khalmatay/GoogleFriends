module.exports = class UserDto {
    name;
    email;
    id;
    status;
    isActivated;
    activationLink;
    friends;



    constructor(model) {
        this.name = model.name;
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.status=model.status;
        this.activationLink=model.activationLink;
        this.friends=model.friends;
    }
}