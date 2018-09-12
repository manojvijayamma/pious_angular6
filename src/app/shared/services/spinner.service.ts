import { Injectable } from '@angular/core';






@Injectable()
export class SpinnerService {
  
  constructor() { }

      show(){
        document.getElementById("spinner").style.display="block";
      
      }
      hide(){
        document.getElementById("spinner").style.display="none";
      }

}
