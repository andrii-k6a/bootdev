import type { Request, Response } from "express";
import type { User } from "../lib/db/schema.js";
import { BadRequestError } from "./errors.js";
import { hashPassword } from "../lib/auth.js";
import { createUser } from "../lib/db/queries/users.js";

type NewUserRequest = {
    password: string;
    email: string;
}

type NewUserResponse = Omit<User, "hashedPassword">;

function isInvalidUser(u: NewUserRequest) {
    return !u || typeof u.email !== "string" || u.email.length <= 3 ||
        typeof u.password !== "string" || u.password.length <= 4;
}

function toResponse(user: User): NewUserResponse {
    return {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
    };
}

export async function handleNewUser(req: Request, resp: Response) {
    const newUser: NewUserRequest = req.body;

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

