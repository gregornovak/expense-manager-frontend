import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { apiUrl } from '../api-url';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string): any {
        return this.http.post<any>(`${apiUrl}login`, {email, password})
            .pipe(map(user => {
                if (user && user.token) {
                    const parsedToken = this.parseJwt(user.token);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('exp', JSON.stringify(parsedToken.exp));
                    localStorage.setItem('firstname', JSON.stringify(parsedToken.firstname));
                    localStorage.setItem('lastname', JSON.stringify(parsedToken.lastname));
                }

                return user;
            }));
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('exp');
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
    }

    parseJwt(token: string): any {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+')
                    .replace('_', '/');

        return JSON.parse(window.atob(base64));
    }
}
