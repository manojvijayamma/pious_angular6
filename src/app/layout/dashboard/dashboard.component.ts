import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

import { UserService } from '../../shared/services/user.service';
import { ResponseService } from '../../shared/services/response.service';

import { Router } from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {   

    dashboardData: any;
    headerData:any;
    constructor(private userService : UserService, private router: Router, private responseService: ResponseService) {
       
    }

    ngOnInit() {
        document.getElementById("spinner").style.display="block";
        this.userService.getDashboardData().subscribe((data: any) => {
            
            this.dashboardData = data; 

        }, error => {
           
            this.responseService.checkStatus(error);   
            
        });
          
    }


    ngAfterViewInit(){
        document.getElementById("spinner").style.display="none";
    }

   
}
