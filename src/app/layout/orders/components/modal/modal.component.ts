import { Component,Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../../../shared/services/order.service';
import { ResponseService } from '../../../../shared/services/response.service';
import { SpinnerService } from  '../../../../shared/services/spinner.service';


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

    constructor(private modalService: NgbModal, private frmBuilder: FormBuilder, public router: Router, private orderService : OrderService,
        private responseService : ResponseService,
        private spinnerService: SpinnerService,) { }

    ngOnInit() {
        
        this.formData = this.frmBuilder.group({            
            email:[null, [Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
            password:["", [Validators.required]],        
            date1 : [""],
            date2 : new Date(1990, 0, 1),
            file : new Date(1990, 0, 1)
        });

    }

    ChangingValue(event) {
        this.event = event;
        console.log(this.event);
      }

    doSend(){
        console.log(this.formData.value);   
        this.modalReference.dismiss();     
    }

    open(content) {  
            
          //alert(this.title); 
          if(this.title>0){
            this.spinnerService.show();
            this.loadData();
          }  
         
          this.formData.patchValue({
                email: 'Nancy',
                date1 : { year: 2018, month: 9, day: 16 },
                date2 : { year: 2018, month: 9, day: 26 }

          });  

          this.modalReference = this.modalService.open(content);
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
            
            this.formData.patchValue({
                email: data.formData.title,
                //date1 : { year: 2018, month: 9, day: 16 },
               // date2 : { year: 2018, month: 9, day: 26 }

            }); 

            this.spinnerService.hide();   
             
         }, error => {
             this.responseService.checkStatus(error);           
         });
    }
}
