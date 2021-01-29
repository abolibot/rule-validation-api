class ValidationRuleFailedError extends Error {
  constructor() {
    super();

    Object.setPrototypeOf(this, ValidationRuleFailedError.prototype);
  }
}

export default ValidationRuleFailedError;
