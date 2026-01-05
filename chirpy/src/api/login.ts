import type { Request, Response } from "express";
import type { User } from "../lib/db/schema.js";
import {
    BadRequestError,
    UserNotAuthenticatedError
} from "./errors.js";
import { checkPasswordHash } from "../lib/auth.js";
import { findUserByEmail } from "../lib/db/queries/users.js";

type LoginRequest = {
    password: string;
    email: string;
}

type LoginResponse = Omit<User, "hashedPassword">;

function isInvalidRequest(r: LoginRequest) {
    return !r || typeof r.password !== "string" || r.password.length <= 4 ||
        typeof r.email !== "string" || r.email.length <= 3;
}

function toResponse(user: User): LoginResponse {
    return {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
    };
}

export async function handleLogin(req: Request, resp: Response) {
    const loginRequest: LoginRequest = req.body;

    if (isInvalidRequest(loginRequest)) {
        throw new BadRequestError("Invalid login payload");
    }

    const user = await findUserByEmail(loginRequest.email);
    if (!user) {
        throw new UserNotAuthenticatedError("Incorrect email or password");
    }

    const isValidPassword = await checkPasswordHash(loginRequest.password, user.hashedPassword);

    if (!isValidPassword) {
        throw new UserNotAuthenticatedError("Incorrect email or password");
    }

    resp.status(200).json(toResponse(user));
}

