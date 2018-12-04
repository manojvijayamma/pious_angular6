import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddressRoutingModule } from './address-routing.module';
import { AddressComponent } from './address.component';
import { PageHeaderModule } from './../../shared';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { DatePickerComponent} from './../../shared/modules/date-picker/date-picker.component';

import {
    
    ModalComponent
    
} from './components';

@NgModule({
    imports: [ NgbModule.forRoot(), CommonModule, AddressRoutingModule, PageHeaderModule ,FormsModule, ReactiveFormsModule],
    declarations: [AddressComponent, ModalComponent ]
})
export class AddressModule {}
