import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AddressService } from '../../shared/services/address.service';
import { ResponseService } from '../../shared/services/response.service';
import { SpinnerService } from  '../../shared/services/spinner.service';
import { AlertService } from  '../../shared/services/alert.service';
import { environment } from '../../../environments/environment';





@Component({
    selector: 'app-tables',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss'],
    animations: [routerTransition()]
})
export class AddressComponent implements OnInit {
    gridData: any;
    categoryData : any;
    typeData : any;  
    brandData : any; 
    originData : any;
    modelData : any;      
    pager : any; 
    sizeData : any; 
    //pager: {startSI:'',endSI:'',totalRecords:'',totalPages:'',prev:'',next:'',page:''};    
    //pager : any;
    
    pagerForm: FormGroup; 
    searchForm: FormGroup;
    sHeight : any;
    readonly imageUrl = `${environment.image_url}`;

    constructor(private addressService : AddressService,
        private frmBuilder: FormBuilder,
        private responseService: ResponseService,
        private spinnerService: SpinnerService,
        private alertService:AlertService) {
       
    }

    ngOnInit() {

        this.spinnerService.show();

        //update grid height
        this.sHeight=(screen.availHeight-315)+"px";
        //document.getElementById("gridPanel").style.height=this.sHeight;
        
        //pagination form
        this.pagerForm = this.frmBuilder.group({            
            page:[""] 
        });

        //search form
        this.searchForm = this.frmBuilder.group({            
            title:[''],
            category_id:[''],        
            type_id :['']  ,
            brand_id : [''] ,
            origin_id :[''] ,
            model_id :[''] ,
            size_id : [''] ,
            rowsize:10,
            sortField:'Name',
            sortOrder:'ASC' ,
            page:''          
        });

      
        this.loadGridData(1);
        
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
        this.searchForm.controls["title"].setValue(['']);
        this.searchForm.controls["category_id"].setValue(['']);
        this.searchForm.controls["brand_id"].setValue(['']);
        this.searchForm.controls["origin_id"].setValue(['']);
        this.searchForm.controls["type_id"].setValue(['']);
        this.searchForm.controls["model_id"].setValue(['']);
        this.searchForm.controls["size_id"].setValue(['']);
        this.loadGridData(1);  
    }

    loadGridData(page){
        this.spinnerService.show();  
        //this.searchForm.patchValue(page : page);
        this.searchForm.controls["page"].setValue(page);
        
        this.addressService.getData(this.searchForm.value).subscribe((data: any) => {
            
            this.gridData = data.gridData.data;
            this.pager=data.pager;                
            //console.log(this.pager);
            this.spinnerService.hide();  
        }, error => {
            this.responseService.checkStatus(error);           
        });
    }

    

    validateNumber(event){
        if(event.target.value>0){}
        else{
            event.target.value='';
        }
    }

    ngAfterViewInit(){
        this.spinnerService.hide();       
    }
}
