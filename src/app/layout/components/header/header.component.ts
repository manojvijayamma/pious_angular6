import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../../shared/services/user.service';
import { OrderService } from '../../../shared/services/order.service';
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
    cartdisplay='none';
    formData: FormGroup; 
    passwordFormData: FormGroup; 
    loggedUser :any;
    cartData:any;
    totalData:any;
    cartDetails: FormGroup; 

    constructor(private translate: TranslateService, public router: Router, private frmBuilder: FormBuilder,  private userService : UserService,
    private alertService : AlertService,
    private responseService :ResponseService,
    private spinnerService: SpinnerService,
    private orderService : OrderService    
) {

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
            firstname : [""] ,
            lastname : [""] ,
            phone : [""] ,
            address : [""] ,

        });

        this.passwordFormData = this.frmBuilder.group({            
            current_password:[null, [Validators.required,Validators.minLength(3),Validators.maxLength(15)]],                 
            new_password : [null, [Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
            confirm_password : [null, [Validators.required,Validators.minLength(3),Validators.maxLength(15)]],         
        });


        this.cartDetails = this.frmBuilder.group({            
            
            order_note : [""] ,

        });

        this.totalData={total_price:0,vat_amount:0,grant_total:0};
        this.cartData=[];

        this.userService.getProfile('').subscribe((data : any)=>{            
            if(data.status=='error'){               
                this.alertService.error(data.text);
                this.spinnerService.hide(); 
            }  
            else{
               
                this.loggedUser=data.profileData.firstname+' '+data.profileData.lastname;
                
                document.getElementById("cartTotal").innerHTML=data.total;

                this.spinnerService.hide();   
            }  
          }, error => {
           
            this.responseService.checkStatus(error);               
            this.spinnerService.hide(); 
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
        this.router.navigateByUrl('/login');
    }


    doSendProfile(){
        console.log(this.formData.value);
        if(this.formData.value.firstname==null){
            this.alertService.error("Enter firstname");
            return false;
        }
        if(this.formData.value.lastname==null){
            this.alertService.error("Enter lastname");
            return false;
        }
        if(this.formData.value.email==null){
            this.alertService.error("Enter email");
            return false;
        }
        if(this.formData.value.phone==null){
            this.alertService.error("Enter phone number");
            return false;
        }
        if(this.formData.value.address==null){
            this.alertService.error("Enter address");
            return false;
        }

        this.spinnerService.show();       
        
        this.userService.updateProfile(this.formData.value).subscribe((data : any)=>{
            console.log(data);
            if(data.text){
                this.profiledisplay='none';
                this.loggedUser=this.formData.value.firstname+' '+this.formData.value.lastname;
                
                this.alertService.success(data.text);
                this.spinnerService.hide();
            }  
            else{
                this.spinnerService.hide(); 
            }  
          }
          , error => {
           
            this.responseService.checkStatus(error); 
            this.spinnerService.hide();   
            
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


    doSendCart(){
        console.log(this.formData.value);
        

        this.spinnerService.show();       
        
        this.orderService.saveOrder(this.cartDetails.value).subscribe((data : any)=>{
            console.log(data);
            if(data.text){
                this.cartdisplay='none';
                
                this.alertService.success(data.text);
                document.getElementById("cartTotal").innerHTML='';
                this.spinnerService.hide();
            }  
            else{
                this.spinnerService.hide(); 
            }  
          }
          , error => {
           
            this.responseService.checkStatus(error); 
            this.spinnerService.hide();   
            
          });        
    }



    openModalDialogProfile(){ 

          this.spinnerService.show();    
          this.userService.getProfile('').subscribe((data : any)=>{            
            if(data.status=='error'){               
                this.alertService.error(data.text);
                this.spinnerService.hide(); 
            }  
            else{
                this.profiledisplay='block'; //Set block css
                this.passworddisplay='none';
                console.log(data);
                this.formData.setValue({
                    firstname:data.profileData.firstname,
                    lastname:data.profileData.lastname,
                    email:data.profileData.email,
                    phone:data.profileData.phone,
                    address:data.profileData.address,
                });

                this.spinnerService.hide();   
            }  
          }, error => {
           
            this.responseService.checkStatus(error);               
            this.spinnerService.hide(); 
          });
        
    } 

    openModalDialogPassword(){
        this.passworddisplay='block'; //Set block css
        this.profiledisplay='none';
    } 

    closeModalDialogProfile(){
        this.profiledisplay='none'; //set none css after close dialog
        this.spinnerService.hide(); 
    }
    closeModalDialogPassword(){
        this.passworddisplay='none'; //set none css after close dialog
    }

    closeModalDialogCart(){
        this.cartdisplay='none'; //set none css after close dialog
        this.spinnerService.hide(); 
    }



    changeLang(language: string) {
        this.translate.use(language);
    }

    showSpinner(logo=0){
        if(logo==1){
            document.getElementById("panel_username").style.display="none";
            document.getElementById("panel_logo").style.display="block";
        }
        else{
            document.getElementById("panel_username").style.display="block";
            document.getElementById("panel_logo").style.display="none";
        }
        this.spinnerService.show();  
    }


    openModalDialogCart(){ 

        this.spinnerService.show();    
        this.orderService.getCart('').subscribe((data : any)=>{            
          if(data.status=='error'){               
              this.alertService.error(data.text);
              this.spinnerService.hide(); 
          }  
          else{
              if(data.gridData.total>0){
                this.cartdisplay='block'; //Set block css
                 this.passworddisplay='none';
                this.profiledisplay='none';
              //console.log(data.gridData.data);
                this.cartData=data.gridData.data;
                this.totalData=data.totalData;
              }  
              this.spinnerService.hide();   
          }  
        }, error => {
         
          this.responseService.checkStatus(error);               
          this.spinnerService.hide(); 
        });
      
  }

  removeCart(item){
        this.spinnerService.show();    
        this.orderService.removeCart(item.id).subscribe((data : any)=>{            
          if(data.status=='error'){               
              this.alertService.error(data.text);
              this.spinnerService.hide(); 
          }  
          else{
              this.cartdisplay='block'; //Set block css
              this.passworddisplay='none';
              this.profiledisplay='none';
              //console.log(data.gridData.data);
              //this.cartData=data.gridData.data;
              //this.totalData=data.totalData;

              var index = this.cartData.indexOf(item);
              this.cartData.splice(index, 1); 
              
              if(this.cartData.length==0){
                document.getElementById("cartTotal").innerHTML='';
                this.cartdisplay='none';
              }
              else{
                document.getElementById("cartTotal").innerHTML=this.cartData.length;
              }  

              this.spinnerService.hide();   
          }  
        }, error => {
         
          this.responseService.checkStatus(error);               
          this.spinnerService.hide(); 
        });
  }

  getTotal(){
    var sub_total = 0;
    var vat_total = 0;
    var grant_total = 0;
    for(var i = 0; i < this.cartData.length; i++){
        var product = this.cartData[i];
        sub_total = sub_total+parseFloat(product.total_price);
        vat_total = vat_total+parseFloat(product.vat_amount);
        grant_total = grant_total+parseFloat(product.grant_total);
    }
    
    return [sub_total.toFixed(2),vat_total.toFixed(2),grant_total.toFixed(2)];
  }
}
