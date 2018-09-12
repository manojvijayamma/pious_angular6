import { Injectable } from '@angular/core';

//import 'rxjs/add/operator/map';
import { Router } from "@angular/router";




@Injectable()
export class ResponseService {
  
  constructor(private router: Router) { }

      checkStatus(error){
        if (error.status === 401) {
            this.router.navigateByUrl('/login');
        } 
      
      }

}
