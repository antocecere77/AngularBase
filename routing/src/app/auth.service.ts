export class AuthService {
    loggedId = false;

    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedId);
                }, 800);
            }
        );
        return promise;
    }

    login() {
        this.loggedId = true;
    }

    logout() {
        this.loggedId = false;
    }
}
