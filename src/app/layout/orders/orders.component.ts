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
    pager: {startSI:'',endSI:'',totalRecords:'',totalPages:'',prev:'',next:'',page:''};    
    
    pagerForm: FormGroup; 
    searchForm: FormGroup;
    sHeight : any;
    statusData:any

    constructor(private orderService : OrderService,
        private frmBuilder: FormBuilder,
        private responseService: ResponseService,
        private spinnerService: SpinnerService) {
       
    }

    ngOnInit() {

        this.spinnerService.show();

        //update grid height
        this.sHeight=(screen.availHeight-320)+"px";
        //document.getElementById("gridPanel").style.height=this.sHeight;
        
        //pagination form
        this.pagerForm = this.frmBuilder.group({            
            page:[""]     
        });

        //search form
        this.searchForm = this.frmBuilder.group({         
            
            from_date:"0000-00-00",        
            to_date :"0000-00-00"  ,
            order_no:'',
            order_status:'',
            title:'',
            sortField:'Name',
            sortOrder:'ASC' ,
            page:''          
        });

        this.loadGridData(1);

        this.statusData=['Pending','Hold','Delivered','Rejected'];
        
    }

    doPager(){
       // console.log(this.pagerForm.get('page').value);
        this.loadGridData(this.pagerForm.get('page').value); 
    }

    pagination(page){
       // alert(1);
        this.loadGridData(page); 
    }

    doSearch(){
        //console.log(this.searchForm.value);
        this.loadGridData(1);    
    }

    resetSearch(){
        this.searchForm.controls["from_date"].setValue("0000-00-00");
        this.searchForm.controls["to_date"].setValue("0000-00-00");
        this.searchForm.controls["order_no"].setValue(['']);
        this.searchForm.controls["order_status"].setValue(['']);
        this.searchForm.controls["title"].setValue(['']);
        this.loadGridData(1);  
    }

    loadGridData(page){
        
        //this.searchForm.patchValue(page : page);
        this.searchForm.controls["page"].setValue(page);
        if(this.searchForm.value.from_date!=null && this.searchForm.value.from_date['year']>0)
            this.searchForm.value.from_date=this.searchForm.value.from_date['year']+'-'+this.searchForm.value.from_date['month']+'-'+this.searchForm.value.from_date['day'];
        if(this.searchForm.value.to_date!=null && this.searchForm.value.to_date['year']>0)
            this.searchForm.value.to_date=this.searchForm.value.to_date['year']+'-'+this.searchForm.value.to_date['month']+'-'+this.searchForm.value.to_date['day'];
        
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
