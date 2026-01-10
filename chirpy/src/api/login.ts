import type { Request, Response } from "express";
import type { User } from "../lib/db/schema.js";
import {
    BadRequestError,
    UserNotAuthenticatedError
} from "./errors.js";
import { config } from "../config.js";
import { checkPasswordHash, makeJWT } from "../lib/auth.js";
import { findUserByEmail } from "../lib/db/queries/users.js";

type Parameters = {
    password: string;
    email: string;
    expiresInSeconds?: number;
};

type LoginResponse = Omit<User, "hashedPassword"> & { token: string };

function isInvalidParams(p: Parameters) {
    return !p || typeof p.password !== "string" || p.password.length <= 4 ||
        typeof p.email !== "string" || p.email.length <= 3 ||
        (p.expiresInSeconds !== undefined && p.expiresInSeconds !== null && (typeof p.expiresInSeconds !== "number" || p.expiresInSeconds <= 0));
}

function toResponse(user: User, token: string): LoginResponse {
    return {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
        token,
    };
}

export async function handleLogin(req: Request, resp: Response) {
    const params: Parameters = req.body;

    if (isInvalidParams(params)) {
        throw new BadRequestError("Invalid login payload");
    }

    const user = await findUserByEmail(params.email);
    if (!user) {
        throw new UserNotAuthenticatedError("Incorrect email or password");
    }

    const isValidPassword = await checkPasswordHash(params.password, user.hashedPassword);

    if (!isValidPassword) {
        throw new UserNotAuthenticatedError("Incorrect email or password");
    }

    let expiresIn = config.jwt.defaultExpirationTimeSeconds;
    if (params.expiresInSeconds && params.expiresInSeconds < config.jwt.defaultExpirationTimeSeconds) {
        expiresIn = params.expiresInSeconds;
    }

    const token = makeJWT(user.id, expiresIn, config.jwt.secret);

    resp.status(200).json(toResponse(user, token));
}

