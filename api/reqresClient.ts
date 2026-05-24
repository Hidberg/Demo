import { APIRequestContext } from '@playwright/test';

export class ReqresClient {
    constructor(private request: APIRequestContext) { }

    async getUsersPage(page: number) {
        return await this.request.get(`users?page=${page}`);
    }

    async getUser(id: number) {
        return await this.request.get(`users/${id}`);
    }

    async createUser(data: object) {
        return await this.request.post(`users`, { data });
    }

    async updateUser(id: number, data: object) {
        return await this.request.put(`users/${id}`, { data });
    }

    async deleteUser(id: number) {
        return await this.request.delete(`users/${id}`);
    }

    async login(email: string, password: string | null) {
        const data = { email, password };
        return await this.request.post(`login`, { data });
    }
}
