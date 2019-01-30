import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TyreService } from '../../shared/services/tyre.service';
import { ResponseService } from '../../shared/services/response.service';
import { SpinnerService } from  '../../shared/services/spinner.service';
import { AlertService } from  '../../shared/services/alert.service';
import { environment } from '../../../environments/environment';


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
    modelData : any;      
    pager : any; 
    patternData : any; 
    //pager: {startSI:'',endSI:'',totalRecords:'',totalPages:'',prev:'',next:'',page:''};    
    //pager : any;
    
    pagerForm: FormGroup; 
    searchForm: FormGroup;
    sHeight : any;
    readonly imageUrl = `${environment.image_url}`;

    Enquirydisplay='none';
    EnquiryFormData: FormGroup; 

    constructor(private tyreService : TyreService,
        private frmBuilder: FormBuilder,
        private responseService: ResponseService,
        private spinnerService: SpinnerService,
        private alertService:AlertService) {
       
    }

    ngOnInit() {

        this.spinnerService.show();

        //update grid height
        this.sHeight=(screen.availHeight-335)+"px";
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
            pattern_id : [''] ,
            rowsize:10,
            sortField:'Name',
            sortOrder:'ASC' ,
            page:''          
        });

        this.EnquiryFormData = this.frmBuilder.group({            
            comment:[null],  
            product_id:[null],                 
                   
        });

        this.loadCategory();
        this.loadType();
        this.loadBrand();
        this.loadOrigin();
        this.loadModel();
        this.loadPattern();
        this.loadGridData(1);
        
    }
    updateStock(event,id){
        //alert(event.target.value);
        this.tyreService.updateStock({stock:event.target.value,tyre_id:id}).subscribe((data: any) => { 
            this.spinnerService.hide();   
            //this.alertService.success(data.text);
         }, error => {
             this.responseService.checkStatus(error);           
         });
    }

    addToCart(event,id){
        //alert(event.target.value);
        var qty=(<HTMLInputElement>document.getElementById("qty_"+id)).value;
        this.tyreService.addToCart({order_quantity:qty,tyre_id:id}).subscribe((data: any) => { 
            this.spinnerService.hide();
            document.getElementById("cartTotal").innerHTML=data.total;
            (<HTMLInputElement>document.getElementById("qty_"+id)).value='';   
            this.alertService.success(data.text);
         }, error => {
             this.responseService.checkStatus(error);           
         });
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
        this.searchForm.controls["pattern_id"].setValue(['']);
        this.loadGridData(1);  
    }

    loadGridData(page){
        this.spinnerService.show();  
        //this.searchForm.patchValue(page : page);
        this.searchForm.controls["page"].setValue(page);
        
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

    loadModel(){
        this.tyreService.getModel().subscribe((data: any) => {            
             
            this.modelData = data.models;           
                
            
         }, error => {
             this.responseService.checkStatus(error);           
         });
    }

    loadPattern(){
        this.tyreService.getPattern().subscribe((data: any) => {            
             
            this.patternData = data.pattern;           
                
            
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


    doSendEnquiry(){
        //console.log(this.EnquiryFormData.value);
        
        if(this.EnquiryFormData.value.comment==null){
            this.alertService.error("Enter comment");
            return false;
        }      


        this.spinnerService.show();          
        
        this.tyreService.sendEnquiry(this.EnquiryFormData.value).subscribe((data : any)=>{
            console.log(data);
            if(data.status=='error'){               
                this.alertService.error(data.text);
                this.spinnerService.hide();
            }  
            else{
                this.Enquirydisplay='none';
                this.alertService.success(data.text);
                this.EnquiryFormData.controls["comment"].setValue(['']);
                this.spinnerService.hide();
            }  
          }, error => {
           
            this.responseService.checkStatus(error);   
            
          });        
    }

    openModalDialogEnquiry(event,id){
        this.Enquirydisplay='block'; //Set block css 
        this.EnquiryFormData.controls["product_id"].setValue(id);       
    }

    closeModalDialogEnquiry(){
        this.Enquirydisplay='none'; //set none css after close dialog
    }

}
