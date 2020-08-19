import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { USER_API } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isLoggedIn = false;
    errorMessage = '';
    user: User = new User();
    constructor(private http: HttpClient) {}

    login(user: User) {
        this.user = user;
        const headers = new HttpHeaders({ Authorization: 'Bearer ' + btoa(user.username + ':' + user.password)});
        return this.http.post<User>(USER_API + "/login", user, { headers, responseType: 'text' as 'json'})
         .pipe(map(res => {
             this.isLoggedIn = true;
             this.user= JSON.parse(res as any) ;
             return this.user;
            //  sessionStorage.setItem("loggedInUser", this.user);
         },
         catchError(err  => { 
            console.log("Invalid credentials");
            this.errorMessage = err.error.message;
            this.isLoggedIn = false;
            return throwError("Invalid credentials");
         })));
        ;
    }
}