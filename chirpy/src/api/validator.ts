import type { Request, Response } from "express";

type Err = {
    error: string;
}

type Ok = {
    valid: true;
}

type Chirp = {
    body: string;
}

const MAX_CHIRP_LENGTH = 140;

export async function handleChirpsValidation(req: Request, resp: Response) {
    let payload = "";

    req.on("data", chunk => {
        payload += chunk;
    })

    req.on("end", () => {
        let chirp: Chirp;
        try {
            chirp = JSON.parse(payload);
            if (chirp.body.length > MAX_CHIRP_LENGTH) {
                respond(resp, 400, { error: "Chirp is too long" });
            } else {
                respond(resp, 200, { valid: true })
            }
        } catch (err) {
            respond(resp, 400, { error: "Something went wrong" });
        }
    })
}

function respond(resp: Response, code: number, jsonPayload: Err | Ok) {
    resp.header("Content-Type", "application/json");
    resp.status(code).send(JSON.stringify(jsonPayload));
}

