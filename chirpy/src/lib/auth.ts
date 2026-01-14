import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import crypto from "crypto";
import { config } from "../config.js";
import { UserNotAuthenticatedError } from "../api/errors.js";

type Payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

export async function hashPassword(password: string) {
    return await argon2.hash(password);
}

export async function checkPasswordHash(password: string, hash: string) {
    if (!password) return false;
    try {
        return await argon2.verify(hash, password);
    } catch (err) {
        return false;
    }
}

export function makeRefreshToken() {
    return crypto.randomBytes(32).toString("hex");
}

export function makeJWT(userId: string, expiresIn: number, secret: string): string {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expireAt = issuedAt + expiresIn;
    const payload: Payload = {
        iss: config.jwt.issuer,
        sub: userId,
        iat: issuedAt,
        exp: expireAt,
    };

    return jwt.sign(payload, secret, { algorithm: "HS256" });
}

export function validateJWT(tokenString: string, secret: string): string {
    let decoded: JwtPayload;
    try {
        decoded = jwt.verify(tokenString, secret) as JwtPayload;
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            throw new UserNotAuthenticatedError("Your token expired");
        }
        throw new UserNotAuthenticatedError("Token verification failed");
    }

    if (decoded.iss !== config.jwt.issuer) {
        throw new UserNotAuthenticatedError("Invalid token issuer");

    }

    if (!decoded.sub || typeof decoded.sub !== "string") {
        throw new UserNotAuthenticatedError("Missing token subject");
    }

    return decoded.sub;
}

export function getBearerToken(req: Request): string {
    return getToken(req, "Bearer");
}

export function getAPIKey(req: Request): string {
    return getToken(req, "ApiKey");
}

function getToken(req: Request, type: string) {
    const authHeader = req.headers?.authorization;
    if (!authHeader) {
        throw new UserNotAuthenticatedError("Missing authorization header");
    }
    const splitted = authHeader.split(" ");
    if (splitted.length !== 2 || splitted[0] !== type) {
        throw new UserNotAuthenticatedError("Invalid authorization header");
    }
    return splitted[1].trim();
}

