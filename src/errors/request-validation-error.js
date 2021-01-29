class RequestValidationError extends Error {
  constructor(message) {
    super();

    this.statusCode = 400;
    this.message = message;
    this.status = 'error';
    this.data = null;

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return {
      message: this.message,
      status: this.status,
      data: this.data
    };
  }
}

export default RequestValidationError;
