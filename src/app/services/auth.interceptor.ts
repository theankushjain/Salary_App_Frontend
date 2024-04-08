//very important file for Login Functionality
//it puts the user details into auth header so that cors error won't come

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private LoginService:LoginService){};

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let newReq = req;

        let token= this.LoginService.getToken();

        if(token!=null){
            newReq=newReq.clone({setHeaders:{'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:8080','Authorization':`Bearer ${token}`}})
        }

        return next.handle(newReq);

    }
    
}