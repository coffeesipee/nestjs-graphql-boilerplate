import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidCredentialException extends HttpException {
    constructor() {
        super('Email/Password is incorrect', HttpStatus.UNPROCESSABLE_ENTITY)
    }
}