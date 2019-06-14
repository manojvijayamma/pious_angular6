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
            
            this.checkSessionLife();
            localStorage.setItem("lastAccessTime", new Date().getTime().toString());           

            
                    
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('userToken'))
            });
            return next.handle(clonedreq);            
          
        }
        else {
            this.router.navigateByUrl('/login');
        }
    }



    checkSessionLife() {
        
        if(localStorage.getItem("lastAccessTime")!=null && localStorage.getItem("session_lifetime")!=null){
            
                var lastAccessTime=localStorage.getItem("lastAccessTime");
    
                    
                var life = localStorage.getItem("session_lifetime");
                var curDateTime=new Date().getTime();
                var newDate = new Date(parseInt(lastAccessTime)+parseInt(life)*60*1000).getTime();
                //alert(newDate);
            
                var diff =(curDateTime-newDate) / 1000;
                diff /= 60;
                //alert(diff);
                // diff=Math.abs(Math.round(diff));
    
                if(diff>0){
                    this.router.navigate(['/login']);
                    
                } 
    
                
        }    
    
    }


}