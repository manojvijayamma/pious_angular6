import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../shared/services/user.service';
import { ResponseService } from '../../shared/services/response.service';
import { SpinnerService } from  '../../shared/services/spinner.service';


@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
    userData: any;
    
    pager: {startSI:'',endSI:'',totalRecords:'',totalPages:'',prev:'',next:'',page:'',rowsize:10,sortField:'Name',sortOrder:'ASC'};    
    searchData = {Name:'',rowsize:10,sortField:'Name',sortOrder:'ASC'} ;
    angularForm: FormGroup; 
    sHeight : any;

    constructor(private userService : UserService,
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
        
        this.userService.getUserData(this.searchData).subscribe((data: any) => {
            console.log(data.users.current_page);
            this.userData = data.users.data;
            this.pager=data.users.data;
            this.angularForm.setValue({
                page:10
            });    
            console.log(this.pager);
        }, error => {
            this.responseService.checkStatus(error);
               
            
        });
    }

    doPager(){
        alert(1);
    }

    pagination(page){
        alert(2);
    }

    ngAfterViewInit(){
        this.spinnerService.hide();       
    }
}
