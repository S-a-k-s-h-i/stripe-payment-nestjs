export interface AuthServiceInterface {
    validateUser(username: string, password: string): Promise<any>;
    login(body: any, user: any): Promise<any>;
    logout(authToken: string): Promise<void>;
}
