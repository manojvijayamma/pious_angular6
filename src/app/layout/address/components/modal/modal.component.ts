import { Component,Input,ViewChild, ElementRef, NgZone } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from '../../../../shared/services/address.service';

import { ResponseService } from '../../../../shared/services/response.service';
import { SpinnerService } from  '../../../../shared/services/spinner.service';
import { AlertService } from  '../../../../shared/services/alert.service';
import { environment } from '../../../../../environments/environment';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    closeResult: string;
    formData: FormGroup; 
    private modalReference : NgbModalRef;

    
    lat: number = 51.678418;
    lng: number = 7.809007;
    @ViewChild('places') places: GooglePlaceDirective;

    @Input() title: number; 
    event: any;
    fileToUpload: File  = null;
    productImage: any;
    readonly imageUrl = `${environment.image_url}`;

    constructor(private modalService: NgbModal, private frmBuilder: FormBuilder, public router: Router, private addressService : AddressService,
    private responseService : ResponseService,
    private spinnerService: SpinnerService,
    
    private alertService :AlertService ) { }

    ngOnInit() {
        
        this.formData = this.frmBuilder.group({  
            id:'',          
            address:["", [Validators.required]],
            city:["", [Validators.required]], 
            pin:["", [Validators.required]], 
            google_location:[],  
        
        });

    }

    ChangingValue(event) {
        this.event = event;
        console.log(this.event);
    }

    doSend(){
        if(this.formData.value.address==''){
            this.alertService.error("Please enter address");
            return false;
        }

        if(this.formData.value.city==''){
            this.alertService.error("Please enter city");
            return false;
        }

        if(this.formData.value.pin==''){
            this.alertService.error("Please enter pin");
            return false;
        }
        
            
        console.log(this.formData.value); 
        this.spinnerService.show(); 
        this.addressService.saveAddress(this.formData.value).subscribe((data: any) => { 
            this.spinnerService.hide();   
            this.alertService.success(data.text);
         }, error => {
             this.responseService.checkStatus(error);           
         });

        this.modalReference.dismiss();     
    }

    doTotal(){
        var total=this.formData.value.order_quantity*this.formData.value.price;
        var vat_amount=total*this.formData.value.vat/100;
        this.formData.patchValue({vat_amount:vat_amount});
        total=total+vat_amount;
        this.formData.patchValue({total_price:total});
    }

    open(content) {  
            
          //alert(this.title); 
          if(this.title>0){
            this.spinnerService.show();
            this.loadData();
          }        
           

          //this.modalReference = this.modalService.open(content);
          this.modalReference = this.modalService.open(content, { size: 'lg' });
          this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });

    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

    handleFileInput(files: FileList) {
        let fileItem = files.item(0);
        console.log("file input has changed. The file is", fileItem)
        this.fileToUpload = fileItem
    }

    loadData(){
        this.addressService.getDetails(this.title).subscribe((data: any) => {            
            
            this.formData.patchValue({
                id: data.formData.id,
                address: data.formData.address, 
                city: data.formData.city,               
                pin:data.formData.pin,
                google_location:data.formData.google_location

            }); 
           
          
            
            this.spinnerService.hide();   
             
         }, error => {
             this.responseService.checkStatus(error);           
         });
    }

    public handleAddressChange() {
       
    }

}
