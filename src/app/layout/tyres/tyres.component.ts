import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TyreService } from '../../shared/services/tyre.service';
import { ResponseService } from '../../shared/services/response.service';
import { SpinnerService } from  '../../shared/services/spinner.service';


@Component({
    selector: 'app-tables',
    templateUrl: './tyres.component.html',
    styleUrls: ['./tyres.component.scss'],
    animations: [routerTransition()]
})
export class TyresComponent implements OnInit {
    gridData: any;
    categoryData : any;
    typeData : any;  
    brandData : any; 
    originData : any;   
    pager : any;  
    //pager: {startSI:'',endSI:'',totalRecords:'',totalPages:'',prev:'',next:'',pageNo:''};    
    //pager : any;
    
    pagerForm: FormGroup; 
    searchForm: FormGroup;
    sHeight : any;

    constructor(private tyreService : TyreService,
        private frmBuilder: FormBuilder,
        private responseService: ResponseService,
        private spinnerService: SpinnerService) {
       
    }

    ngOnInit() {

        this.spinnerService.show();

        //update grid height
        this.sHeight=(screen.availHeight-315)+"px";
        document.getElementById("gridPanel").style.height=this.sHeight;
        
        //pagination form
        this.pagerForm = this.frmBuilder.group({            
            pageNo:[""] 
        });

        //search form
        this.searchForm = this.frmBuilder.group({            
            title:'',
            category_id:[""],        
            type_id : [""]  ,
            rowsize:10,
            sortField:'Name',
            sortOrder:'ASC' ,
            pageNo:''          
        });

        this.loadCategory();
        this.loadType();
        this.loadBrand();
        this.loadOrigin();
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
        this.spinnerService.show();  
        //this.searchForm.patchValue(pageNo : pageNo);
        this.searchForm.controls["pageNo"].setValue(pageNo);
        
        this.tyreService.getData(this.searchForm.value).subscribe((data: any) => {
            // console.log(data.tyres.current_page);
            this.gridData = data.gridData.data;
            this.pager=data.pager;                
            //console.log(this.pager);
            this.spinnerService.hide();  
        }, error => {
            this.responseService.checkStatus(error);           
        });
    }

    loadCategory(){
        this.tyreService.getCategory().subscribe((data: any) => {            
             
            this.categoryData = data.categories;           
                 
            
         }, error => {
             this.responseService.checkStatus(error);           
         });
    }

    loadType(){
        this.tyreService.getType().subscribe((data: any) => {            
             
            this.typeData = data.types;           
                 
            
         }, error => {
             this.responseService.checkStatus(error);           
         });
    }

    loadBrand(){
        this.tyreService.getBrand().subscribe((data: any) => {            
             
            this.brandData = data.brands;           
                 
            
         }, error => {
             this.responseService.checkStatus(error);           
         });
    }

    loadOrigin(){
        this.tyreService.getOrigin().subscribe((data: any) => {            
             
            this.originData = data.origins;           
                 
            
         }, error => {
             this.responseService.checkStatus(error);           
         });
    }

    ngAfterViewInit(){
        this.spinnerService.hide();       
    }
}
