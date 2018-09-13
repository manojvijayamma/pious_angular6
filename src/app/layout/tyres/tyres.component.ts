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
    userData: any;
    
    pager: {startSI:'',endSI:'',totalRecords:'',totalPages:'',prev:'',next:'',page:'',rowsize:10,sortField:'Name',sortOrder:'ASC'};    
    searchData = {Name:'',rowsize:10,sortField:'Name',sortOrder:'ASC'} ;
    angularForm: FormGroup; 
    sHeight : any;

    constructor(private tyreService : TyreService,
        private frmBuilder: FormBuilder,
        private responseService: ResponseService,
        private spinnerService: SpinnerService) {
       
    }

    ngOnInit() {
        this.sHeight=(screen.availHeight-330)+"px";
        document.getElementById("gridPanel").style.height=this.sHeight;
        this.spinnerService.show();
        this.angularForm = this.frmBuilder.group({            
            page:[""]     
        });
        
        this.tyreService.getData(this.searchData).subscribe((data: any) => {
            console.log(data.tyres.current_page);
            this.userData = data.tyres.data;
            this.pager=data.tyres.data;
            this.angularForm.setValue({
                page:10
            });    
            console.log(this.pager);
        }, error => {
            this.responseService.checkStatus(error);
               
            
        });
    }

    doPager(){
        
    }

    ngAfterViewInit(){
        this.spinnerService.hide();       
    }
}
