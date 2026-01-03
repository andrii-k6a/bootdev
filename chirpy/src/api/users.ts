import type { Request, Response } from "express";
import { BadRequestError } from "./errors.js";
import { createUser } from "../lib/db/queries/users.js";

type NewUserInput = {
    email: string;
}

export async function handleNewUser(req: Request, resp: Response) {
    const newUser: NewUserInput = req.body;

    if (!newUser || typeof newUser.email !== "string" || newUser.email.length <= 3) {
        throw new BadRequestError("Invalid new user data");
    }

    const email = newUser.email.trim().toLowerCase();

    const user = await createUser({ email });
    if (!user) {
        throw new BadRequestError("User already exists");
    }

    resp.status(201).json({
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email
    });
}

