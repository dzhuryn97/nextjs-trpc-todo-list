export class BusinessException extends Error {
    constructor(
        message: string
    ) {
        super(message);
    }
}

export class EntityNotFoundException extends BusinessException {
    constructor(
        message: string
    ) {
        super(message);
    }
}