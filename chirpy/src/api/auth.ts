import type { Request, Response } from "express";
import type { User } from "../lib/db/schema.js";
import {
    BadRequestError,
    UserNotAuthenticatedError
} from "./errors.js";
import { config } from "../config.js";
import {
    checkPasswordHash,
    getBearerToken,
    makeJWT,
    makeRefreshToken,
} from "../lib/auth.js";
import { findUserByEmail } from "../lib/db/queries/users.js";
import {
    findActiveRefreshToken,
    saveNewRefreshToken,
    revokeRefreshToken
} from "../lib/db/queries/refresh.js";

type Parameters = {
    password: string;
    email: string;
};

type LoginResponse = Omit<User, "hashedPassword"> & {
    token: string;
    refreshToken: string;
};

function isInvalidParams(p: Parameters) {
    return !p || typeof p.password !== "string" || p.password.length <= 4 ||
        typeof p.email !== "string" || p.email.length <= 3;
}

function toResponse(user: User, accessToken: string, refreshToken: string): LoginResponse {
    return {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
        token: accessToken,
        refreshToken,
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

    const refreshToken = makeRefreshToken();

    const saved = await saveNewRefreshToken(refreshToken, user.id);
    if (!saved) {
        throw new UserNotAuthenticatedError("Failed to save refresh token");
    }

    const accessToken = makeJWT(user.id, config.jwt.accessTokenExpirationTimeout, config.jwt.secret);

    resp.status(200).json(toResponse(user, accessToken, refreshToken));
}

export async function handleRefresh(req: Request, resp: Response) {
    const refreshToken = getBearerToken(req);

    const record = await findActiveRefreshToken(refreshToken);
    if (!record) {
        throw new UserNotAuthenticatedError("Invalid refresh token");
    }

    const newJWT = makeJWT(record.userId, config.jwt.accessTokenExpirationTimeout, config.jwt.secret);

    resp.status(200).json({ token: newJWT });
}

export async function handleRevoke(req: Request, resp: Response) {
    const refreshToken = getBearerToken(req);
    await revokeRefreshToken(refreshToken);
    resp.status(204).send();
}

