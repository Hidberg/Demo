function getEnvVar(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`❌ Environment variable ${key} is not set in .env file`);
    }
    return value;
}

export const config = {
    ui: {
        baseURL: getEnvVar('BASE_URL_UI'),
        users: {
            standard: getEnvVar('LOGIN_STANDARD'),
            locked: getEnvVar('LOGIN_LOCKED'),
            problem: getEnvVar('LOGIN_PROBLEM'),
            performance: getEnvVar('LOGIN_PERFORMANCE'),
        },
        password: getEnvVar('PASSWORD'),
    },
    api: {
        baseURL: getEnvVar('API_BASE_URL'),
        email: getEnvVar('API_EMAIL'),
        password: getEnvVar('API_PASSWORD'),
        xApiKey: getEnvVar('API_X_KEY')
    },
};
