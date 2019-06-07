import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate() {
        
        if (localStorage.getItem('isLoggedin')) {
            
            /* for customer wise session lifetime */
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
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
