import fs from "fs";
import os from "os";
import path from "path";

export type Config = {
    dbUrl: string,
    currentUserName: string,
}

export function setUser(user: string) {
    const config = readConfig();
    config.currentUserName = user;
    writeConfig(config);
}

function writeConfig(config: Config): void {
    const convertedConfig = {
        db_url: config.dbUrl,
        current_user_name: config.currentUserName
    };
    const configJson = JSON.stringify(convertedConfig, null, 2);
    const configPath = getConfigFilePath();
    fs.writeFileSync(configPath, configJson, { encoding: "utf8" });
}

export function readConfig(): Config {
    const configPath = getConfigFilePath();
    const rawConfig = fs.readFileSync(configPath, { encoding: "utf8" });
    const parsedConfig = JSON.parse(rawConfig);
    return validateConfig(parsedConfig);
}

function getConfigFilePath(): string {
    const configFileName = ".gatorconfig.json";
    return path.join(os.homedir(), configFileName);
}

function validateConfig(rawConfig: any): Config {
    if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
        throw new Error("Missing required property in config: db_url");
    }

    if (!rawConfig.current_user_name || typeof rawConfig.current_user_name !== "string") {
        throw new Error("Missing required property in config: current_user_name");
    }

    return {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name
    };
}

