import { Component,Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../../../shared/services/order.service';
import { ResponseService } from '../../../../shared/services/response.service';
import { SpinnerService } from  '../../../../shared/services/spinner.service';
import { environment } from '../../../../../environments/environment';


@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    closeResult: string;
   
    private modalReference : NgbModalRef;
    productImage: any;
    formData : any;
    @Input() title: number; 
    event: any;
    fileToUpload: File  = null;
    readonly imageUrl = `${environment.image_url}`;

    constructor(private modalService: NgbModal, private frmBuilder: FormBuilder, public router: Router, private orderService : OrderService,
        private responseService : ResponseService,
        private spinnerService: SpinnerService,) { }

    ngOnInit() {
        


    }

    ChangingValue(event) {
        this.event = event;
        console.log(this.event);
      }

    doSend(){
        
        this.modalReference.dismiss();     
    }

    open(content) {  
            
          //alert(this.title); 
          if(this.title>0){
            this.spinnerService.show();
            this.loadData();
          }  

         /*
          this.formData.patchValue({
                email: 'Nancy',
                date1 : { year: 2018, month: 9, day: 16 },
                date2 : { year: 2018, month: 9, day: 26 }

          });*/

          this.modalReference = this.modalService.open(content, { size: 'lg' });
          //this.modalReference = this.modalService.open(content, { size: 'lg' });
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
        this.orderService.getDetails(this.title).subscribe((data: any) => {      
                     
            
            this.productImage=data.formData.image ? this.imageUrl+data.formData.image  : this.imageUrl+"sorry-image-not-available.png";
            this.formData=data.formData;

            this.spinnerService.hide();   
             
         }, error => {
             this.responseService.checkStatus(error);           
         });
    }
}
