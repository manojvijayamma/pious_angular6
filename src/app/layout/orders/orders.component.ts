import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OrderService } from '../../shared/services/order.service';
import { ResponseService } from '../../shared/services/response.service';
import { SpinnerService } from  '../../shared/services/spinner.service';


@Component({
    selector: 'app-tables',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
    animations: [routerTransition()]
})
export class OrdersComponent implements OnInit {
    gridData: any;    
    pager: {startSI:'',endSI:'',totalRecords:'',totalPages:'',prev:'',next:'',pageNo:''};    
    
    pagerForm: FormGroup; 
    searchForm: FormGroup;
    sHeight : any;

    constructor(private orderService : OrderService,
        private frmBuilder: FormBuilder,
        private responseService: ResponseService,
        private spinnerService: SpinnerService) {
       
    }

    ngOnInit() {

        this.spinnerService.show();

        //update grid height
        this.sHeight=(screen.availHeight-320)+"px";
        document.getElementById("gridPanel").style.height=this.sHeight;
        
        //pagination form
        this.pagerForm = this.frmBuilder.group({            
            pageNo:[""]     
        });

        //search form
        this.searchForm = this.frmBuilder.group({         
            
            from_date:[""],        
            to_date : [""]  ,
            tyre_id:'',
            sortField:'Name',
            sortOrder:'ASC' ,
            pageNo:''          
        });

        this.loadGridData(1);
        
    }

    doPager(){
       // console.log(this.pagerForm.get('pageNo').value);
        this.loadGridData(this.pagerForm.get('pageNo').value); 
    }

    pagination(pageNo){
       // alert(1);
        this.loadGridData(pageNo); 
    }

    doSearch(){
        //console.log(this.searchForm.value);
        this.loadGridData(1);    
    }

    loadGridData(pageNo){
        
        //this.searchForm.patchValue(pageNo : pageNo);
        this.searchForm.controls["pageNo"].setValue(pageNo);
        
        this.orderService.getData(this.searchForm.value).subscribe((data: any) => {
           
            this.gridData = data.gridData.data;
            this.pager=data.pager; 
                
            //console.log(this.pager);
        }, error => {
            this.responseService.checkStatus(error);           
        });
    }

    

    ngAfterViewInit(){
        this.spinnerService.hide();       
    }
}
