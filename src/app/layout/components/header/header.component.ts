import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../../shared/services/user.service';
import { AlertService } from '../../../shared/services/alert.service';
import { ResponseService } from '../../../shared/services/response.service';
import { SpinnerService } from  '../../../shared/services/spinner.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    pushRightClass: string = 'push-right';
    profiledisplay='none'; 
    passworddisplay='none';
    formData: FormGroup; 
    passwordFormData: FormGroup; 

    constructor(private translate: TranslateService, public router: Router, private frmBuilder: FormBuilder,  private userService : UserService,
    private alertService : AlertService,
    private responseService :ResponseService,
    private spinnerService: SpinnerService ) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        
        this.formData = this.frmBuilder.group({            
            email:[null, [Validators.required,Validators.minLength(3),Validators.maxLength(15)]],                 
            name : [""]           
        });

        this.passwordFormData = this.frmBuilder.group({            
            current_password:[null, [Validators.required,Validators.minLength(3),Validators.maxLength(15)]],                 
            new_password : [null, [Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
            confirm_password : [null, [Validators.required,Validators.minLength(3),Validators.maxLength(15)]],         
        });



    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }


    doSendProfile(){
        console.log(this.formData.value);
        if(this.formData.value.name==null){
            this.alertService.error("Enter name");
            return false;
        }
        if(this.formData.value.email==null){
            this.alertService.error("Enter email");
            return false;
        }

        this.spinnerService.show();       
        
        this.userService.updateProfile(this.formData.value).subscribe((data : any)=>{
            console.log(data);
            if(data.text){
                this.profiledisplay='none';
                this.alertService.success("Success");
                this.spinnerService.hide();
            }  
            else{
                
            }  
          }
          , error => {
           
            this.responseService.checkStatus(error);   
            
          });        
    }

    doSendPassword(){
        //console.log(this.passwordFormData.value);
        
        if(this.passwordFormData.value.current_password==null){
            this.alertService.error("Enter current password");
            return false;
        }
        if(this.passwordFormData.value.new_password==null){
            this.alertService.error("Enter new password");
            return false;
        }
        if(this.passwordFormData.value.confirm_password==null){
            this.alertService.error("Enter confirm password");
            return false;
        }


        this.spinnerService.show();          
        
        this.userService.updatePassword(this.passwordFormData.value).subscribe((data : any)=>{
            console.log(data);
            if(data.status=='error'){               
                this.alertService.error(data.text);
                this.spinnerService.hide();
            }  
            else{
                this.passworddisplay='none';
                this.alertService.success(data.text);
                this.spinnerService.hide();
            }  
          }, error => {
           
            this.responseService.checkStatus(error);   
            
          });        
    }



    openModalDialogProfile(){ 

          this.spinnerService.show();    
          this.userService.getProfile('').subscribe((data : any)=>{            
            if(data.status=='error'){               
                this.alertService.error(data.text);
            }  
            else{
                this.profiledisplay='block'; //Set block css
                this.passworddisplay='none';
                
                this.formData.setValue({
                    name:data.profileData.name,
                    email:data.profileData.email,
                });

                this.spinnerService.hide();   
            }  
          }, error => {
           
            this.responseService.checkStatus(error);               
            
          });
        
    } 

    openModalDialogPassword(){
        this.passworddisplay='block'; //Set block css
        this.profiledisplay='none';
    } 

    closeModalDialogProfile(){
        this.profiledisplay='none'; //set none css after close dialog
    }
    closeModalDialogPassword(){
        this.passworddisplay='none'; //set none css after close dialog
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
