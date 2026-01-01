export class HttpError extends Error {
    constructor(message: string, public statusCode: number) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class UserNotAuthenticatedError extends HttpError {
    constructor(message: string) {
        super(message, 401);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message: string) {
        super(message, 403);
    }
}

export class NotFoundError extends HttpError {
    constructor(message: string) {
        super(message, 404);
    }
}

