class AppError extends Error {
    constructor(
        name,
        message,
        explanation,
        statusCode
    ){
        super();
        this.name = name;
        this.mesage = message;
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;