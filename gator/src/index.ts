import type { CommandRegistry } from "./commands/commands";
import { registerCommand, runCommand } from "./commands/commands";
import { handleLogin, handleRegister } from "./commands/users";

async function main() {
    const input = process.argv.slice(2);

    if (input.length === 0) {
        console.log("No command to run");
        process.exit(1);
    }

    const cmdName = input[0];
    const args = input.slice(1);

    const registry: CommandRegistry = {};

    registerCommand(registry, "login", handleLogin);
    registerCommand(registry, "register", handleRegister);

    try {
        await runCommand(registry, cmdName, ...args);
    } catch (err) {
        if (err instanceof Error) {
            console.log(`Failed to run command: ${err.message}`);
        } else {
            console.log(`Failed to run command: ${err}`);
        }
        process.exit(1);
    }

    process.exit(0);
}

await main();

