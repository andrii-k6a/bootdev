import { setUser } from "../config";

export function handleLogin(cmdName: string, username: string) {
    if (!username) {
        throw new Error("Username is missing");
    }
    setUser(username);
    console.log("User has been set");
}

