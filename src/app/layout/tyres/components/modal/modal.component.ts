import { Component,Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TyreService } from '../../../../shared/services/tyre.service';
import { OrderService } from '../../../../shared/services/order.service';
import { ResponseService } from '../../../../shared/services/response.service';
import { SpinnerService } from  '../../../../shared/services/spinner.service';
import { AlertService } from  '../../../../shared/services/alert.service';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    closeResult: string;
    formData: FormGroup; 
    private modalReference : NgbModalRef;

    @Input() title: number; 
    event: any;
    fileToUpload: File  = null;
    productImage: any;
    patternImage: any;
    readonly imageUrl = `${environment.image_url}`;

    constructor(private modalService: NgbModal, private frmBuilder: FormBuilder, public router: Router, private tyreService : TyreService,
    private responseService : ResponseService,
    private spinnerService: SpinnerService,
    private orderService : OrderService ,
    private alertService :AlertService ) { }

    ngOnInit() {
        
        this.formData = this.frmBuilder.group({  
            id:'',          
            title:["", [Validators.required]],
            category:["", [Validators.required]], 
            type:["", [Validators.required]],   
            pattern:["", [Validators.required]],
            origin:["", [Validators.required]],  
            brand:["", [Validators.required]],
            model:["", [Validators.required]],    
            price:["", [Validators.required]], 
            stock:["", [Validators.required]], 
            order_quantity:'',  
            description:'',  
            comment:''  ,
            total_price:'' ,
            vat_amount:'',
            weight:'',
            vat:'' ,
            customer_stock:''    
           // date1 : [""],
           // date2 : new Date(1990, 0, 1),
           // file : new Date(1990, 0, 1)
        });

    }

    ChangingValue(event) {
        this.event = event;
        console.log(this.event);
    }

    doSend(){
        if(this.formData.value.order_quantity==''){
            this.alertService.error("Please enter order quantity");
            return false;
        }
        if(this.formData.value.order_quantity>this.formData.value.stock){
            this.alertService.error("Order quantity is not available.");
            return false;
        }
            
        console.log(this.formData.value); 
        this.spinnerService.show(); 
        this.orderService.saveOrder(this.formData.value).subscribe((data: any) => { 
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
        this.tyreService.getDetails(this.title).subscribe((data: any) => {            
            
            this.formData.patchValue({
                id: data.formData.id,
                title: data.formData.title,
                category:data.formData.category.title,
                type:data.formData.type.title,
                origin:data.formData.origin.title,
                pattern:data.formData.pattern ? data.formData.pattern.title : '',
                brand:data.formData.brand.title,
                model:data.formData.model,
                price:data.formData.price1,
                stock:data.formData.stock,
                order_quantity:'',  
                description:data.formData.description,
                comment:''  ,
                weight:data.formData.weight,
                vat:data.formData.vat, 
                customer_stock:data.formData.customer_stock,         
                //date1 : { year: 2018, month: 9, day: 16 },
               // date2 : { year: 2018, month: 9, day: 26 }

            }); 
            //this.imgname= require(this.imageUrl+data.formData.image);
            console.log(data.formData.image);
            this.productImage=data.formData.image ? this.imageUrl+data.formData.image  : this.imageUrl+"sorry-image-not-available.png";
            this.patternImage=data.formData.pattern ? this.imageUrl+data.formData.pattern.image  : this.imageUrl+"sorry-image-not-available.png";
          
            
            this.spinnerService.hide();   
             
         }, error => {
             this.responseService.checkStatus(error);           
         });
    }

}
