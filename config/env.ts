function getEnvVar(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`❌ Environment variable ${key} is not set in .env file`);
    }
    return value;
}

export const uiUsersConfig = {
    standard: {
        login: getEnvVar('LOGIN_STANDARD'),
        password: getEnvVar('PASSWORD'),
    },
    locked: {
        login: getEnvVar('LOGIN_LOCKED'),
        password: getEnvVar('PASSWORD'),
    }
}

export const apiConfig = {
    email: getEnvVar('API_EMAIL'),
    password: getEnvVar('API_PASSWORD'),
    xApiKey: getEnvVar('API_X_KEY')
}
