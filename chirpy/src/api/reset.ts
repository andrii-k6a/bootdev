import type { Request, Response } from "express";
import { ForbiddenError } from "./errors.js";
import { config } from "../config.js";
import { deleteAllUsers } from "../lib/db/queries/users.js";

export async function handleReset(_: Request, response: Response) {
    if (config.api.platform !== "dev") {
        throw new ForbiddenError("Reset is forbidden in non dev envs");
    }
    config.api.fileserverHits = 0;
    const deletedUsers = await deleteAllUsers();
    response.status(200).json({
        message: "Reset completed",
        deletedUsers: deletedUsers.length,
        fileserverHits: config.api.fileserverHits
    });
}

