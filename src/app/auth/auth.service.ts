import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any = null;

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
                    environment.firebaseAPIKey,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            )
            .pipe(
                catchError(this.handleError),
                tap((resData) =>
                    this.handleAuthentication(
                        resData.email,
                        +resData.expiresIn,
                        resData.localId,
                        resData.idToken
                    )
                )
            );
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
                    environment.firebaseAPIKey,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }
            )
            .pipe(
                catchError(this.handleError),
                tap((resData) =>
                    this.handleAuthentication(
                        resData.email,
                        +resData.expiresIn,
                        resData.localId,
                        resData.idToken
                    )
                )
            );
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
    }

    autoLogout(expirationDuration: number) {
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpiration: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpiration)
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration =
                new Date(userData._tokenExpiration).getTime() -
                new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    private handleAuthentication(
        email: string,
        expiresIn: number,
        localId: string,
        idToken: string
    ) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
        const authUser = new User(email, localId, idToken, expirationDate);
        this.user.next(authUser);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(authUser));
    }

    private handleError(errRes: HttpErrorResponse) {
        let errorMessage = 'An unkown error occurred';
        if (!errRes.error || !errRes.error.error) {
            return throwError(errorMessage);
        }

        switch (errRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Email is already registered! Please log in';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Invalid email! Not Found, are you registered?';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Invalid Password!, please try again';
                break;
            case 'USER_DISABLED':
                errorMessage = 'This account has been disabled';
                break;
        }

        return throwError(errorMessage);
    }
}
