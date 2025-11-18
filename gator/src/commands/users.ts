import { readConfig, setUser } from "../config";
import { createUser, findAllUsers, findFirstUser } from "../lib/db/queries/users";

export async function handleLogin(cmdName: string, username: string) {
    if (!username) {
        throw new Error("Username is missing");
    }

    const user = await findFirstUser(username);
    if (!user) {
        throw new Error(`User not found: ${username}`);
    }

    setUser(user.name);

    console.log("User has been set");
}

export async function handleRegister(cmdName: string, username: string) {
    if (!username) {
        throw new Error("Username is missing");
    }

    const existingUser = await findFirstUser(username);
    if (existingUser) {
        throw new Error(`User ${username} already exists`);
    }

    const newUser = await createUser(username);
    if (!newUser) {
        throw new Error(`User has not been created`);
    }

    setUser(newUser.name);

    console.log(`User has been registered`, newUser);
}

export async function handleListUsers(cmdName: string) {
    const users = await findAllUsers();
    const currentUser = readConfig().currentUserName;
    for (const user of users) {
        if (user.name === currentUser) {
            console.log(`* ${user.name} (current)`);
        } else {
            console.log(`* ${user.name}`);
        }
    }
}

