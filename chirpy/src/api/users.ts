import type { Request, Response } from "express";
import type { User } from "../lib/db/schema.js";
import { config } from "../config.js";
import { BadRequestError } from "./errors.js";
import {
    getBearerToken,
    validateJWT,
    hashPassword
} from "../lib/auth.js";
import { createUser, updateCredentials } from "../lib/db/queries/users.js";

type UserParameters = {
    password: string;
    email: string;
}

type NewUserResponse = Omit<User, "hashedPassword">;

function isInvalidUser(u: UserParameters) {
    return !u || typeof u.email !== "string" || u.email.length <= 3 ||
        typeof u.password !== "string" || u.password.length <= 4;
}

function toResponse(user: User): NewUserResponse {
    return {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
        isChirpyRed: user.isChirpyRed,
    };
}

export async function handleNewUser(req: Request, resp: Response) {
    const newUser: UserParameters = req.body;

    if (isInvalidUser(newUser)) {
        throw new BadRequestError("Invalid new user data");
    }

    const hashedPassword = await hashPassword(newUser.password);
    const email = newUser.email.trim().toLowerCase();

    const user = await createUser({ hashedPassword, email });
    if (!user) {
        throw new BadRequestError("User already exists");
    }

    resp.status(201).json(toResponse(user));
}

export async function handleCredentialsUpdate(req: Request, resp: Response) {
    const token = getBearerToken(req);
    const userId = validateJWT(token, config.jwt.secret);

    const user: UserParameters = req.body;
    if (isInvalidUser(user)) {
        throw new BadRequestError("Invalid data for credentials update");
    }

    const hashedPassword = await hashPassword(user.password);
    const email = user.email.trim().toLowerCase();

    const updatedUser = await updateCredentials(userId, email, hashedPassword);
    if (!updatedUser) {
        throw new Error("Failed to update credentials");
    }

    resp.status(200).json(toResponse(updatedUser));
}

