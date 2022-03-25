module.exports = class Excetion {
    constructor(message, code = 400) {
        this.message = message;
        this.code = code;
    }
};