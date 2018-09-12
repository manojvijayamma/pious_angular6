import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public hideSpinner : true;
    constructor() {
        setTimeout (() => {
            document.getElementById("snackbar").style.display="none";
         }, 5000);
    }


    ngOnInit() {
        
    }

    closeAlert(){
        document.getElementById("snackbar").style.display="none";
    }

    
    
}
