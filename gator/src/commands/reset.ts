import { deleteAllUsers } from "../lib/db/queries/users";

export async function handleReset(cmdName: string) {
    await deleteAllUsers();
    console.log("Reset is done");
}

