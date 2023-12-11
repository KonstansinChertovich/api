module.exports = class ClientDto {
    username;
    id;

    constructor(model) {
        this.username = model.username;
        this.id = model._id;
    }
}