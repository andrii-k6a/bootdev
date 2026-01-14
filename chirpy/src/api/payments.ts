import type { Request, Response } from "express";
import { config } from "../config.js";
import { getAPIKey } from "../lib/auth.js";
import { updateChirpyRed } from "../lib/db/queries/users.js";
import { UserNotAuthenticatedError } from "./errors.js";

export async function handleChirpyRedUpgrade(req: Request, resp: Response) {
    type Parameters = {
        event: string;
        data: {
            userId: string;
        };
    }

    const apiKey = getAPIKey(req);
    if (apiKey !== config.polka.apiKey) {
        throw new UserNotAuthenticatedError("You are not authorized to upgrade");
    }


    // TODO add user id validation - if it is not a valid uuid the request fails with 500 status
    const params: Parameters = req.body;

    if (params.event !== "user.upgraded") {
        resp.status(204).send();
        return;
    }

    const user = await updateChirpyRed(params.data.userId, true);

    if (!user) {
        resp.status(404).send();
        return;
    }

    resp.status(204).send();
}

