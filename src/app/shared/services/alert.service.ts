import { Injectable } from '@angular/core';






@Injectable()
export class AlertService {
  
  constructor() { }

      success(msg){
           document.getElementById("alert_success").style.display="block";
            document.getElementById("alert_success_message").innerHTML=msg;  
        
            setTimeout (() => {            
              document.getElementById("alert_success").style.display="none";
              document.getElementById("alert_error").style.display="none";
          }, 3000);
      }


      error(msg){
          document.getElementById("alert_error").style.display="block";
          document.getElementById("alert_error_message").innerHTML=msg;  
          
          setTimeout (() => {            
            document.getElementById("alert_success").style.display="none";
            document.getElementById("alert_error").style.display="none";
        }, 3000);

      }

      close(){
        document.getElementById("alert_success").style.display="none";
        document.getElementById("alert_error").style.display="none";
      }

}
