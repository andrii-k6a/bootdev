import type { CommandHandler, UserCommandHandler } from "./commands";
import { readConfig } from "../config";
import { findFirstUser } from "../lib/db/queries/users";

type MiddlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export const middlewareLoggedIn: MiddlewareLoggedIn = (handler: UserCommandHandler): CommandHandler => {
    return async (cmdName: string, ...args: string[]) => {
        const currentUser = readConfig().currentUserName;
        const user = await findFirstUser(currentUser);

        if (!user) {
            throw new Error(`User not found: ${currentUser}`);
        }

        await handler(cmdName, user, ...args);
    }
}

