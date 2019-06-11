import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';

import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone());

        if (localStorage.getItem('userToken') != null) {  
            
            /*

            // for customer wise session lifetime 
            // 1min=60*1000ms
            var curDateTime=new Date().getTime();
            var lastAccessTime=parseInt(localStorage.getItem('lastAccessTime'));
            var diff =(curDateTime-lastAccessTime) / 1000;
            diff /= 60;
            diff=Math.abs(Math.round(diff));
            if(diff<=0){
                this.router.navigate(['/login']);
                return false;
            }
            
            localStorage.setItem('lastAccessTime', new Date().getTime().toString());
            */
                    
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))
            });
            return next.handle(clonedreq);            
          
        }
        else {
            this.router.navigateByUrl('/login');
        }
    }



}