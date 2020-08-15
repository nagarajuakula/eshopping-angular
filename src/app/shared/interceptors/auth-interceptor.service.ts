import { 
        HttpInterceptor, 
        HttpRequest, 
        HttpHandler, 
        HttpEvent, 
        HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenExtractor: HttpXsrfTokenExtractor) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headerName = 'X-XSRF-TOKEN';
        let token = this.tokenExtractor.getToken() as string;
        if (token) {
            let newReq = req.clone({
                headers: req.headers.set(headerName, token)
            });
            return next.handle(newReq);
        }
        return next.handle(req);
    }

}