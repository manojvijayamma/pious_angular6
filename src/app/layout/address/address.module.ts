import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddressRoutingModule } from './address-routing.module';
import { AddressComponent } from './address.component';
import { PageHeaderModule } from './../../shared';

//import { AgmCoreModule } from '@agm/core';

//import { GooglePlaceModule } from "ngx-google-places-autocomplete";


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { DatePickerComponent} from './../../shared/modules/date-picker/date-picker.component';

import {
    
    ModalComponent
    
} from './components';

@NgModule({
    imports: [ NgbModule.forRoot(), CommonModule, AddressRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule
        /*,  AgmCoreModule.forRoot({
        apiKey: 'AIzaSyCSepBBpfES_8BXUlaOs3RX2vHijLlkfQc'
    }),GooglePlaceModule*/
],
    declarations: [AddressComponent, ModalComponent ]
})
export class AddressModule {}
