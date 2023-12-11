module.exports = class UserDto {
    username;
    id;

    constructor(model) {
        this.id = model._id;
        this.username = model.username;
    }
}