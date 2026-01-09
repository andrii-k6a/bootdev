import { describe, it, expect, beforeAll } from "vitest";
import { UserNotAuthenticatedError } from "../api/errors.js";
import {
    hashPassword,
    checkPasswordHash,
    makeJWT,
    validateJWT
} from "./auth.js";

describe("Password Hashing", () => {
    const password1 = "password1";
    const password2 = "password2";
    let hash1: string;
    let hash2: string;

    beforeAll(async () => {
        hash1 = await hashPassword(password1);
        hash2 = await hashPassword(password2);
    });

    it("should return true for correct password", async () => {
        const result = await checkPasswordHash(password1, hash1);
        expect(result).toBe(true);
    });

    it("should return false for incorrect password", async () => {
        const result = await checkPasswordHash("wrong-password", hash1);
        expect(result).toBe(false);
    })

    it("should return false when password doesn't match a different hash", async () => {
        const result = await checkPasswordHash(password1, hash2);
        expect(result).toBe(false);
    });

    it("should return false for an empty password", async () => {
        const result = await checkPasswordHash("", hash1);
        expect(result).toBe(false);
    });

    it("should return false for an invalid hash", async () => {
        const result = await checkPasswordHash(password1, "invalidhash");
        expect(result).toBe(false);
    });
});

describe("JWT Functions", () => {
    const userId = "user-id-42";
    const expireIn = 3600;
    const secret = "secret-value";

    const jwt = makeJWT(userId, expireIn, secret);

    it("should validate correct token", async () => {
        const result = validateJWT(jwt, secret);
        expect(result).toBe(userId);
    });

    it("should reject invalid token", async () => {
        expect(() => validateJWT("invalid.token.123", secret))
            .toThrow(UserNotAuthenticatedError);
    });

    it("should reject expired token", async () => {
        const expiredToken = makeJWT(userId, -99, secret);

        expect(() => validateJWT(expiredToken, secret))
            .toThrow("Your token expired");
    });

    it("should reject token with wrong secret", async () => {
        expect(() => validateJWT(jwt, "wrong-secret"))
            .toThrow(UserNotAuthenticatedError);
    })
});

