function ValidationError(message) {
    this.message = message;
    this.status = 400;
}

function NotFoundError(message) {
    this.message = message;
    this.status = 400;
}

module.exports={ValidationError, NotFoundError}