import type { Request, Response } from "express";
import { updateChirpyRed } from "../lib/db/queries/users.js";

export async function handleChirpyRedUpgrade(req: Request, resp: Response) {
    type Parameters = {
        event: string;
        data: {
            userId: string;
        };
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

